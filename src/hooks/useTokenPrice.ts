import { useCallback, useEffect, useMemo, useState } from 'react'
import { provider } from 'web3-core'
import { utils } from 'ethers'
import { useWallet } from 'use-wallet'
import { getSwapRouter } from '../utils/swapRouter'
import { getTotalLiquidityInBNB } from './Liquidity'
import { address } from '../constants/swap'
import { ADDRESS_ZERO, WBNB, BUSD } from '../constants/addresses'
// import { BigNumber } from "../sushi";

// const { BigNumber } = utils

/**
 * useTokenPriceInBNB 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBNB(
  tokenAddress: string,
  decimals: number | string = 18,
  isLp = false,
) {
  const { account, ethereum } = useWallet()
  // use BigNumber, format them at the display part please
  const [priceInBNB, updatePriceInBNB] = useState('0')
  // 97 stands for bsc testnet
  const networkId = 56
  const contract = useMemo(() => {
    return getSwapRouter(ethereum as provider, address[networkId])
  }, [ethereum])

  const oneUnitOfToken = utils.parseUnits('1', decimals)

  const fetchPrice = useCallback(async () => {
    if (tokenAddress === ADDRESS_ZERO) {
      // 零号地址，当 BNB 处理，1 BNB = 1 BNB 没毛病
      updatePriceInBNB(oneUnitOfToken.toString())
      return
    }
    if (isLp) {
      // LP 做特殊处理
      const fresult = await getTotalLiquidityInBNB(
        ethereum as provider,
        tokenAddress,
        WBNB[56],
      )
      updatePriceInBNB(fresult)
      return
    }
    try {
      const [, outputWBNB] = await contract.methods
        .getAmountsOut(oneUnitOfToken, [
          tokenAddress, // the token address
          WBNB[networkId], // WBNB
        ])
        .call()
      updatePriceInBNB(outputWBNB)
    } catch (error) {
      console.error('unable to fetch price for: ' + tokenAddress)
    }
  }, [contract, tokenAddress, isLp, oneUnitOfToken, ethereum])

  useEffect(() => {
    if (account && contract && decimals !== '0') {
      fetchPrice()
    }
  }, [contract, account, fetchPrice, decimals])

  return { priceInBNB, fetchPrice }
}

/**
 * useTokenPriceInBUSD 获取1个单位的代币在 Swap 合约中的价格（以BUSD计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBUSD(
  tokenAddress: string,
  decimals: number | string = 18,
  isLp = false,
) {
  const { account, ethereum } = useWallet()
  // use BigNumber, format them at the display part please
  const [priceInBUSD, updatePriceInBUSD] = useState('0')
  // 97 stands for bsc testnet
  const networkId = 56
  const contract = useMemo(() => {
    return getSwapRouter(ethereum as provider, address[networkId])
  }, [ethereum])

  const oneUnitOfToken = utils.parseUnits('1', decimals)

  const fetchPrice = useCallback(async () => {
    if (tokenAddress.toLowerCase() === BUSD[networkId]) {
      // 1 BUSD = 1 BUSD 没毛病
      updatePriceInBUSD(oneUnitOfToken.toString())
      return
    }
    if (isLp) {
      const fresult = await getTotalLiquidityInBNB(
        ethereum as provider,
        tokenAddress,
        BUSD[56],
      )
      updatePriceInBUSD(fresult)
      return
    }
    try {
      const [, outputBUSD] = await contract.methods
        .getAmountsOut(oneUnitOfToken, [
          tokenAddress, // the token address
          BUSD[networkId], // WBNB
        ])
        .call()
      updatePriceInBUSD(outputBUSD)
    } catch (error) {
      console.error('unable to fetch price for: ' + tokenAddress)
    }
  }, [contract, tokenAddress, isLp, oneUnitOfToken, ethereum])

  useEffect(() => {
    if (account && contract && decimals !== '0') {
      fetchPrice()
    }
  }, [contract, account, fetchPrice, decimals])

  return { priceInBUSD, fetchPrice }
}
