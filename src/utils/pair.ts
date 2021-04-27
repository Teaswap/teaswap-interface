import Web3 from 'web3'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { provider } from 'web3-core'
// import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import PairABI from '../constants/abis/Pair.json'

export const getPairContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (PairABI as unknown) as AbiItem,
    address,
  )
  return contract
}
