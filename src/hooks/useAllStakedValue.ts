import { useCallback, useEffect, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
// import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  // getWethContract,
  getFarms,
  // getTotalLPWethValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from './index'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  // const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    // const balances: Array<StakedValue> = await Promise.all(
    //   farms.map(
    //     ({
    //       pid,
    //       lpContract,
    //       tokenContract,
    //     }: {
    //       pid: number
    //       lpContract: Contract
    //       tokenContract: Contract
    //     }) =>
    //       getTotalLPWethValue(
    //         masterChefContract,
    //         wethContact,
    //         lpContract,
    //         tokenContract,
    //         pid,
    //       ),
    //   ),
    // )
    const balances: Array<StakedValue> = farms.map(() => ({
      tokenAmount: BigNumber.from(0),
      wethAmount: BigNumber.from(0),
      totalWethValue: BigNumber.from(0),
      tokenPriceInWeth: BigNumber.from(0),
      poolWeight: BigNumber.from(0),
    }))

    setBalance(balances)
  }, [farms])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, fetchAllStakedValue, masterChefContract, setBalance, sushi])

  return balances
}

export default useAllStakedValue
