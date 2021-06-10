import { utils } from 'ethers'
import { getPairContract } from '../utils/pair'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import { useTokenPriceInBNB } from './useTokenPrice'
import { getSwapRouter } from '../utils/swapRouter'
import { address } from '../constants/swap'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

export async function useTotalLiquidity(pair: string) {
  const [reserve0, setReserve0] = useState('0')
  const [reserve1, setReserve1] = useState('0')
  const [token0, setToken0] = useState('')
  const [token1, setToken1] = useState('')
  const { account, ethereum } = useWallet()

  const contract = useMemo(() => {
    return getPairContract(ethereum as provider, pair)
  }, [ethereum, pair])

  const update = useCallback(async () => {
    // rewardRate = reward for every second staking
    const [_reserve0, _reserve1] = await contract.methods.getReserves().call()

    const _token0 = await contract.methods.token0().call()
    const _token1 = await contract.methods.token1().call()

    setReserve0(_reserve0)
    setReserve1(_reserve1)
    setToken0(_token0)
    setToken1(_token1)
  }, [contract])

  useEffect(() => {
    if (account && contract) {
      update()
    }
  }, [contract, account, update])

  return { update, reserve0, reserve1, token0, token1 }
}

export function useEstimateTotalLiquidtyInBNB({
  reserve0,
  reserve1,
  token0,
  token1,
  decimal0,
  decimal1,
}: {
  reserve0: string
  reserve1: string
  token0: string
  token1: string
  decimal0: string | number
  decimal1: string | number
}) {
  // typing for destruct args
  const { priceInBNB: token0Price } = useTokenPriceInBNB(token0, decimal0)
  const { priceInBNB: token1Price } = useTokenPriceInBNB(token1, decimal1)

  const totalLiquidity = useMemo(() => {
    if (token0Price !== '0' && token1Price !== '0') {
      const isToken0ExpensiveThan1 = new BigNumber(token0Price).lt(token1Price)
      const token0Total = new BigNumber(
        utils.parseUnits(token0Price, decimal0).toString(),
      )
        .multipliedBy(2)
        .multipliedBy(reserve0)
      const token1Ttotal = new BigNumber(
        utils.parseUnits(token1Price, decimal1).toString(),
      )
        .multipliedBy(2)
        .multipliedBy(reserve1)
      return isToken0ExpensiveThan1 ? token0Total : token1Ttotal
    } else if (token0Price !== '0') {
      return new BigNumber(utils.parseUnits(token0Price, decimal0).toString())
        .multipliedBy(2)
        .multipliedBy(reserve0)
    } else if (token1Price !== '0') {
      return new BigNumber(utils.parseUnits(token1Price, decimal1).toString())
        .multipliedBy(2)
        .multipliedBy(reserve1)
    } else {
      return new BigNumber(0)
    }
  }, [token0Price, token1Price, decimal0, decimal1, reserve0, reserve1])

  return totalLiquidity
}

export async function getTotalLiquidityInBNB(
  ethereum: provider,
  tokenAddress: string,
  valuationCurrency: string,
) {
  const networkId = 56 // BSC
  const swapRouter = getSwapRouter(ethereum as provider, address[networkId])
  // LP 做特殊处理
  const pairContract = getPairContract(ethereum, tokenAddress)
  // rewardRate = reward for every second staking
  const {
    _reserve0,
    _reserve1,
  } = await pairContract.methods.getReserves().call()
  const _token0 = await pairContract.methods.token0().call()
  const totalSupply = await pairContract.methods.totalSupply().call()
  const _token1 = await pairContract.methods.token1().call()
  let token0Price = '0',
    token1Price = '0'
  try {
    ;[, token0Price] = await swapRouter.methods
      .getAmountsOut(utils.parseUnits('1', 18), [
        _token0, // the token address
        valuationCurrency,
      ])
      .call()
  } catch (error) {
    token0Price = '0'
  }
  try {
    ;[, token1Price] = await swapRouter.methods
      .getAmountsOut(utils.parseUnits('1', 18), [
        _token1, // the token address
        valuationCurrency,
      ])
      .call()
  } catch (error) {
    token1Price = '0'
  }
  const token0Total = new BigNumber(token0Price)
    .multipliedBy(2)
    .multipliedBy(utils.formatUnits(_reserve0, 18))
    .div(totalSupply)
  const token1Ttotal = new BigNumber(token1Price)
    .multipliedBy(2)
    .multipliedBy(utils.formatUnits(_reserve1, 18))
    .div(totalSupply)
  let result: BigNumber
  if (token0Price !== '0' && token1Price !== '0') {
    const isToken0ExpensiveThan1 = new BigNumber(token0Price).lt(token1Price)
    result = isToken0ExpensiveThan1 ? token0Total : token1Ttotal
  } else if (token0Price !== '0') {
    result = token0Total
  } else if (token1Price !== '0') {
    result = token1Ttotal
  } else {
    result = new BigNumber(0)
  }
  const fresult = utils.parseUnits(result.toFixed(18), 18).toString()
  console.log(`result for ${tokenAddress} is ${fresult}`)
  return fresult
}
