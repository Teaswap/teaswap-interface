import Web3 from 'web3'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { provider } from 'web3-core'
// import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import PoolABI from '../constants/abis/Pool.json'

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (PoolABI as unknown) as AbiItem,
    address,
  )
  return contract
}
