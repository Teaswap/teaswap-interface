import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@teaswap/uniswap-sdk'
import {MintInfoInterface} from "../../hooks/useMintCallback";

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export const addTransaction = createAction<{
  chainId: ChainId
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  claim?: { recipient: string }
  setprice?: {orderid:number;price:number}
  bid?:{orderid:string;price:string}
  withdrawBid?:{orderid:number;price:number}
  nftapproval?: { tokenAddress: string; spender: string;tokenId: number }
  summary?: string
  mint?:MintInfoInterface
  transfer?:{nftAddress:string,tokenid:number,toAddress:string}
}>('transactions/addTransaction')
export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions')
export const finalizeTransaction = createAction<{
  chainId: ChainId
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')
export const checkedTransaction = createAction<{
  chainId: ChainId
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
