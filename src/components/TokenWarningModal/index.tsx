import { Token } from '@teaswap/uniswap-sdk'
import { transparentize } from 'polished'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
import { useAllTokens } from '../../hooks/Tokens'
import { ExternalLink, TYPE } from '../../theme'
import { getBscScanLink, shortenAddress } from '../../utils'
import CurrencyLogo from '../CurrencyLogo'
import Modal from '../Modal'
import { AutoRow, RowBetween } from '../Row'
import { AutoColumn } from '../Column'
import { AlertTriangle } from 'react-feather'
import { ButtonError } from '../Button'

const Wrapper = styled.div<{ error: boolean }>`
  background: ${({ theme }) => transparentize(0.6, theme.bg3)};
  padding: 0.75rem;
  border-radius: 0px;
`

const WarningContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  background: rgba(242, 150, 2, 0.05);
  border: 1px solid #f3841e;
  border-radius: 0px;
  overflow: auto;
`

const StyledWarningIcon = styled(AlertTriangle)`
  stroke: ${({ theme }) => theme.red2};
`

interface TokenWarningCardProps {
  token?: Token
}

function TokenWarningCard({ token }: TokenWarningCardProps) {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const tokenSymbol = token?.symbol?.toLowerCase() ?? ''
  const tokenName = token?.name?.toLowerCase() ?? ''

  const allTokens = useAllTokens()

  const duplicateNameOrSymbol = useMemo(() => {
    if (!token || !chainId) return false

    return Object.keys(allTokens).some(tokenAddress => {
      const userToken = allTokens[tokenAddress]
      if (userToken.equals(token)) {
        return false
      }
      return userToken.symbol?.toLowerCase() === tokenSymbol || userToken.name?.toLowerCase() === tokenName
    })
  }, [token, chainId, allTokens, tokenSymbol, tokenName])

  if (!token) return null

  return (
    <Wrapper error={duplicateNameOrSymbol}>
      <AutoRow gap="6px">
        <AutoColumn gap="24px">
          <CurrencyLogo currency={token} size={'16px'} />
          <div> </div>
        </AutoColumn>
        <AutoColumn gap="10px" justify="flex-start">
          <TYPE.main>
            {token && token.name && token.symbol && token.name !== token.symbol
              ? `${token.name} (${token.symbol})`
              : token.name || token.symbol}{' '}
          </TYPE.main>
          {chainId && (
            <ExternalLink style={{ fontWeight: 400 }} href={getBscScanLink(chainId, token.address, 'token')}>
              <TYPE.blue title={token.address}>
                {shortenAddress(token.address)} ({t('viewOnBscscan')})
              </TYPE.blue>
            </ExternalLink>
          )}
        </AutoColumn>
      </AutoRow>
    </Wrapper>
  )
}

export default function TokenWarningModal({
  isOpen,
  tokens,
  onConfirm
}: {
  isOpen: boolean
  tokens: Token[]
  onConfirm: () => void
}) {
  const [understandChecked, setUnderstandChecked] = useState(false)
  const toggleUnderstand = useCallback(() => setUnderstandChecked(uc => !uc), [])
  const { t } = useTranslation()

  const handleDismiss = useCallback(() => null, [])
  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} maxHeight={90}>
      <WarningContainer className="token-warning-container">
        <AutoColumn gap="lg">
          <AutoRow gap="6px">
            <StyledWarningIcon />
            <TYPE.main color={'red2'}>{t('tokenImported')}</TYPE.main>
          </AutoRow>
          <TYPE.body color={'red2'}>
            {t(
              'anyone-can-create-an-erc20-token-on-ethereum-with-less-than-em-greater-than-any-less-than-em-greater-than-name-including-creating-fake-versions-of-existing-tokens-and-tokens-that-claim-to-represent-projects-that-do-not-have-a-token'
            )}
          </TYPE.body>
          <TYPE.body color={'red2'}>
            {t(
              'this-interface-can-load-arbitrary-tokens-by-token-addresses-please-take-extra-caution-and-do-your-research-when-interacting-with-arbitrary-erc20-tokens'
            )}
          </TYPE.body>
          <TYPE.body color={'red2'}>
            {t(
              'if-you-purchase-an-arbitrary-token-less-than-strong-greater-than-you-may-be-unable-to-sell-it-back-less-than-strong-greater-than'
            )}
          </TYPE.body>
          {tokens.map(token => {
            return <TokenWarningCard key={token.address} token={token} />
          })}
          <RowBetween>
            <div>
              <label style={{ cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  className="understand-checkbox"
                  checked={understandChecked}
                  onChange={toggleUnderstand}
                />{' '}
                {t('iUnderstand')}
              </label>
            </div>
            <ButtonError
              disabled={!understandChecked}
              error={true}
              width={'140px'}
              padding="0.5rem 1rem"
              className="token-dismiss-button"
              style={{
                borderRadius: '0px'
              }}
              onClick={() => {
                onConfirm()
              }}
            >
              <TYPE.body color="white">{t('continue')}</TYPE.body>
            </ButtonError>
          </RowBetween>
        </AutoColumn>
      </WarningContainer>
    </Modal>
  )
}
