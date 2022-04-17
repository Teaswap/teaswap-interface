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
// import { splitSignature } from 'ethers/lib/utils'
// import { IdoInfo, useDerivedIdoInfo } from '../../state/stake/hooks'
// import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'

import { LoadingView, SubmittedView } from '../ModalViews'
import {NFTEXCHANGE} from "../../constants";
import {MintInfoInterface, mintState, useMintCallback} from "../../hooks/useMintCallback";
import {useActiveWeb3React} from "../../hooks";
import useProductForm from "../../hooks/productHooks/useProductForm";
// import {useNFTLastId} from "../../state/wallet/hooks";
// import useProductForm from "../../hooks/productHooks/useProductForm";

// const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
//   display: flex;
//   justify-content: space-between;
//   padding-right: 20px;
//   padding-left: 20px;
//
//   opacity: ${({ dim }) => (dim ? 0.5 : 1)};
// `

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

  console.log('mintInfo', mintInfo)


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

  // pair contract for this token to be staked
  // const dummyPair = new Pair(new TokenAmount(stakingInfo.tokens[0], '0'), new TokenAmount(stakingInfo.tokens[1], '0'))
  // const pairContract = usePairContract(dummyPair.liquidityToken.address)
  // const pairContract = useTokenContract(stakingInfo.tokens[0].address)
  // approval data for stake
  // const stakeTokenContract = useTokenContract(stakingInfo.tokens[0].address)
 const [mint,mintCallback] = useMintCallback(mintInfo)
    console.log('mint:'+mint)
 console.log("mintInfo:"+JSON.stringify(mintInfo))
 // const lastIdres = useNFTLastId(mintInfo.delivertyLocation)
 //    console.log("lastIdres:"+lastIdres)
 //
 // const lastId = useMemo(()=>{
 //     if (lastIdres) {
 //         return lastIdres-1
 //     }else{
 //         return undefined
 //     }
 // },[lastIdres])

    console.log("lastId:"+lastId)


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
  },[account])

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
