import React, {useMemo, useState} from 'react'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonError } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useStakingContract } from '../../hooks/useContract'
import { SubmittedView, LoadingView } from '../ModalViews'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import FormattedCurrencyAmount from '../FormattedCurrencyAmount'
import { useActiveWeb3React } from '../../hooks'
import { unstakeAPI } from '../../webAPI/productAPI'
import {useSingleCallResult} from "../../state/multicall/hooks";
import { InputItem } from '../productSystem'


const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingInfo: StakingInfo
  isNFT: boolean
}

export default function UnstakingModal({ isOpen, onDismiss, stakingInfo, isNFT }: StakingModalProps) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)
  const [typedValue, setTypedValue] = useState('')

  function wrappedOndismiss() {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }
  console.log('UnstakingModal stakingInfo', stakingInfo)

  const stakingContract = useStakingContract(stakingInfo.stakingRewardAddress,isNFT)
  const inputs = useMemo(() => [account??undefined], [account])
  const tokenids = useSingleCallResult(isNFT?stakingContract:undefined, 'userstakedIds', inputs).result?.[0]
  console.log("stakedTokenids:"+JSON.stringify(tokenids))
  const tokenidarray = useMemo(()=>{
    let array = []
    if(tokenids){
      for(let i = 0;i<tokenids.length;i++){
        console.log("tokenids "+i+" :"+tokenids[i].toString())
        array.push({id:i,name:tokenids[i].toString(),value:tokenids[i].toString()})
      }
    }
    console.log("tokenidarray:"+JSON.stringify(array))
    return array
  }, [tokenids])

  async function onWithdraw() {
    if (stakingContract && stakingInfo?.stakedAmount) {
      setAttempting(true)
      await stakingContract
        .exit({ gasLimit: 1000000 })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Withdraw deposited token`
          })
          console.log('UnstakingModal2 onwidthdraw', stakingInfo)
          unstakeAPI(stakingInfo.tokens[0].address)
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          console.log(error)
        })
    }
  }

  async function onWithdrawSingle() {
    if (stakingContract && stakingInfo?.stakedAmount) {
      setAttempting(true)
      await stakingContract
          .withdraw(BigInt(typedValue),{ gasLimit: 1000000 })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Withdraw deposited token`
            })
            console.log('UnstakingModal2 onwidthdraw', stakingInfo)
            unstakeAPI(stakingInfo.tokens[0].address)
            setHash(response.hash)
          })
          .catch((error: any) => {
            setAttempting(false)
            console.log(error)
          })
    }
  }

  async function onHarvest() {
    if (stakingContract && stakingInfo?.stakedAmount) {
      setAttempting(true)
      await stakingContract
          .getReward({ gasLimit: 1000000 })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Harvest`
            })
            setHash(response.hash)
          })
          .catch((error: any) => {
            setAttempting(false)
            console.log(error)
          })
    }
  }

  let error: string | undefined
  if (!account) {
    error = t('connectWallet')
  }
  if (!stakingInfo?.stakedAmount) {
    error = error ?? t('enterAnAmount')
  }
  const handleChange =(setValue: React.Dispatch<React.SetStateAction<string>>)=> (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, e?.target?.value)
    setValue(e?.target?.value)
  };

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOndismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>{t('withdraw')}</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOndismiss} />
          </RowBetween>
          {stakingInfo?.stakedAmount && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={stakingInfo.stakedAmount} />}
              </TYPE.body>
              <TYPE.body>{t('depositedLiquidity')}:</TYPE.body>
            </AutoColumn>
          )}
          {stakingInfo?.earnedAmount && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={stakingInfo?.earnedAmount} />}
              </TYPE.body>
              <TYPE.body>{t('unclaimed')} {stakingInfo?.tokens[1].symbol}</TYPE.body>
            </AutoColumn>
          )}
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            {t('when-you-withdraw-your-best-is-claimed-and-your-liquidity-is-removed-from-the-mining-pool')}
          </TYPE.subHeader>
          <ButtonError error={!!error && !!stakingInfo?.earnedAmount} onClick={onHarvest}>
            {error ?? t('Harvest')}
          </ButtonError>
          <ButtonError className="closer-btn" disabled={!!error} error={!!error && !!stakingInfo?.stakedAmount} onClick={onWithdraw}>
            {error ?? t('withdraw')}
          </ButtonError>
          {isNFT && (
              <RowBetween>
                <InputItem
                  title={t('choose tokenid')}
                  type={'radio'}
                  options={tokenidarray}
                  hasValue={true}
                  errorMessage={t('please choose tokenid')}
                  handleChange={handleChange(setTypedValue)}
                  value={typedValue}
                  label={t('tokenid')}
                  isNumber={false}
                  productPictureUrl={undefined}
                  textareaRows = {1}
                />
                <ButtonError className="closer-btn" disabled={!!error} error={!!error && !!stakingInfo?.stakedAmount} onClick={onWithdrawSingle}>
                  {error ?? t('withdraw')}
                </ButtonError>
              </RowBetween>
          )}

        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOndismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>
              {t('withdrawing')} {stakingInfo?.stakedAmount?.toSignificant(4)} {stakingInfo?.tokens[0].symbol}
            </TYPE.body>
            or
            <TYPE.body fontSize={20}>
              {t('claiming')} {stakingInfo?.earnedAmount?.toSignificant(4)} {stakingInfo?.tokens[1].symbol}
            </TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && (
        <SubmittedView onDismiss={wrappedOndismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{t('withdraw')} {stakingInfo?.tokens[0].symbol}!</TYPE.body>
            or
            <TYPE.body fontSize={20}>{t('claimed')} {stakingInfo?.tokens[1].symbol}!</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
