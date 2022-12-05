import React, {useEffect, useMemo, useState} from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { JSBI, ETHER } from '@teaswap/uniswap-sdk'
import { useParams } from 'react-router-dom'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import StakingModal from '../../components/earn/StakingModal'
import {STAKING_GENESIS, useStakingInfo} from '../../state/stake/hooks'
import UnstakingModal from '../../components/earn/UnstakingModal'
import {ClaimRewardModal} from '../../components/earn/ClaimRewardModal'
import {useETHBalances, useTokenBalance} from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useColor } from '../../hooks/useColor'
import { CountUp } from 'use-count-up'

import { wrappedCurrency } from '../../utils/wrappedCurrency'
// import { currencyId } from '../../utils/currencyId'
// import { useTotalSupply } from '../../data/TotalSupply'
// import { usePair } from '../../data/Reserves'
import usePrevious from '../../hooks/usePrevious'
// import useUSDCPrice from '../../utils/useUSDCPrice'
import { BIG_INT_ZERO } from '../../constants'
import { MEDIA_QUERY } from '../../constants/style'
import {Countdown} from "./Countdown";
import NFTStakingModal from "../../components/earn/NFTStakingModal";

const PageWrapper = styled(AutoColumn)`
  margin-top: 50px;
  max-width: 640px;
  width: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 16px 24px rgba(0, 0, 0, 0.06),
  0px 24px 32px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  ${MEDIA_QUERY.sm} {
    margin: 0 auto;
    margin-top: 30px;
  }
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
  padding: 1rem;
  ${MEDIA_QUERY.sm} {
    margin: 0 auto;
  }
`

const BottomSection = styled(AutoColumn)`
  border-radius: 0px;
  width: 100%;
  position: relative;
`

const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.green : theme.bg5} 100%) `};
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  // margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`

const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%,#60a7ac 0%, #60a7ac 100%);
  overflow: hidden;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

const WithdarBtn = styled(ButtonPrimary)`
  ${MEDIA_QUERY.sm} {
    margin-top: 20px;
  }
`

const Manage = ()=>{


// export default function Index({
//   match: {
//     params: { currencyIdA, currencyIdB }
//   }
// }: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const params = useParams()
  console.log("dddddd param:"+JSON.stringify(params))
  const stakingInfo = useStakingInfo(params.stakingRewardAddress)?.[0]

  // get currencies and pair
  const [currencyA, currencyB] = [useCurrency(params.currencyIdA,stakingInfo?.cate==='NFT'), useCurrency(params.currencyIdB)]
  const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  // const [, stakingTokenPair] = usePair(tokenA, tokenB)
  // const stakingInfo = useStakingInfo(stakingTokenPair)?.[0]


  const userETHBlance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const userTokenAmount = useTokenBalance(account ?? undefined, stakingInfo?.stakedAmount?.token)
  const userLiquidityUnstaked = currencyA===ETHER? userETHBlance : userTokenAmount
  console.log("dddddd rewardAddress:"+params.stakingRewardAddress)
  console.log("dddddd userTokenAmount:"+userTokenAmount)
  // detect existing unstaked LP position to show add button if none found
  // const userLiquidityUnstaked = useTokenBalance(account ?? undefined, stakingInfo?.stakedAmount?.token)
  const showAddLiquidityButton = Boolean(stakingInfo?.stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState<boolean>(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState<boolean>(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState<boolean>(false)

  console.log("dddddd stakingInfo:", stakingInfo, showStakingModal, showUnstakingModal, showClaimRewardModal)

  // fade cards if nothing staked or nothing earned yet
  const disableTop = !stakingInfo?.stakedAmount || stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0))

  const token = currencyA === ETHER ? tokenB : tokenA
  // const WETH = currencyA === ETHER ? tokenA : tokenB
  const backgroundColor = useColor(token)

  // get WETH value of staked LP tokens
  // const totalSupplyOfStakingToken = useTotalSupply(stakingInfo?.stakedAmount?.token)
  // let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  // if (totalSupplyOfStakingToken && stakingTokenPair && stakingInfo && WETH) {
  //   // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
  //   valueOfTotalStakedAmountInWETH = new TokenAmount(
  //     WETH,
  //     JSBI.divide(
  //       JSBI.multiply(
  //         JSBI.multiply(stakingInfo.totalStakedAmount.raw, stakingTokenPair.reserveOf(WETH).raw),
  //         JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
  //       ),
  //       totalSupplyOfStakingToken.raw
  //     )
  //   )
  // }

  const countUpAmount = stakingInfo?.earnedAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  // get the USD value of staked WETH
  // const USDPrice = useUSDCPrice(WETH)
  // const valueOfTotalStakedAmountInUSDC =
  //   valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)

  const toggleWalletModal = useWalletModalToggle()

  // const handleDepositClick = useCallback(() => {
  //   if (account) {
  //     console.log(showStakingModal)
  //     setShowStakingModal(true)
  //     console.log(showStakingModal)
  //   } else {
  //     toggleWalletModal()
  //   }
  // }, [setShowStakingModal, account, toggleWalletModal])

  const duration = useMemo(() => (stakingInfo?.rewardsDuration ? stakingInfo?.rewardsDuration : 100000), [
    stakingInfo?.rewardsDuration
  ])

  const end = useMemo(() => (stakingInfo?.periodFinish ? stakingInfo?.periodFinish?.getTime()/1000 : STAKING_GENESIS + duration), [
    stakingInfo?.periodFinish,duration
  ])

  const begin = useMemo(() => (end - duration), [end,duration])

  // get current time
  const [time, setTime] = useState(() => Math.floor(Date.now() / 1000))
  useEffect((): (() => void) | void => {
    // we only need to tick if rewards haven't ended yet
    if (time <= end) {
      const timeout = setTimeout(() => setTime(Math.floor(Date.now() / 1000)), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [time, end])

  const timeUntilGenesis = begin - time
  const timeUntilEnd = end - time
  // let hasGetInfo = false
  // hasGetInfo = useMemo(()=>{
  //   if(stakingInfo){ return true}
  //   if(!stakingInfo&&hasGetInfo){return true}
  //   if(!stakingInfo&&hasGetInfo){return true}
  //   return false
  // },[stakingInfo,hasGetInfo])

  const getTo = (stakingInfo: any, symbol: string) => {
    if (symbol.toUpperCase() === 'THB')  {
      return '/thb'
    }
    if (stakingInfo.stakingRewardAddress === '0xedb1b06c4f13626984f4d6ce8521baaba4d1d453') {
      return '/blind-box'
    }
    if (stakingInfo.stakingRewardAddress === '0x1B0c0d5B6dA81eeAfeE73F769591fA58525E03C8') {
      return '/nft/products/category/6'
    }
    return stakingInfo?.cate!="NFT" ? currencyA?.symbol?.includes("BLP")?  `/add` : `/swap`:`/nft`
  }


  return (
    <PageWrapper gap="lg" justify="center">


      {stakingInfo && stakingInfo?.cate!='NFT' && (

          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingInfo={stakingInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
        )}
      {stakingInfo && stakingInfo?.cate==='NFT' && (

          <NFTStakingModal
              isOpen={showStakingModal}
              onDismiss={() => setShowStakingModal(false)}
              stakingInfo={stakingInfo}
              userLiquidityUnstaked={userLiquidityUnstaked}
          />
      )}
      {stakingInfo && (
          <UnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            stakingInfo={stakingInfo}
            isNFT = {stakingInfo?.cate==='NFT'}
          />
      )}
      {stakingInfo && (
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            stakingInfo={stakingInfo}
          />

      )}


      <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
          {currencyA?.symbol}-{currencyB?.symbol} {t('liquidityMining')}
        </TYPE.mediumHeader>
        <DoubleCurrencyLogo currency0={currencyA ?? undefined} currency1={currencyB ?? undefined} size={24} />
      </RowBetween>

      <DataRow style={{ gap: '24px' }}>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>{t('totalDeposits')}</TYPE.body>
            {/*<TYPE.body fontSize={24} fontWeight={500}>*/}
            {/*  {valueOfTotalStakedAmountInUSDC*/}
            {/*    ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`*/}
            {/*    : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} BNB`}*/}
            {/*</TYPE.body>*/}
            <TYPE.body fontSize={24} fontWeight={500}>
              {stakingInfo?.totalStakedAmount
                ? `${stakingInfo?.totalStakedAmount.toFixed(!currencyA?.decimals?0:4, { groupSeparator: ',' })} ${currencyA?.symbol}`
                : `${stakingInfo?.totalStakedAmount?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currencyA?.symbol}`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>{t('poolRate')}</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {stakingInfo?.totalRewardRate
                ?.multiply((60 * 60 * 24 * 7).toString())
                ?.toFixed(0, { groupSeparator: ',' }) ?? '-' }
              {' '}{currencyB?.symbol} {' / week'}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
      </DataRow>

      {showAddLiquidityButton && (
        <VoteCard>
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>
                  {t('step')} 1. {t('get-best-v2-liquidity-tokens',{
                  symbolOne: currencyA?.symbol
                })}
                </TYPE.white>
              </RowBetween>
              <RowBetween style={{ marginBottom: '1rem' }}>
                <TYPE.white fontSize={14}>
                  {/* {`BEST-V2 LP tokens are required. Once you've added liquidity to the ${currencyA?.symbol}-${currencyB?.symbol} pool you can stake your liquidity tokens on this page.`} */}
                  {t(
                    'best-v2-lp-tokens-are-required-once-youve-added-liquidity-to-the-symbolone-symboltwo-pool-you-can-stake-your-liquidity-tokens-on-this-page',
                    {
                      symbolOne: currencyA?.symbol
                    }
                  )}
                </TYPE.white>
              </RowBetween>
              <ButtonPrimary
                padding="8px"
                borderRadius="0px"
                width={'fit-content'}
                as={Link}
                to={getTo(stakingInfo, currencyA?.symbol || '')}
              >
                {`GET ${currencyA?.symbol}`}
              </ButtonPrimary>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </VoteCard>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledDataCard disabled={disableTop} bgColor={backgroundColor} showBackground={!showAddLiquidityButton}>
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>{t('yourLiquidityDeposits')}</TYPE.white>
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.white fontSize={36} fontWeight={600}>
                    {stakingInfo?.stakedAmount?.toSignificant(6) ?? '-'}
                  </TYPE.white>
                  <TYPE.white>
                    {currencyA?.symbol}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard style={{padding: '0'}} dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}>
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn className="padding-column" gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>{t('yourUnclaimed')} {currencyB?.symbol}</TYPE.black>
                </div>
                {stakingInfo?.earnedAmount && JSBI.notEqual(BIG_INT_ZERO, stakingInfo?.earnedAmount?.raw) && (
                  <ButtonEmpty
                    padding="8px"
                    borderRadius="0px"
                    width="fit-content"
                    onClick={() => setShowClaimRewardModal(true)}
                  >
                    {t('claim')}
                  </ButtonEmpty>
                )}
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
                <TYPE.black fontSize={16} fontWeight={500}>
                 
                </TYPE.black>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                </TYPE.largeHeader>
                <TYPE.black fontSize={16} fontWeight={500}>
                  <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px ' }}>
                    ⚡
                  </span>
                  {stakingInfo?.rewardRate
                    ?.multiply((60 * 60 * 24 * 7).toString())
                    ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}
                  {' ' + currencyB?.symbol} {' / week'}
                </TYPE.black>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>

        <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
          <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
            ⭐️
          </span>
          {t('when-you-withdraw-the-contract-will-automagically-claim-best-on-your-behalf')}
        </TYPE.main>
        <Countdown exactEnd={stakingInfo?.periodFinish} rewardsDuration={stakingInfo?.rewardsDuration} />

        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: '1rem' }}>
            <ButtonPrimary padding="8px" borderRadius="0px" width="300px" onClick={()=>{
              if (account) {
                    console.log(showStakingModal)
                    setShowStakingModal(true)
                    console.log(showStakingModal)
                  } else {
                    toggleWalletModal()
                  }
            }}
            disabled={timeUntilGenesis>=0||timeUntilEnd<=0} >
              {(stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0))||stakingInfo?.unclaimAmount?.greaterThan(JSBI.BigInt(0))) ? t('deposit') : t('deposit')+' Tokens'}
            </ButtonPrimary>

            {(stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0))||stakingInfo?.unclaimAmount?.greaterThan(JSBI.BigInt(0))) && (
              <>
                <WithdarBtn
                  padding="8px"
                  borderRadius="0px"
                  width="300px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  {t('withdraw')}
                </WithdarBtn>
              </>
            )}
          </DataRow>
        )}
        {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo('0') ? null : (
          <TYPE.main>
            {userLiquidityUnstaked.toSignificant(6)} {t('tokensAvailable')}
          </TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  )
};
export default Manage;
