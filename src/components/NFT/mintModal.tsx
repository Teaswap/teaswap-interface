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
import {useNFTLastId} from "../../state/wallet/hooks";
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
}

export default function MintModal({ isOpen, onDismiss, mintInfo }: mintModalProps) {
  const {  account } = useActiveWeb3React()
  const { t } = useTranslation()
    if(isOpen){
        console.log('account:'+account)
    }


  // track and parse user input
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
    const [mintSubmitted, setMintSubmitted] = useState<boolean>(false)
    console.log('approvalSubmitted:'+approvalSubmitted)
    console.log('mintSubmitted:'+mintSubmitted)
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
 const lastIdres = useNFTLastId(mintInfo.delivertyLocation)
    console.log("lastIdres:"+lastIdres)
 const lastId = lastIdres?lastIdres-1:undefined
    console.log("lastId:"+lastId)


 const [approval, approveCallback] = useApproveNFTCallback(NFTEXCHANGE[ChainId.BSC_MAINNET], lastId, mintInfo.delivertyLocation)
 // const {handleSubmitProduct} = useProductForm()
    console.log("approval:"+approval)
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
      // handleSubmitProduct(mintInfo)
    }
  }, [approval, approvalSubmitted])

  useEffect(() => {
      if (mint === mintState.PENDING) {
          setMintSubmitted(true)
      }
  }, [mint, mintSubmitted])

  const error = useMemo(()=>{
      if (!account) {
          return t('connectWallet')
      }
  },[account])

    console.log("error:"+error)




  // const isArgentWallet = useIsArgentWallet()
  // const NFTFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET]);
  // async function onMint() {
  //   setAttempting(true)
  //   if (idoContract && parsedAmount) {
  //       if (idoInfo.tokens[0].address===ZERO_ADDRESS){
  //           idoContract.buywithBNB({gasLimit: 350000, value:`0x${parsedAmount.raw.toString(16)}`})
  //               .then((response: TransactionResponse) => {
  //                   addTransaction(response, {
  //                       summary: t('buy')
  //                   })
  //                   setHash(response.hash)
  //               })
  //               .catch((error: any) => {
  //                   setAttempting(false)
  //                   console.log(error)
  //               })
  //       }else{
  //           if (approval === ApprovalState.APPROVED) {
  //               idoContract.buy(`0x${parsedAmount.raw.toString(16)}`, { gasLimit: 350000 })
  //                   .then((response: TransactionResponse) => {
  //                       addTransaction(response, {
  //                           summary: t('buy')
  //                       })
  //                       setHash(response.hash)
  //                   })
  //                   .catch((error: any) => {
  //                       setAttempting(false)
  //                       console.log(error)
  //                   })
  //           }
  //           else {
  //               setAttempting(false)
  //               throw new Error(t('attempting-to-stake-without-approval-or-a-signature-please-contact-support'))
  //           }
  //       }
  //   }
  // }



  // async function onAttemptToApprove() {
  //     if (!stakeTokenContract || !library || !deadline) throw new Error(t('missingDependencies'))
  //     const liquidityAmount = parsedAmount
  //     if (!liquidityAmount) throw new Error(t('missingLiquidityAmount'))
  //
  //     if (isArgentWallet) {
  //       return approveCallback()
  //     }
  //     stakeTokenContract.approve
  // }

  // async function onAttemptToApprove() {
  //   if (!pairContract || !library || !deadline) throw new Error(t('missingDependencies'))
  //   const liquidityAmount = parsedAmount
  //   if (!liquidityAmount) throw new Error(t('missingLiquidityAmount'))
  //
  //   if (isArgentWallet) {
  //     return approveCallback()
  //   }
  //
  //   // try to gather a signature for permission
  //   const nonce = await pairContract.nonces(account)
  //
  //   const EIP712Domain = [
  //     { name: 'name', type: 'string' },
  //     { name: 'version', type: 'string' },
  //     { name: 'chainId', type: 'uint256' },
  //     { name: 'verifyingContract', type: 'address' }
  //   ]
  //   const domain = {
  //     name: 'Stake Token',
  //     version: '1',
  //     chainId: chainId,
  //     verifyingContract: pairContract.address
  //   }
  //   const Permit = [
  //     { name: 'owner', type: 'address' },
  //     { name: 'spender', type: 'address' },
  //     { name: 'value', type: 'uint256' },
  //     { name: 'nonce', type: 'uint256' },
  //     { name: 'deadline', type: 'uint256' }
  //   ]
  //   const message = {
  //     owner: account,
  //     spender: stakingInfo.stakingRewardAddress,
  //     value: liquidityAmount.raw.toString(),
  //     nonce: nonce.toHexString(),
  //     deadline: deadline.toNumber()
  //   }
  //   const data = JSON.stringify({
  //     types: {
  //       EIP712Domain,
  //       Permit
  //     },
  //     domain,
  //     primaryType: 'Permit',
  //     message
  //   })
  //
  //   library
  //     .send('eth_signTypedData_v4', [account, data])
  //     .then(splitSignature)
  //     .then(signature => {
  //       setSignatureData({
  //         v: signature.v,
  //         r: signature.r,
  //         s: signature.s,
  //         deadline: deadline.toNumber()
  //       })
  //     })
  //     .catch(error => {
  //       // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
  //       if (error?.code !== 4001) {
  //         approveCallback()
  //       }
  //     })
  // }


    console.log(approval)

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>{t('Mint NFT')}</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          {/*<CurrencyInputPanel*/}
          {/*  value={typedValue}*/}
          {/*  onUserInput={onUserInput}*/}
          {/*  onMax={handleMax}*/}
          {/*  showMaxButton={!atMaxAmount}*/}
          {/*  currency={idoInfo.makeAmount.token}*/}
          {/*  pair={null}*/}
          {/*  label={''}*/}
          {/*  disableCurrencySelect={true}*/}
          {/*  customBalanceText={'Available to buy: '}*/}
          {/*  id="stake-liquidity-token"*/}
          {/*/>*/}

          {/*<HypotheticalRewardRate dim={!hypotheticalRewardRate.greaterThan('0')}>*/}
          {/*  <div>*/}
          {/*    <TYPE.black fontWeight={600}>{t('weeklyRewards')}</TYPE.black>*/}
          {/*  </div>*/}

          {/*  <TYPE.black>*/}
          {/*    {hypotheticalRewardRate.multiply((60 * 60 * 24 * 7).toString()).toSignificant(4, { groupSeparator: ',' })}{' '}*/}
          {/*    {stakingInfo.tokens[0].symbol} / week*/}
          {/*  </TYPE.black>*/}
          {/*</HypotheticalRewardRate>*/}

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
                  disabled={!!error || approval !== ApprovalState.NOT_APPROVED ||  mint !== mintState.MINTED }
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
