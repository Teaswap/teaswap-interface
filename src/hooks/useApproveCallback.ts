import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Trade, TokenAmount, CurrencyAmount, ETHER } from '@teaswap/uniswap-sdk'
import { useCallback, useMemo } from 'react'
import {ROUTER_ADDRESS, ZERO_ADDRESS} from '../constants'
import {useNFTAllowance, useTokenAllowance} from '../data/Allowances'
import { getTradeVersion, useV1TradeExchangeAddress } from '../data/V1'
import { Field } from '../state/swap/actions'
import {useTransactionAdder, useHasPendingApproval, useHasPendingNFTApproval} from '../state/transactions/hooks'
import { computeSlippageAdjustedAmounts } from '../utils/prices'
import { calculateGasMargin } from '../utils'
import { useTokenContract } from './useContract'
import { useActiveWeb3React } from './index'
import { Version } from './useToggledVersion'
import {useNFTLastId} from "../state/wallet/hooks";

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount,
  spender?: string
): [ApprovalState, () => Promise<void>  ] {
  const { account } = useActiveWeb3React()
  const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined

  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address===ZERO_ADDRESS?undefined:token?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if(!token) return ApprovalState.APPROVED
    if(token.address===ZERO_ADDRESS) return ApprovalState.APPROVED
    if (amountToApprove.currency === ETHER) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address===ZERO_ADDRESS?undefined:token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
    })

    return tokenContract
      .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender }
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade?: Trade, allowedSlippage = 0) {
  const amountToApprove = useMemo(
    () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
    [trade, allowedSlippage]
  )
  const tradeIsV1 = getTradeVersion(trade) === Version.v1
  const v1ExchangeAddress = useV1TradeExchangeAddress(trade)
  return useApproveCallback(amountToApprove, tradeIsV1 ? v1ExchangeAddress : ROUTER_ADDRESS)
}


export function useApproveNFTCallback(
    to?: string,
    lastTokenId?: number,
    tokenAddress?:string
): [ApprovalState, () => Promise<void>  ] {

  const tokenIdres = useNFTLastId(tokenAddress)
     console.log("tokenIdres:"+tokenIdres)

  const tokenId = useMemo(()=>{
    console.log("tokenIdres:"+tokenIdres)
    console.log("lastTokenId:"+lastTokenId)

      if (tokenIdres) {
          return tokenIdres-1
      }else{
          return undefined
      }
  },[tokenIdres])

  const currentAllowance = useNFTAllowance(tokenAddress,tokenId)
  const pendingApproval = useHasPendingNFTApproval(tokenAddress, to,tokenId)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!to) return ApprovalState.UNKNOWN
    if(!tokenAddress) return ApprovalState.UNKNOWN
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.NOT_APPROVED

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance != to
        ? pendingApproval
            ? ApprovalState.PENDING
            : ApprovalState.NOT_APPROVED: ApprovalState.APPROVED
  }, [currentAllowance, pendingApproval, to,tokenAddress])

  const nftContract = useTokenContract(tokenAddress)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!tokenAddress) {
      console.error('no token')
      return
    }

    if (!nftContract) {
      console.error('tokenContract is null')
      return
    }

    if (tokenId === undefined) {
      console.error('missing tokenId to approve')
      return
    }

    if (!to) {
      console.error('no spender')
      return
    }

    const estimatedGas = await nftContract.estimateGas.approve(to, tokenId).catch(() => {
      // general fallback for tokens who restrict approval amounts
      return nftContract.estimateGas.approve(to, tokenId)
    })

    return nftContract
        .approve(to, tokenId, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Approve #' + tokenId,
            nftapproval: { tokenAddress: tokenAddress, spender: to,tokenId: tokenId }
          })
        })
        .catch((error: Error) => {
          console.debug('Failed to approve token', error)
          throw error
        })
  }, [approvalState, tokenAddress, nftContract, tokenId, to, addTransaction])

  return [approvalState, approve]
}
