import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount } from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { UNI, BUSD, SATO, PAYABLEETH } from '../../constants'
import { IDO_ABI_INTERFACE, STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'


export const STAKING_GENESIS = 1600387200

export const REWARDS_DURATION_DAYS = 60

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
  }[]
} = {
  [ChainId.BSC_MAINNET]: [
    {
      tokens: [UNI[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x288107De029DadFA70E6501aE71cb88c10E990AA'
    },
    // {
    //   tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0xbD1308B84f0648aa89B7AcB1039767d52CF4Dc17'
    // },
    // {
    //   tokens: [ETH_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0x58567277734898E100B2bE80C5bB5BF82f053203'
    // }
    {
      tokens: [BUSD, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x9684C8285A81F97C9482446feA11b4D9aec72f36'
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], SATO],
      stakingRewardAddress: '0x79d7558386d8B08a8D5A1985ABaCcc5E2b6794a0'
    }
  ]
}

export const IFO_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    idoAddress: string
  }[]
} = {
  [ChainId.BSC_MAINNET]: [
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      idoAddress: '0xE9703472deCeAd18ed42A16C8C5ea46c11b3a012'
    }

  ]
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Date | undefined
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

export interface IdoInfo {
  // the address of the reward contract
  idoAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  makeAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  claimedAmount:TokenAmount
  unclaimAmount:TokenAmount
  // the total amount of token staked in the contract
  totalsupplayAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalSoldAmount: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  price: TokenAmount
  rate: TokenAmount
  // when the period ends
  periodFinish: Date | undefined
  // calculates a hypothetical amount of token distributed to the active account per second.

}

// gets the staking info from the network for the active chain id
export function useStakingInfo(stakingRewardAddress?:string | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          stakingRewardAddress === undefined
              ? true
              : stakingRewardAddress === null
              ? false
              : stakingRewardInfo.stakingRewardAddress===stakingRewardAddress
          ) ?? []
        : [],
    [chainId, stakingRewardAddress]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        //
        // const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
        // //
        // // check for account, if no account set to 0
        //
        // const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        // const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const stakedAmount = new TokenAmount(tokens[0], JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(tokens[0], JSBI.BigInt(totalSupplyState.result?.[0]))



        const totalRewardRate = new TokenAmount(tokens[1], JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(info[index].tokens[1], JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator = stakingInfo.earnedAmount,
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = t('connectWallet')
  }
  if (!parsedAmount) {
    error = error ?? t('enterAnAmount')
  }

  return {
    parsedAmount,
    error
  }
}

export function useDerivedIdoInfo(
  typedValue: string,
  makeToken: Token,
  userLiquidityUnstaked: TokenAmount| CurrencyAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, makeToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = t('connectWallet')
  }
  if (!parsedAmount) {
    error = error ?? t('enterAnAmount')
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = t('connectWallet')
  }
  if (!parsedAmount) {
    error = error ?? t('enterAnAmount')
  }

  return {
    parsedAmount,
    error
  }
}

export function useIdoInfo(idoAddress?:string | null): IdoInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? IFO_REWARDS_INFO[chainId]?.filter(idoInfo =>
        idoAddress === undefined
          ? true
          : idoAddress === null
          ? false
          : idoInfo.idoAddress===idoAddress
      ) ?? []
        : [],
    [chainId, idoAddress]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const idoAddresses = useMemo(() => info.map(({ idoAddress }) => idoAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'earned', accountArg)
  const claimedAmounts = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'rewardPaid', accountArg)
  const unclaimAmounts = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'rewards', accountArg)
  const totalSupplies = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'totalSupply')
  const totalMake = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'totalMake')

  // tokens per second, constants
  const price = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    'price'
  )

  const rate = useMultipleContractSingleData(
      idoAddresses,
      IDO_ABI_INTERFACE,
      'rewardRate'
  )



  const periodFinishes = useMultipleContractSingleData(
    idoAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return idoAddresses.reduce<IdoInfo[]>((memo, idoAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]
      const totalMakeState = totalMake[index]
      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rate[index]
      const priceState = price[index]
      const periodFinishState = periodFinishes[index]
      const claimedAmountState = claimedAmounts[index]
      const unclaimAmountState = unclaimAmounts[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading &&
        priceState &&
        !priceState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        claimedAmountState &&
        !claimedAmountState.loading &&
          totalMakeState &&
          !totalMakeState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        //
        // const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
        // //
        // // check for account, if no account set to 0
        //
        // const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        // const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const makeAmount = new TokenAmount(tokens[0], JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const unclaimAmount = new TokenAmount(tokens[1],JSBI.BigInt(unclaimAmountState?.result?.[0]))
        const totalsupplayAmount = new TokenAmount(tokens[0], JSBI.BigInt(totalSupplyState.result?.[0]))

        const priceAmount = new TokenAmount(tokens[0], JSBI.BigInt(priceState.result?.[0]))
        const rateAmount = new TokenAmount(tokens[1], JSBI.BigInt(rewardRateState.result?.[0]))
        const rewardPaidAmount = new TokenAmount(tokens[1],JSBI.BigInt(claimedAmountState.result?.[0]))
        // const totalMakeAmout = new TokenAmount(tokens[0],JSBI.BigInt(totalMakeState.result?.[0]))
        const totalSoldAmount = new TokenAmount(tokens[1], JSBI.divide(JSBI.multiply(JSBI.BigInt(rewardRateState.result?.[0]),JSBI.BigInt(totalMakeState.result?.[0])),JSBI.BigInt('1000000000000000000'))  )

        //
        // const getHypotheticalRewardRate = (
        //   stakedAmount: TokenAmount,
        //   totalStakedAmount: TokenAmount,
        //   totalRewardRate: TokenAmount
        // ): TokenAmount => {
        //   return new TokenAmount(
        //     uni,
        //     JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
        //       ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
        //       : JSBI.BigInt(0)
        //   )
        // }

        // const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          idoAddress: idoAddress,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(info[index].tokens[1], JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          // rewardRate: individualRewardRate,
          // totalRewardRate: totalRewardRate,
          // stakedAmount: stakedAmount,
          // totalStakedAmount: totalStakedAmount,
          makeAmount: makeAmount,
          unclaimAmount: unclaimAmount,
          claimedAmount:rewardPaidAmount,
          totalsupplayAmount: totalsupplayAmount,
          totalSoldAmount: totalSoldAmount,
          // the current amount of token distributed to the active account per second.
          // equivalent to percent of total supply * reward rate
          price: priceAmount,
          rate: rateAmount
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, price, idoAddresses, totalSupplies, uni])
}
