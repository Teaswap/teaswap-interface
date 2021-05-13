import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TYPE } from '../../theme'
import { ETHER, JSBI, TokenAmount } from '@teaswap/uniswap-sdk'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'

import tokenTSAIcon from '../../assets/images/tokenTSA.webp'
import tokenSATOIcon from '../../assets/images/tokenSATO.webp'
import { MEDIA_QUERY } from '../../constants/style'
import {Countdown} from "../../pages/Earn/Countdown";

const Title = styled.span`
  color: #7f7f7f;
  font-size: 18px;
  margin-top: 15px;
  font-weight: bolder;
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  text-align: center;
  max-width: 330px;
  width: 100%;
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: flex-start;
  border-width: 0 0 0 0;
  border-style: solid solid solid solid;
  border-color: rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1) rgba(176, 169, 134, 1);
  border-radius: 0 0 0 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 65%);
  overflow: hidden;
  transform: translateZ(0);
  margin: 0px;
  align-items: center;
  margin-right: 20px;
  margin-top: 30px;
  ${MEDIA_QUERY.sm} {
    margin-right: 0;
  }
`

// const TopSection = styled.div`
//   align-items: center;
// `

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  border-radius: 0 0 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: none;
    color: inherit;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  :active {
    text-decoration: none;
    color: inherit;
  }
`
const SelectBtn = styled.span`
  margin: 40px 0 37px 0;
  width: 286px;
  height: 42px;
  color: rgb(51,51,51);
  border: 1px solid rgb(51,51,51);
  text-align: center;
  line-height: 40px;
  align-self: center;
  display: block;
  :hover{
    background: rgb(184, 184, 184);
    color: #ffffff;
  }
`
const Spe = styled.p`
  justify-self: start;
  align-self: center; 
  width: 268px;
  height: 1px;
  background: rgb(179,179,179);
`

const CoinRowBetween = styled(RowBetween)`
  width: 250px;
  margin-top: 16px;
  font-weight: bolder;
`

export default function PoolCard({ stakingInfo }: { stakingInfo: StakingInfo }) {
  const { t } = useTranslation()

  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)

  let tokenIcon = tokenTSAIcon
  console.log('token', stakingInfo.tokens)

  if (token1.address == '0xF6E6892325a74383A70570F1EBea9A476483a611') {
    tokenIcon = tokenSATOIcon
  }

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // const tokenIcon = stakingInfo.stakingRewardAddress == ''

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
      <img src={tokenIcon} width="103" height="103" />
      
      <Title>
        {currency0.symbol}-{currency1.symbol}
      </Title>
      <Spe />
      <CoinRowBetween>
        <TYPE.black> {t('Deposit')}</TYPE.black>
        <TYPE.black fontWeight='bolder'>
          {currency0.symbol}
        </TYPE.black>
      </CoinRowBetween>
      <CoinRowBetween>
        <TYPE.black> {t('Earn')}</TYPE.black>
        <TYPE.black fontWeight='bolder'>
          {currency1.symbol}
        </TYPE.black>
      </CoinRowBetween>
      <RowBetween style={{width: '250px', marginTop: '24px'}}>
        <TYPE.black> {t('totalDeposited')}</TYPE.black>
        <TYPE.black fontWeight='bolder'>
          {stakingInfo.totalStakedAmount
            ? `${stakingInfo.totalStakedAmount.toFixed(4, { groupSeparator: ',' })} ${currency0.symbol}`
            : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ${currency0.symbol}`}
        </TYPE.black>
      </RowBetween>
      <RowBetween style={{width: '250px', marginTop: '24px'}}>
        <TYPE.black> {t('poolRate')} </TYPE.black>
        <TYPE.black fontWeight='bolder'>
          {`${stakingInfo.totalRewardRate
          ?.multiply(`${60 * 60 * 24 * 7}`)
          ?.toFixed(0, { groupSeparator: ',' })} ${token1.symbol} / week`}</TYPE.black>
      </RowBetween>
        <RowBetween style={{width: '250px', marginTop: '24px'}}>
            <Countdown exactEnd={stakingInfo?.periodFinish} rewardsDuration={stakingInfo?.rewardsDuration} />
        </RowBetween>

        <StyledLink href={`/staking/${currencyId(currency0)}/${currencyId(currency1)}/${stakingInfo.stakingRewardAddress}`} >
        <SelectBtn> 
          {isStaking ? t('manage') : t('select')}
        </SelectBtn>
      </StyledLink>

      {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black fontWeight={500}>
              <span>{t('yourRate')}</span>
            </TYPE.black>
            <TYPE.black style={{ textAlign: 'right' }} fontWeight={500}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7}`)
                ?.toSignificant(4, { groupSeparator: ',' })} ${token1.symbol} / week`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper>
  )
}
