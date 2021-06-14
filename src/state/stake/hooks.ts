import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount } from '@teaswap/uniswap-sdk'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  UNI,
  BUSD,
  PAYABLEETH,
  CJAI,
  DOGE,
  SHIB,
  SHIH,
  ICASH,
  BAKE,
  BNB_BAKE_LP,
  DOGGY,
  SAFEMOON,
  BNB_SHIH_LP, BUSD_SHIH_LP, B_USDT, USDT_SHIH_LP, BNB_BUSD_LP, BNB_ETH_LP, BNB_WBTC_LP
} from '../../constants'
import { IDO_ABI_INTERFACE, STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'


export const STAKING_GENESIS = 1620946800

export const REWARDS_DURATION_DAYS = 60

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    iconUrl: string
  }[]
} = {
  [ChainId.BSC_MAINNET]: [
    {
      tokens: [SHIH,UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress:'0xB2919b8d401dEA262B1E62876Fa1B7aAc287B05E',
      iconUrl: "/shih_TSA_icon.png"
    },
    {
      tokens:[BNB_BUSD_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x787B60d70b997Cdae2a4475aeCD4a94E3111c0F7',
      iconUrl:"/BNB_BUSD.png"
    },
    {
      tokens:[BNB_ETH_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x870c010312AB1914eD3c21C3CdA51f7464f17c13',
      iconUrl:"/BNB_ETH.png"
    },
    {
      tokens:[BNB_WBTC_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x72318628bBA4Bc395713eE9B0c96b19814d3AeC0',
      iconUrl:"/BNB_WBTC.png"
    },
    {
      tokens:[B_USDT, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x7964E3aAC5D7E0F4b6d70d9758365fC935EeD17f',
      iconUrl:"/USDT_TSA.png"
    },
    {
      tokens:[USDT_SHIH_LP, SHIH],
      stakingRewardAddress: '0x7FFCC2AeBE2AC2008D23B23A33A707038a9d0003',
      iconUrl:"/USDT_SHIH.png"
    },
    {
      tokens:[CJAI, SHIH],
      stakingRewardAddress: '0x46c292ae7946d730F76163DF633578E2dE13049c',
      iconUrl:"/CJAI_SHIH.png"
    },
    {
      tokens:[BUSD_SHIH_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x1162f2D625Cb80f713e941d1aC3d7f0D34109aec',
      iconUrl:"/BUSD_shih.png"
    },
    {
      tokens: [BNB_SHIH_LP, SHIH],
      stakingRewardAddress: '0x5c26Af070A595d779aB14d2dA545409F9aDA598f',
      iconUrl: "/shihbnb_icon.jpeg"
    },
    {
      tokens: [SHIH, CJAI],
      stakingRewardAddress: '0xA066432B6f34760b4420C0ff044e8e6D014bCa4b',
      iconUrl: "/shih_icon.jpeg"
    },
    {
      tokens: [DOGGY, SHIH],
      stakingRewardAddress: '0xb15C94cb098864951538cDbAb648CaaDf535f899',
      iconUrl: "/doggy_icon.png"
    },
    {
      tokens: [SAFEMOON, SHIH],
      stakingRewardAddress: '0x39BaBd84e5815bDEFC26294aDA42b19427083721',
      iconUrl: "/safemoon_icon.png"
    },
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0xfE93a00Cf957ba4DC84dF48AC698505e7E17F631',
      iconUrl: "/bnb_icon.webp"
    },
    // 0xfE93a00Cf957ba4DC84dF48AC698505e7E17F631 stakeBNB()
    // 0xb71fa06476fC11dd160A2D6B06A5B5797C03a096 stake()
    // {
    //   tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0xbD1308B84f0648aa89B7AcB1039767d52CF4Dc17'
    // },
    {
      tokens: [BNB_BAKE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x7bA8Fd959814b0959573CB4830BF81dbf789396e',
      iconUrl: "/blp_icon.webp"
    },
    {
      tokens: [BUSD, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: '0x7Cc95C5c821370960865aCf43DebbA42CeC22405',
      iconUrl: "/busd_icon.webp"
    },
    {
      tokens: [DOGE, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress:'0x96c51D3FAb14f27b5D9E45CDB43235d703B5e211',
      iconUrl: "/doge_icon.webp"
    },
    {
      tokens: [BAKE, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress:'0x727408110931e052F112af167722b5f63a0a7E44',
      iconUrl: "/bake_icon.webp"
    },
    {
      tokens: [SHIB, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress:'0xF22AF684c4389c7899777660D3ec29b9745C6222',
      iconUrl: "/shib_icon.webp"
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET],ICASH],
      stakingRewardAddress:'0x26a346dDbb7ea083c85c696Cfa77F84C8bd4109d',
      iconUrl: "/icash_icon.webp"
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET],SHIH],
      stakingRewardAddress:'0x667202a1Dc34EFA5f54580C8E69f8128573786f4',
      iconUrl: "/shih_icon.webp"
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], CJAI],
      stakingRewardAddress: '0x261f94f98327b17649eda469c958deaac4c479d5',
      iconUrl: "/caojunnft_icon.webp"
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
      idoAddress: '0x887Ed22FAF9C4B985ecB019eA54A5185350AE214'
    }

  ]
}

//0xb222571f700a9f0A86a4e70A5dA16d9Da8b9E042
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
  rewardsDuration : number
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount,
  iconUrl: string
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
  rewardsDuration : number
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

  // const startTimes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'startTime')
  const rewardsDurations = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'rewardsDuration')
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
      // const startTimeState = startTimes[index]
      const rewardsDurationState = rewardsDurations[index]

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
          rewardsDurationState &&
          !rewardsDurationState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error||
            rewardsDurationState.error
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
        // const startTimeMs = startTimeState.result?.[0]?.mul(1000)?.toNumber()
        const rewardsDuration = rewardsDurationState.result?.[0]?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          iconUrl: info[index].iconUrl,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(info[index].tokens[1], JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          rewardsDuration: rewardsDuration,
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
  userLiquidityUnstaked: TokenAmount|CurrencyAmount | undefined
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
  const rewardsDurations = useMultipleContractSingleData(idoAddresses, IDO_ABI_INTERFACE, 'rewardsDuration')


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
      const rewardsDurationState = rewardsDurations[index]

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
          !totalMakeState.loading &&
        rewardsDurationState &&
        !rewardsDurationState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error ||
            rewardsDurationState.error
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
        const rewardsDuration = rewardsDurationState.result?.[0].toNumber()

        memo.push({
          idoAddress: idoAddress,
          tokens: info[index].tokens,
          rewardsDuration:rewardsDuration,
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
