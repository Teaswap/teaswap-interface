import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ETHER, JSBI, TokenAmount } from '@teaswap/uniswap-sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
// import useUSDCPrice from '../../utils/useUSDCPrice'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 0px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background:radial-gradient(76.02% 75.41% at 1.84% 0%,#60a7ac 0%, #60a7ac 100%);
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

export default function PoolCard({ stakingInfo }: { stakingInfo: StakingInfo }) {
  const { t } = useTranslation()

  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const token = currency0 === ETHER ? token1 : token0
  const WETH = currency0 === ETHER ? token0 : token1
  const backgroundColor = useColor(token)

  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo.stakedAmount.token)
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens)

  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  if (totalSupplyOfStakingToken && stakingTokenPair) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = new TokenAmount(
      WETH,
      JSBI.divide(
        JSBI.multiply(
          JSBI.multiply(stakingInfo.totalStakedAmount.raw, stakingTokenPair.reserveOf(WETH).raw),
          JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
        ),
        totalSupplyOfStakingToken.raw
      )
    )
  }

  // get the USD value of staked WETH
  // const USDPrice = useUSDCPrice(WETH)
  // const valueOfTotalStakedAmountInUSDC =
  //   valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)

  return (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>


      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '8px' }}>
          stake {currency0.symbol} earn {currency1.symbol}
        </TYPE.white>

        <StyledInternalLink to={`/staking/${currencyId(currency0)}/${currencyId(currency1)}/${stakingInfo.stakingRewardAddress}`} style={{ width: '100%' }}>
          <ButtonPrimary padding="8px" borderRadius="0px">
            {isStaking ? t('manage') : t('deposit')}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> {t('totalDeposited')}</TYPE.white>
          {/*<TYPE.white>*/}
          {/*  {valueOfTotalStakedAmountInUSDC*/}
          {/*    ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`*/}
          {/*    : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currency0.symbol}`}*/}
          {/*</TYPE.white>*/}
          <TYPE.white>
            {stakingInfo.totalStakedAmount
              ? `${stakingInfo.totalStakedAmount.toFixed(0, { groupSeparator: ',' })} ${currency0.symbol}`
              : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currency0.symbol}`}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> {t('poolRate')} </TYPE.white>
          <TYPE.white>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24 * 7}`)
            ?.toFixed(0, { groupSeparator: ',' })} ${token1.symbol} / week`}</TYPE.white>
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>{t('yourRate')}</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7}`)
                ?.toSignificant(4, { groupSeparator: ',' })} ${token0.symbol} / week`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper>
  )
}
