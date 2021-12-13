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
  customData?: { summary?: string; revoke?: {orderid: number}, approval?: { tokenAddress: string; spender: string }; claim?: { recipient: string };mint?:MintInfoInterface; setprice?: {orderid:number;price:number};bid?:{orderid:string;price:string};withdrawBid?:{orderid:number;price:number}; nftapproval?: { tokenAddress: string; spender: string;tokenId: number }; transfer?:{nftAddress:string,tokenid:number,toAddress:string} }
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        revoke,
        approval,
        claim,
          mint,
          setprice,
          bid,
          withdrawBid,
          nftapproval,
          transfer
      }: { summary?: string; revoke?:{orderid: number}, claim?: { recipient: string }; approval?: { tokenAddress: string; spender: string }; mint?: MintInfoInterface; setprice?: {orderid:number;price:number};bid?:{orderid:string;price:string}; withdrawBid?:{orderid:number;price:number};nftapproval?: { tokenAddress: string; spender: string;tokenId: number };transfer?:{nftAddress:string,tokenid:number,toAddress:string} } = {}
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(addTransaction({ hash, from: account, chainId, revoke, approval, summary, claim,mint, setprice, bid,withdrawBid,nftapproval,transfer }))
    },
    [dispatch, chainId, account]
  )
}

// returns all the transactions for the current chain from redux
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
    console.log('allTransactions: ', allTransactions)
    return useMemo(
        () =>
            typeof tokenAddress === 'string' &&
            typeof spender === 'string' &&
            typeof tokenId === 'number' &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                console.log('tx: ', tx)
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
    console.log("allTransactions:"+JSON.stringify(allTransactions))
    // get the txn if it has been submitted
    const setPirceTxn = useMemo(() => {
        console.log("hasSubmitorderid:"+orderid)
        console.log("hasSubmitprice:"+price)
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.setprice && tx.receipt?.status===1 &&tx.setprice.orderid === orderid && tx.setprice.price === price
        })
        console.log("txnIndex:"+txnIndex)
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [orderid,price, allTransactions])
    console.log("setPirceTxn:"+JSON.stringify(setPirceTxn))
    return { setPriceSubmitted: Boolean(setPirceTxn), setPirceTxn }
}

export function useHasPendingRevoke(orderid:number): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            orderid !=0 &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    if (!tx.revoke) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, orderid]
    )
}

export function useUserHasSubmittedRevoke(
    orderid:number
): { revokeSubmitted: boolean; revokeTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()
    console.log("allTransactions:"+JSON.stringify(allTransactions))
    // get the txn if it has been submitted
    const revokeTxn = useMemo(() => {
        console.log("hasSubmitorderid:"+orderid)
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.revoke && tx.receipt?.status===1 && tx.revoke.orderid === orderid
        })
        console.log("txnIndex:"+txnIndex)
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [orderid, allTransactions])
    console.log("setPirceTxn:"+JSON.stringify(revokeTxn))
    return { revokeSubmitted: Boolean(revokeTxn), revokeTxn }
}

export function useHasPendingTransfer(nftAddress:string,tokenid:number,toAddress:string): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            toAddress != '' &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    const transfer = tx.transfer
                    if (!transfer) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, tokenid,nftAddress,toAddress]
    )
}

export function useUserHasSubmittedTransfer(
    nftAddress:string,tokenid:number,toAddress:string
): { transferSubmitted: boolean; transferTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()
    console.log("allTransactions:"+JSON.stringify(allTransactions))
    // get the txn if it has been submitted
    const transferTxn = useMemo(() => {

        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.transfer && tx.receipt?.status===1 &&tx.transfer.tokenid === tokenid && tx.transfer.nftAddress === nftAddress && tx.transfer.toAddress === toAddress
        })
        console.log("txnIndex:"+txnIndex)
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [nftAddress,tokenid,toAddress, allTransactions])
    console.log("transferTxn:"+JSON.stringify(transferTxn))
    return { transferSubmitted: Boolean(transferTxn), transferTxn }
}

export function useHasPendingBid(orderid:string,price:string): boolean {
    const allTransactions = useAllTransactions()
    return useMemo(
        () =>
            price!='0' &&
            Object.keys(allTransactions).some(hash => {
                const tx = allTransactions[hash]
                if (!tx) return false
                if (tx.receipt) {
                    return false
                } else {
                    const bid = tx.bid
                    if (!bid) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, orderid,price]
    )
}

export function useUserHasSubmittedBid(
    orderid:string,price:string
): { bidSubmitted: boolean; bidTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()
    console.log("allTransactions:"+JSON.stringify(allTransactions))
    // get the txn if it has been submitted
    const bidTxn = useMemo(() => {
        // console.log("hasSubmitorderid:"+orderid)
        // console.log("hasSubmitprice:"+price)
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.bid && tx.receipt?.status===1 && tx.bid.orderid === orderid && tx.bid.price === price
        })
        console.log("txnIndex:"+txnIndex)
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [orderid,price, allTransactions])
    console.log("bid:"+JSON.stringify(bidTxn))
    return { bidSubmitted: Boolean(bidTxn), bidTxn }
}

export function useHasPendingWithdrawBid(orderid:number,price:number): boolean {
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
                    const bid = tx.withdrawBid
                    if (!bid) return false
                    return isTransactionRecent(tx)
                }
            }),
        [allTransactions, orderid,price]
    )
}

export function useUserHasSubmittedWithdrawBid(
    orderid:number,price:number
): { withdrawBidSubmitted: boolean; withdrawBidTxn: TransactionDetails | undefined } {
    const allTransactions = useAllTransactions()
    // console.log("allTransactions:"+JSON.stringify(allTransactions))
    // get the txn if it has been submitted
    const withdrawBidTxn = useMemo(() => {
        // console.log("hasSubmitorderid:"+orderid)
        // console.log("hasSubmitprice:"+price)
        const txnIndex = Object.keys(allTransactions).find(hash => {
            const tx = allTransactions[hash]
            return tx.withdrawBid && tx.receipt?.status===1 && tx.withdrawBid.orderid === orderid && tx.withdrawBid.price === price
        })
        console.log("txnIndex:"+txnIndex)
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
    }, [orderid,price, allTransactions])
    console.log("bid:"+JSON.stringify(withdrawBidTxn))
    return { withdrawBidSubmitted: Boolean(withdrawBidTxn), withdrawBidTxn }
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

