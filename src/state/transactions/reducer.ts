import { createReducer } from '@reduxjs/toolkit'
import {
  addTransaction,
  checkedTransaction,
  clearAllTransactions,
  finalizeTransaction,
  SerializableTransactionReceipt
} from './actions'
import {MintInfoInterface} from '../../hooks/useMintCallback'

const now = () => new Date().getTime()

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
  claim?: { recipient: string }
  mint?:MintInfoInterface
  setprice?: {orderid:number,price:number}
  bid?:{orderid:string;price:string}
  withdrawBid?:{orderid:number;price:number}
  nftapproval?: { tokenAddress: string; spender: string;tokenId: number }
  transfer?:{nftAddress:string,tokenid:number,toAddress:string}
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string,
  revoke?: {orderid: number}
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

export const initialState: TransactionState = {}

export default createReducer(initialState, builder =>
  builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim,mint,setprice,bid,withdrawBid,nftapproval ,transfer} }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.')
      }
      const txs = transactions[chainId] ?? {}
      txs[hash] = { hash, approval, summary, claim,mint,setprice,bid,withdrawBid,nftapproval, transfer, from, addedTime: now() }
      transactions[chainId] = txs
    })
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return
      transactions[chainId] = {}
    })
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
      }
    })
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = now()
    })
)
