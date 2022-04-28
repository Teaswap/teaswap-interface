import React, {useState, useCallback, useEffect, useMemo} from 'react'
import { useTranslation } from 'react-i18next'
// import useIsArgentWallet from '../../hooks/useIsArgentWallet'
// import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonConfirmed} from '../Button'
import ProgressCircles from '../ProgressSteps'
import {ChainId} from '@teaswap/uniswap-sdk'
// import { useActiveWeb3React } from '../../hooks'
import {ApprovalState, useApproveNFTCallback} from '../../hooks/useApproveCallback'
import { LoadingView, SubmittedView } from '../ModalViews'
import {NFTEXCHANGE} from "../../constants";
import {MintInfoInterface, mintState, useMintCallback} from "../../hooks/useMintCallback";
import {useActiveWeb3React} from "../../hooks";
import useProductForm from "../../hooks/productHooks/useProductForm";
import { useETHBalances } from '../../state/wallet/hooks'
const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`



interface mintModalProps {
  isOpen: boolean
  onDismiss: () => void
  mintInfo: MintInfoInterface
    lastId?:number
}

export default function MintModal({ isOpen, onDismiss, mintInfo,lastId }: mintModalProps) {
  const {  account } = useActiveWeb3React()
  const { t } = useTranslation()
  const balance = useETHBalances(account ? [account] : [])?.[account ?? ""];

  console.log('mintInfo', mintInfo, balance)

  // track and parse user input
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [mintSubmitted, setMintSubmitted] = useState<boolean>(false)
  console.log('approvalSubmitted:'+approvalSubmitted)
  console.log('mintSubmitted:'+mintSubmitted)
  const [minted, setMinted] = useState<boolean>(false)

    // state for pending and submitted txn views
  // const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
    console.log('attempting:'+attempting)
    console.log('hash:'+hash)

  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }, [onDismiss])


  const [mint, mintCallback] = useMintCallback(mintInfo);

 const [approval, approveCallback] = useApproveNFTCallback(NFTEXCHANGE[ChainId.BSC_MAINNET], lastId,mintInfo.delivertyLocation)
 const {handleSubmitProduct} = useProductForm()
    console.log("approval:"+approval)
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
      handleSubmitProduct(mintInfo,lastId)
    }
  }, [approval, approvalSubmitted])

  useEffect(() => {
      if (mint === mintState.PENDING) {
          setMintSubmitted(true)
      }
  }, [mint, mintSubmitted])

    useEffect(() => {
        if (mint === mintState.MINTED) {
            setMinted(true)
        }
    }, [mint, minted])

  const error = useMemo(()=>{
      if (!account) {
          return t('connectWallet')
      }
      if (!balance || balance.toExact() < '0.01') {
        return t('Insufficient funds')
      }
  },[account, balance])

    console.log("error:"+error)


    console.log(approval)

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>{t('Mint NFT')}</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <RowBetween>

            <ButtonConfirmed
                onClick={mintCallback}
                confirmed={mint === mintState.MINTED || mintSubmitted}
                altDisabledStyle={mint === mintState.PENDING} // show solid button while waiting
                disabled={!!error || mint !== mintState.NOT_MINT }
            >
              { error ?? t('Mint')}
            </ButtonConfirmed>
              <ButtonConfirmed
                  mr="0.5rem"
                  onClick={approveCallback}
                  confirmed={approval === ApprovalState.APPROVED || approvalSubmitted}
                  altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
                  disabled={!!error || approval !== ApprovalState.NOT_APPROVED ||  !minted  }
              >
                  {t('approve')}
              </ButtonConfirmed>
          </RowBetween>
          <ProgressCircles steps={[approval === ApprovalState.APPROVED ]} disabled={true} />
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>{t('Minting')}</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{mintInfo.productName}</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {attempting && hash && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
            <TYPE.body fontSize={20}>
              {t('Mint')} {mintInfo.productName}
            </TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
