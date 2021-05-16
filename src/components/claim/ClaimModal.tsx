import { JSBI, TokenAmount } from '@teaswap/uniswap-sdk'
import { isAddress } from 'ethers/lib/utils'
import React, { useEffect, useState } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import Circle from '../../assets/images/blue-loader.svg'
import tokenLogo from '../../assets/images/token-logo.png'
import { useActiveWeb3React } from '../../hooks'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleSelfClaimModal } from '../../state/application/hooks'
import { useClaimCallback, useUserClaimData, useUserUnclaimedAmount } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { CloseIcon, CustomLightSpinner, ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
import { getBscScanLink } from '../../utils'
import { ButtonPrimary } from '../Button'
import { AutoColumn, ColumnCenter } from '../Column'
import Confetti from '../Confetti'
import { Break, CardBGImage, CardBGImageSmaller, CardNoise, CardSection, DataCard } from '../earn/styled'
import { useTranslation } from 'react-i18next'

import Modal from '../Modal'
import { RowBetween } from '../Row'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%,#60a7ac 0%,#60a7ac 100%);
`

const ConfirmOrLoadingWrapper = styled.div<{ activeBG: boolean }>`
  width: 100%;
  padding: 24px;
  position: relative;
  background: ${({ activeBG }) =>
    activeBG &&
    'radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;'};
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

const SOCKS_AMOUNT = 1000
const USER_AMOUNT = 400

export default function ClaimModal() {
  const isOpen = useModalOpen(ApplicationModal.SELF_CLAIM)
  const toggleClaimModal = useToggleSelfClaimModal()
  const { t } = useTranslation()

  const { account, chainId } = useActiveWeb3React()

  // used for UI loading states
  const [attempting, setAttempting] = useState<boolean>(false)

  // get user claim data
  const userClaimData = useUserClaimData(account)

  // monitor the status of the claim from contracts and txns
  const { claimCallback } = useClaimCallback(account)
  const unclaimedAmount: TokenAmount | undefined = useUserUnclaimedAmount(account)
  const { claimSubmitted, claimTxn } = useUserHasSubmittedClaim(account ?? undefined)
  const claimConfirmed = Boolean(claimTxn?.receipt)

  function onClaim() {
    setAttempting(true)
    claimCallback()
      // reset modal and log error
      .catch(error => {
        setAttempting(false)
        console.log(error)
      })
  }

  // once confirmed txn is found, if modal is closed open, mark as not attempting regradless
  useEffect(() => {
    if (claimConfirmed && claimSubmitted && attempting) {
      setAttempting(false)
      if (!isOpen) {
        toggleClaimModal()
      }
    }
  }, [attempting, claimConfirmed, claimSubmitted, isOpen, toggleClaimModal])

  const nonLPAmount = JSBI.multiply(
    JSBI.BigInt((userClaimData?.flags?.isSOCKS ? SOCKS_AMOUNT : 0) + (userClaimData?.flags?.isUser ? USER_AMOUNT : 0)),
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
  )

  return (
    <Modal isOpen={isOpen} onDismiss={toggleClaimModal} maxHeight={90}>
      <Confetti start={Boolean(isOpen && claimConfirmed)} />
      {!attempting && !claimConfirmed && (
        <ContentWrapper gap="lg">
          <ModalUpper>
            <CardBGImage />
            <CardNoise />
            <CardSection gap="md">
              <RowBetween>
                <TYPE.white fontWeight={500}>{t('claim')} Airdrop</TYPE.white>
                <CloseIcon onClick={toggleClaimModal} style={{ zIndex: 99 }} color="white" />
              </RowBetween>
              <TYPE.white fontWeight={700} fontSize={36}>
                {unclaimedAmount?.toFixed(0, { groupSeparator: ',' } ?? '-')} SHIH
              </TYPE.white>
            </CardSection>
            <Break />
            <CardSection gap="sm">
              {userClaimData?.flags?.isSOCKS && (
                <RowBetween>
                  <TYPE.subHeader color="white">{t('socks')}</TYPE.subHeader>
                  <TYPE.subHeader color="white">{SOCKS_AMOUNT} SHIH</TYPE.subHeader>
                </RowBetween>
              )}
              {userClaimData?.flags?.isLP &&
                unclaimedAmount &&
                JSBI.greaterThanOrEqual(unclaimedAmount.raw, nonLPAmount) && (
                  <RowBetween>
                    <TYPE.subHeader color="white">{t('liquidity')}</TYPE.subHeader>
                    <TYPE.subHeader color="white">
                      {unclaimedAmount
                        .subtract(new TokenAmount(unclaimedAmount.token, nonLPAmount))
                        .toFixed(0, { groupSeparator: ',' })}{' '}
                      SHIH
                    </TYPE.subHeader>
                  </RowBetween>
                )}
              {userClaimData?.flags?.isUser && (
                <RowBetween>
                  <TYPE.subHeader color="white">{t('user')}</TYPE.subHeader>
                  <TYPE.subHeader color="white">{USER_AMOUNT} SHIH</TYPE.subHeader>
                </RowBetween>
              )}
            </CardSection>
          </ModalUpper>
          <AutoColumn gap="md" style={{ padding: '1rem', paddingTop: '0' }} justify="center">
            <TYPE.subHeader fontWeight={500}>
              {t('as-a-member-of-the-uniswap-community-you-may-claim-best-to-be-used-for-voting-and-governance')}
              <br /> <br />
              <ExternalLink href="https://www.teaswap.live/info">{t('readMoreAboutBest')}</ExternalLink>
            </TYPE.subHeader>
            <ButtonPrimary
              disabled={!isAddress(account ?? '')}
              padding="16px 16px"
              width="100%"
              borderRadius="6px"
              mt="1rem"
              onClick={onClaim}
            >
              {t('claim')} Airdrop
            </ButtonPrimary>
          </AutoColumn>
        </ContentWrapper>
      )}
      {(attempting || claimConfirmed) && (
        <ConfirmOrLoadingWrapper activeBG={true}>
          {/*<CardNoise />*/}
          <CardBGImageSmaller />
          <RowBetween>
            <div />
            <CloseIcon onClick={toggleClaimModal} style={{ zIndex: 99 }} stroke="black" />
          </RowBetween>
          <ConfirmedIcon>
            {!claimConfirmed ? (
              <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
            ) : (
              <UniTokenAnimated width="72px" src={tokenLogo} />
            )}
          </ConfirmedIcon>
          <AutoColumn gap="100px" justify={'center'}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader fontWeight={600} color="black">
                {claimConfirmed ? 'Claimed!' : 'Claiming'}
              </TYPE.largeHeader>
              {!claimConfirmed && (
                <Text fontSize={36} color={'#fe2500'} fontWeight={800}>
                  {unclaimedAmount?.toFixed(0, { groupSeparator: ',' } ?? '-')} SHIH
                </Text>
              )}
            </AutoColumn>
            {claimConfirmed && (
              <>
                <TYPE.subHeader fontWeight={500} color="black">
                  <span role="img" aria-label="party-hat">
                    🎉{' '}
                  </span>
                  {t('welcomeToTeamUnicorn')} :){' '}
                  <span role="img" aria-label="party-hat">
                    🎉
                  </span>
                </TYPE.subHeader>
              </>
            )}
            {attempting && !claimSubmitted && (
              <TYPE.subHeader color="black">{t('confirm-this-transaction-in-your-wallet')}</TYPE.subHeader>
            )}
            {attempting && claimSubmitted && !claimConfirmed && chainId && claimTxn?.hash && (
              <ExternalLink href={getBscScanLink(chainId, claimTxn?.hash, 'transaction')} style={{ zIndex: 99 }}>
                {t('viewTransactionOnEtherscan')}
              </ExternalLink>
            )}
          </AutoColumn>
        </ConfirmOrLoadingWrapper>
      )}
    </Modal>
  )
}
