import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import { addTransaction } from './actions'
import { TransactionDetails } from './reducer'
import {MintInfoInterface} from "../../hooks/useMintCallback";

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: { summary?: string; approval?: { tokenAddress: string; spender: string }; claim?: { recipient: string };mint?:MintInfoInterface; setprice?: {orderid:number;price:number}; nftapproval?: { tokenAddress: string; spender: string;tokenId: number } }
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        claim,
          mint,
          setprice,
          nftapproval
      }: { summary?: string; claim?: { recipient: string }; approval?: { tokenAddress: string; spender: string }; mint?: MintInfoInterface; setprice?: {orderid:number,price:number}; nftapproval?: { tokenAddress: string; spender: string;tokenId: number } } = {}
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim,mint, setprice, nftapproval }))
    },
    [dispatch, chainId, account]
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['transactions']>(state => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions()

  if (!transactionHash || !transactions[transactionHash]) return false

  return !transactions[transactionHash].receipt
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some(hash => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          const approval = tx.approval
          if (!approval) return false
          return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress]
  )
}

export function useHasPendingNFTApproval(tokenAddress: string | undefined, spender: string | undefined,tokenId: number | undefined): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            typeof tokenAddress === 'string' &&
            typeof spender === 'string' &&
            typeof tokenId === 'number' &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    const approval = tx.nftapproval
                    if (!approval) return false
                    return approval.spender === spender && approval.tokenAddress === tokenAddress && approval.tokenId === tokenId && isTransactionRecent(tx)
                }
            }),
        [allTransactions, spender, tokenAddress,tokenId]
    )
}

export function useHasPendingMint(mintInfo:MintInfoInterface): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            mintInfo  &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    const mint = tx.mint
                    if (!mint) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, mintInfo]
    )
}

export function useHasPendingSetPrice(orderid:number,price:number): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            price!=0 &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    const setPrice = tx.setprice
                    if (!setPrice) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, orderid,price]
    )
}

export function useUserHasSubmittedSetPrice(
    orderid:number,price:number
): { setPriceSubmitted: boolean; setPirceTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()

    // get the txn if it has been submitted
    const setPirceTxn = useMemo(() => {
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.setprice && tx.setprice.orderid === orderid && tx.setprice.price === price
        })
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [orderid,price, allTransactions])

    return { setPriceSubmitted: Boolean(setPirceTxn), setPirceTxn }
}

// watch for submissions to claim
// return null if not done loading, return undefined if not found
export function useUserHasSubmittedClaim(
  account?: string
): { claimSubmitted: boolean; claimTxn: TransactionDetails | undefined } {
  const allTransactions = useAllTransactions()

  // get the txn if it has been submitted
  const claimTxn = useMemo(() => {
    const txnIndex = Object.keys(allTransactions).find(hash => {
      const tx = allTransactions[hash]
      return tx.claim && tx.claim.recipient === account
    })
    return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
  }, [account, allTransactions])

  return { claimSubmitted: Boolean(claimTxn), claimTxn }
}

// watch for submissions to mint
// return null if not done loading, return undefined if not found
export function useUserHasSubmittedMint(
    productName?: string
): { submitted: boolean; mintTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()

    // get the txn if it has been submitted
    const mintTxn = useMemo(() => {
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.mint && tx.mint.productName === productName
        })
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [productName, allTransactions])

    return { submitted: Boolean(mintTxn), mintTxn }
}

