import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import useIsArgentWallet from '../../hooks/useIsArgentWallet'
// import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonConfirmed, ButtonError } from '../Button'
import ProgressCircles from '../ProgressSteps'
import CurrencyInputPanel from '../CurrencyInputPanel'
import {CurrencyAmount, TokenAmount} from '@teaswap/uniswap-sdk'
// import { useActiveWeb3React } from '../../hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { useIdoContract } from '../../hooks/useContract'
import { useApproveCallback, ApprovalState} from '../../hooks/useApproveCallback'
// import { splitSignature } from 'ethers/lib/utils'
import { IdoInfo, useDerivedIdoInfo } from '../../state/stake/hooks'
// import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../ModalViews'
import {ZERO_ADDRESS} from "../../constants";

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

interface idoModalProps {
  isOpen: boolean
  onDismiss: () => void
  idoInfo: IdoInfo
  userLiquidityUnstaked: TokenAmount| CurrencyAmount | undefined
}

export default function BuyingModal({ isOpen, onDismiss, idoInfo, userLiquidityUnstaked }: idoModalProps) {
  // const {  chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedIdoInfo(typedValue, idoInfo.makeAmount.token, userLiquidityUnstaked)
  // const parsedAmountWrapped = wrappedCurrencyAmount(parsedAmount, chainId)


  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
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



 const [approval, approveCallback] = useApproveCallback(parsedAmount, idoInfo.idoAddress)

  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])


  // const isArgentWallet = useIsArgentWallet()
  const idoContract = useIdoContract(idoInfo.idoAddress)
  async function onBuy() {
    setAttempting(true)
    if (idoContract && parsedAmount) {
        if (idoInfo.tokens[0].address===ZERO_ADDRESS){
            idoContract.buywithBNB({gasLimit: 350000, value:`0x${parsedAmount.raw.toString(16)}`})
                .then((response: TransactionResponse) => {
                    addTransaction(response, {
                        summary: t('buy')
                    })
                    setHash(response.hash)
                })
                .catch((error: any) => {
                    setAttempting(false)
                    console.log(error)
                })
        }else{
            if (approval === ApprovalState.APPROVED) {
                idoContract.buy(`0x${parsedAmount.raw.toString(16)}`, { gasLimit: 350000 })
                    .then((response: TransactionResponse) => {
                        addTransaction(response, {
                            summary: t('buy')
                        })
                        setHash(response.hash)
                    })
                    .catch((error: any) => {
                        setAttempting(false)
                        console.log(error)
                    })
            }
            else {
                setAttempting(false)
                throw new Error(t('attempting-to-stake-without-approval-or-a-signature-please-contact-support'))
            }
        }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])


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
    console.log(error)
  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>{t('buy')}</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <CurrencyInputPanel
            value={typedValue}
            onUserInput={onUserInput}
            onMax={handleMax}
            showMaxButton={!atMaxAmount}
            currency={idoInfo.makeAmount.token}
            pair={null}
            label={''}
            disableCurrencySelect={true}
            customBalanceText={'Available to buy: '}
            id="stake-liquidity-token"
          />

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
              mr="0.5rem"
              onClick={approveCallback}
              confirmed={approval === ApprovalState.APPROVED || approvalSubmitted}
              altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
              disabled={approval !== ApprovalState.NOT_APPROVED }
            >
              {t('approve')}
            </ButtonConfirmed>
            <ButtonError
              disabled={!!error || ( approval !== ApprovalState.APPROVED)}
              error={!!error && !!parsedAmount}
              onClick={onBuy}
            >
              {error ?? t('buy')}
            </ButtonError>
          </RowBetween>
          <ProgressCircles steps={[approval === ApprovalState.APPROVED ]} disabled={true} />
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>{t('IRO Buying')}</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{parsedAmount?.toSignificant(4)} {idoInfo.tokens[0].symbol}</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {attempting && hash && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
            <TYPE.body fontSize={20}>
              {t('send')} {parsedAmount?.toSignificant(4)} {idoInfo.tokens[0].symbol}
            </TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
