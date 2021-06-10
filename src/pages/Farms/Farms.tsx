import React from 'react'

import { ButtonPrimary } from '../../components/Button'

import PageHeader from './components/PageHeader'

import {  useWalletModalToggle } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'

import FarmCards from './components/FarmCards'
// import AppBody from '../AppBody'
import { useTranslation } from 'react-i18next'
// import FarmsProvider from '../../contexts/Farms'
// import { UseWalletProvider } from "use-wallet"

const Farms: React.FC = () => {
  const {t} = useTranslation()
  const { account } = useActiveWeb3React()
  const onPresentWalletProviderModal = useWalletModalToggle()
  return (

    <>
        {account ? (
          <>
              <PageHeader title="Stake tokens to earn TSA" subtitle="" />
              <FarmCards />
          </>

        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <ButtonPrimary
              onClick={onPresentWalletProviderModal}
            >
            🔓 {t('Unlock Wallet')}
            </ButtonPrimary>
          </div>
        )}
    </>
  )
}



export default Farms
