import React, {  useState } from 'react'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { JSBI} from '@teaswap/uniswap-sdk'
import { useParams } from 'react-router-dom'
// import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import { useIdoInfo } from '../../state/stake/hooks'
// import ClaimRewardModal from '../../components/earn/ClaimRewardModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
// import { useColor } from '../../hooks/useColor'
import { CountUp } from 'use-count-up'

// import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { currencyId } from '../../utils/currencyId'

import usePrevious from '../../hooks/usePrevious'

import { BIG_INT_ZERO } from '../../constants'
import BuyingModal from '../../components/ido/BuyingModal'
import ClaimIdoRewardModal from '../../components/earn/ClaimRewardModal'
import ConTitle from '../../components/Content/Title'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px
  width: 100%;
`

const Box = styled(ColumnCenter)`
  max-width: 355px;
  width: 100%;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 65%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 0px;
  width: 100%;
  position: relative;
`

const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #7f7f7f 0%, #7f7f7f 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
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

const DataRow = styled(ColumnCenter)`
  justify-content: center;
`
const Index = ()=>{


// export default function Index({
//   match: {
//     params: { currencyIdA, currencyIdB }
//   }
// }: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const params = useParams()

  // get currencies and pair
  const [currencyA, currencyB] = [useCurrency(params.currencyIdA), useCurrency(params.currencyIdB)]
  // const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  // const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  // const [, stakingTokenPair] = usePair(tokenA, tokenB)
  // const stakingInfo = useStakingInfo(stakingTokenPair)?.[0]
  const idoInfo = useIdoInfo(params.idoAddress)?.[0]

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(account ?? undefined, idoInfo?.makeAmount?.token)
  const showAddLiquidityButton = Boolean(idoInfo?.makeAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState<boolean>(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState<boolean>(false)

  // fade cards if nothing staked or nothing earned yet
  const disableTop = !idoInfo?.makeAmount || idoInfo.makeAmount.equalTo(JSBI.BigInt(0))

  // const token = currencyA === ETHER ? tokenB : tokenA
  // const WETH = currencyA === ETHER ? tokenA : tokenB
  // const backgroundColor = useColor(token)

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

  const countUpAmount = idoInfo?.earnedAmount?.toFixed(6) ?? '0'
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



  return (
    <PageWrapper gap="lg" justify="center">

      <ConTitle con="CaoJun limited edition NFT series" />

      {idoInfo && (

          <BuyingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            idoInfo={idoInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
        )}

      {idoInfo && (
          <ClaimIdoRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            idoInfo={idoInfo}
          />

      )}
      {/* <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
          Send {currencyA?.symbol} to buy {currencyB?.symbol} {t('Initial DEFI Offering')}
        </TYPE.mediumHeader>
        <DoubleCurrencyLogo currency0={currencyA ?? undefined} currency1={currencyB ?? undefined} size={24} /> */}
      {/* </RowBetween> */}
      <Box>
          <PoolData>
            <AutoColumn gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>{t('Total Supply')}</TYPE.darkGray>
              {/*<TYPE.darkGray fontSize={24} fontWeight={500}>*/}
              {/*  {valueOfTotalStakedAmountInUSDC*/}
              {/*    ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`*/}
              {/*    : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} BNB`}*/}
              {/*</TYPE.darkGray>*/}
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                {idoInfo?.totalmakeAmount
                  ? `${idoInfo?.totalmakeAmount.toFixed(0, { groupSeparator: ',' })} ${currencyA?.symbol}`
                  : `${idoInfo?.totalmakeAmount?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currencyA?.symbol}`}
              </TYPE.darkGray>
            </AutoColumn>
          </PoolData>
          <PoolData>
            <AutoColumn gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>{t('Rate')}</TYPE.darkGray>
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                {idoInfo?.price
                  ?.toFixed(0, { groupSeparator: ',' }) ?? '-' }{":1 "}
                {currencyA?.symbol}{':'}{currencyB?.symbol}
              </TYPE.darkGray>
            </AutoColumn>
          </PoolData>

        {showAddLiquidityButton && (
          <VoteCard>
            <CardNoise />
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>
                    {t('step')} 1. {t('get-best-v2-liquidity-tokens')}
                  </TYPE.white>
                </RowBetween>
                <RowBetween style={{ marginBottom: '1rem' }}>
                  <TYPE.white fontSize={14}>
                    {/* {`BEST-V2 LP tokens are required. Once you've added liquidity to the ${currencyA?.symbol}-${currencyB?.symbol} pool you can stake your liquidity tokens on this page.`} */}
                    {t(
                      'best-v2-lp-tokens-are-required-once-youve-added-liquidity-to-the-symbolone-symboltwo-pool-you-can-stake-your-liquidity-tokens-on-this-page',
                      {
                        symbolOne: currencyA?.symbol,
                        symbolTwo: currencyB?.symbol
                      }
                    )}
                  </TYPE.white>
                </RowBetween>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="0px"
                  width={'fit-content'}
                  as={Link}
                  to={`/add/${currencyA && currencyId(currencyA)}/${currencyB && currencyId(currencyB)}`}
                >
                  {`Add ${currencyA?.symbol}-${currencyB?.symbol} liquidity`}
                </ButtonPrimary>
              </AutoColumn>
            </CardSection>
            <CardBGImage />
            <CardNoise />
          </VoteCard>
        )}

        <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
          <BottomSection gap="lg" justify="center">
            <StyledDataCard disabled={disableTop} showBackground={!showAddLiquidityButton}>
              <CardSection>
                <CardBGImage desaturate />
                <CardNoise />
                <AutoColumn gap="md">
                  <RowBetween>
                    <TYPE.white fontWeight={600}>{t('Your Token Paid')}</TYPE.white>
                  </RowBetween>
                  <RowBetween style={{ alignItems: 'baseline' }}>
                    <TYPE.white fontSize={28} fontWeight={600}>
                      {idoInfo?.makeAmount?.toSignificant(6) ?? '-'}
                    </TYPE.white>
                    <TYPE.white>
                      {currencyA?.symbol}
                    </TYPE.white>
                  </RowBetween>
                </AutoColumn>
              </CardSection>
            </StyledDataCard>
            <StyledBottomCard dim={idoInfo?.makeAmount?.equalTo(JSBI.BigInt(0))}>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="sm">
                <RowBetween>
                  <div>
                    <TYPE.black>{t('Your Unclaimed')} {currencyB?.symbol}</TYPE.black>
                  </div>
                  {idoInfo?.earnedAmount && JSBI.notEqual(BIG_INT_ZERO, idoInfo?.earnedAmount?.raw) && (
                    <ButtonEmpty
                      padding="8px"
                      borderRadius="0px"
                      width="fit-content"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      {t('Total Earned')}
                    </ButtonEmpty>
                  )}
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.largeHeader fontSize={28} fontWeight={600}>
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
                    <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px ' }}>
                      ⚡
                    </span>
                    {idoInfo?.claimedAmount
                      ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}
                    {currencyB?.symbol}
                  </TYPE.black>
                </RowBetween>
              </AutoColumn>
            </StyledBottomCard>
          </BottomSection>
          {/* <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
            <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
              ⭐️
            </span>
            {t('when-you-withdraw-the-contract-will-automagically-claim-best-on-your-behalf')}
          </TYPE.main> */}

          {!showAddLiquidityButton && (
            <DataRow style={{ marginBottom: '1rem' }}>
              <ButtonPrimary padding="8px" borderRadius="0px" width="266px" onClick={()=>{
                if (account) {
                      console.log(showStakingModal)
                      setShowStakingModal(true)
                      console.log(showStakingModal)
                    } else {
                      toggleWalletModal()
                    }
              }}>
                {idoInfo?.makeAmount?.greaterThan(JSBI.BigInt(0)) ? 'Buy' : 'Participate'}
              </ButtonPrimary>

              {idoInfo?.earnedAmount?.subtract(idoInfo?.claimedAmount).greaterThan(JSBI.BigInt(0)) && (
                <>
                  <ButtonPrimary
                    padding="8px"
                    borderRadius="0px"
                    width="160px"
                    onClick={() => setShowClaimRewardModal(true)}
                  >
                    {t('withdraw')}
                  </ButtonPrimary>
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
      </Box>
      
    </PageWrapper>
  )
};
export default Index;