import React, {  useState } from 'react'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {ETHER, JSBI} from '@teaswap/uniswap-sdk'
import { useParams } from 'react-router-dom'
// import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { ExternalLink, TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import { useIdoInfo } from '../../state/stake/hooks'
// import ClaimRewardModal from '../../components/earn/ClaimRewardModal'
import {useETHBalances, useTokenBalance} from '../../state/wallet/hooks'
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
import IncubatorBox from '../../components/general/IncubatorBox'
import ConSubTitle from '../../components/Content/SubTitle'

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  margin-top: -70px;
`

const AuthorInfo = styled(ColumnCenter)`
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Author = styled(ColumnCenter)`
  width: 455px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #7f7f7f;
  font-size: 13px;
`

const Box = styled(ColumnCenter)`
  width: 355px;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 65%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
  margin-left: 40px;
  margin-top: 55px;
  padding-bottom: 20px;
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
  background-color: #B3B3B3;
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
  // background: radial-gradient(76.02% 75.41% at 1.84% 0%,#60a7ac 0%, #60a7ac 100%);
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
  console.log('idoInfo', idoInfo)

  // detect existing unstaked LP position to show add button if none found
  const userETHBlance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const userTokenAmount = useTokenBalance(account ?? undefined, idoInfo?.makeAmount?.token)
  const userLiquidityUnstaked = currencyA===ETHER? userETHBlance : userTokenAmount
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

  const countUpAmount = idoInfo?.unclaimAmount?.toFixed(4) ?? '0'
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
      <IncubatorBox />
      <ConTitle con="CaoJun NFT Collections" />

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
      <AuthorInfo>
        <Author>
          <img src={process.env.PUBLIC_URL + '/cjainft.webp'} width="150" height="110" style={{marginBottom: '60px'}}/>
          <ConSubTitle con="CaoJun Limited Edition NFT Series" />
          <ol>
            <li>Key points for CaoJun NFT Collectibles Initial Art Offering ("CJAI IRO")</li>
            <li>Total Edition of CaoJunNFT Collectibles : 600</li>
            <li>Total TSA released for CJAI : 15,000,000</li>
            <li>1 $TSA = 0.00008 BNB</li>
            <li>List TSA Token on TEAswap, BakerySwap and SwapAll for trading and liquidity farming;</li>
            <li>Able to stake TSA to earn CJAI, Deposit TSA-BNB BLP to earn TSA, Deposit TSA-BUSD to earn TSA, and Deposit TSA-USDT BLP to earn TSA.</li>
            <li>TSA can be convertible & tradeable into CaoJunNFT.</li>
            <li>100,000 TSA can be exchanged with 1 CaoJun NFT, and 1 CaoJunNFT can be converted into one exclusive CaoJun limited edition of digital collectible ("CaoJun Digital Collectible")</li>
            <li>No minimum: Users can buy fractions of $TSA Offering Details : https://www.caojunnft.com</li>
          </ol>
        </Author>
        <Box>
          <PoolData>
            <AutoColumn gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>{t('Total Supply')}</TYPE.darkGray>
              {/*<TYPE.darkGray fontSize={24} fontWeight={500}>*/}
              {/*  {valueOfTotalStakedAmountInUSDC*/}
              {/*    ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`*/}
              {/*    : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} BNB`}*/}
              {/*</TYPE.darkGray>*/}
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.darkGray fontSize={24} fontWeight={500}>
                  {idoInfo?.totalsupplayAmount
                    ? `${idoInfo?.totalsupplayAmount.toFixed(0, { groupSeparator: ',' })} ${currencyB?.symbol}`
                    : `${idoInfo?.totalsupplayAmount?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currencyB?.symbol}`}
                </TYPE.darkGray>
                <TYPE.gray>
                  {idoInfo?.totalSoldAmount?.toSignificant(2, { groupSeparator: ',' }) ?? '-'} {t('sold')}
                </TYPE.gray>
              </RowBetween>
            </AutoColumn>
          </PoolData>
          <PoolData>
            <AutoColumn gap="sm">
              <TYPE.darkGray style={{ margin: 0 }}>{t('Price')}</TYPE.darkGray>
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                1 {currencyB?.symbol} {t('need')} {''}
                {idoInfo?.price
                  ? `${idoInfo?.price.toFixed(6, { groupSeparator: ',' })} ${currencyA?.symbol} `
                    :`${idoInfo?.price?.toSignificant(6, { groupSeparator: ',' }) ?? '-'} ${currencyA?.symbol} `}
              </TYPE.darkGray>
              <TYPE.darkGray style={{ margin: 0 }}>{t('Rate')}</TYPE.darkGray>
              <TYPE.darkGray fontSize={24} fontWeight={500}>
                1 {currencyA?.symbol} {t('buy')} {''}
                {idoInfo?.rate
                    ? `${idoInfo?.rate.toFixed(2, { groupSeparator: ',' })} ${currencyB?.symbol} `
                    :`${idoInfo?.rate?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currencyB?.symbol} `}

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
                        {idoInfo?.makeAmount?.toSignificant(4) ?? '-'}
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
                    {idoInfo?.unclaimAmount && JSBI.notEqual(BIG_INT_ZERO, idoInfo?.unclaimAmount?.raw) && (
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
                        ⚡ {t('Total Earned')}
                      </span>
                      {idoInfo?.earnedAmount
                        ?.toSignificant(2, { groupSeparator: ',' }) ?? '-'}
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
                  {idoInfo?.makeAmount?.greaterThan(JSBI.BigInt(0)) ? t('Buy Again') : t('Participate')}
                </ButtonPrimary>

                {idoInfo?.earnedAmount?.subtract(idoInfo?.claimedAmount).greaterThan(JSBI.BigInt(0)) && (

                    <ButtonPrimary
                        marginTop="5px"
                        padding="8px"
                      borderRadius="0px"
                      width="266px"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      {t('claim')}
                    </ButtonPrimary>
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
      </AuthorInfo>

      <IframeComponent iframe={iframe} />
      <div style={{color: "#474747"}}>
      ** Converting into one exclusive CaoJun NFT limited edition of digital collectible  or original collectibles ? 
        <ExternalLink href={"https://docs.google.com/forms/d/e/1FAIpQLSfKQ5ESZ_843cjHGBwKuObT79bfjUPQ3XHOJpy9vw2VFbAZVA/viewform"}>
          Submit Now .
        </ExternalLink>
      </div>
      
    </PageWrapper>
  )
};

function IframeComponent(props: any) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

const iframe = '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="849" height="521" style="margin-top: 30px;" src="https://www.youtube.com/embed/xa8OBoVx2yk?autoplay=0&amp;mute=0&amp;controls=1&amp;loop=0&amp;origin=https%3A%2F%2Fwww.teaswap.live&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>'; 

export default Index;