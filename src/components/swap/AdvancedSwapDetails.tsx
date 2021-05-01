import { Trade, TradeType } from '@teaswap/uniswap-sdk'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from 'styled-components'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SectionBreak } from './styleds'
import SwapRoute from './SwapRoute'

// const InfoLink = styled(ExternalLink)`
//   width: 100%;
//   border: 1px solid ${({ theme }) => theme.bg3};
//   padding: 6px 6px;
//       border-radius: 0px;
//   text-align: center;
//   font-size: 14px;
//   color: ${({ theme }) => theme.text1};
// `

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()

  const theme = useContext(ThemeContext)
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <>
      <AutoColumn style={{ padding: '0 25px' }}>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {isExactIn ? t('minimumReceived') : t('maximumSold')}
            </TYPE.black>
            <QuestionHelper
              text={t(
                'your-transaction-will-revert-if-there-is-a-large-unfavorable-price-movement-before-it-is-confirmed'
              )}
            />
          </RowFixed>
          <RowFixed>
            <TYPE.black color={theme.text1} fontSize={14}>
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                  '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {t('priceImpact')}
            </TYPE.black>
            <QuestionHelper text={t('the-difference-between-the-market-price-and-estimated-price-due-to-trade-size')} />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {t('liquidityProviderFee')}
            </TYPE.black>
            <QuestionHelper
              text={t('a-portion-of-each-trade-0-30-goes-to-liquidity-providers-as-a-protocol-incentive')}
            />
          </RowFixed>
          <TYPE.black fontSize={14} color={theme.text1}>
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </TYPE.black>
        </RowBetween>
      </AutoColumn>
    </>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()

  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="md">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <SectionBreak />
              <AutoColumn style={{ padding: '0 24px' }}>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                    {t('route')}
                  </TYPE.black>
                  <QuestionHelper text={t('routing-through-these-tokens-resulted-in-the-best-price-for-your-trade')} />
                </RowFixed>
                <SwapRoute trade={trade} />
              </AutoColumn>
            </>
          )}
          {/*<AutoColumn style={{ padding: '0 24px' }}>*/}
          {/*  <InfoLink href={'https://uniswap.info/pair/' + trade.route.pairs[0].liquidityToken.address} target="_blank">*/}
          {/*    {t('viewPairAnalytics')} ↗*/}
          {/*  </InfoLink>*/}
          {/*</AutoColumn>*/}
        </>
      )}
    </AutoColumn>
  )
}
