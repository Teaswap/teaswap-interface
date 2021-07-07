import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
// import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
// import {
//   RedirectDuplicateTokenIds,
//   RedirectOldAddLiquidityPathStructure,
//   RedirectToAddLiquidity
// } from './AddLiquidity/redirects'
import Manage from './Earn/Manage'
// import Home from './Home'
// import Home from './Home/Explore'
import Home from './Home/New'
import Earn from './Earn'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
// import Swap from './Swap'
import Swaping from './Swap/Swaping'
import {
  OpenClaimAddressModalAndRedirectToSwap,
  RedirectPathToSwapOnly,
  RedirectToSwap,
  RedirectPathToHomeOnly,
} from './Swap/redirects'

import Vote from './Vote'
import VotePage from './Vote/VotePage'
import Footer from '../components/Footer/index'

import { useInactiveListener } from '../hooks/useInactiveListener'
import '../theme/font-family.css'
import '../theme/App.css'
import '../theme/AppH5.css'

import {
  // HomePage,
  AboutUsPage,
  EntrancePage,
  LoginPage,
  RegisterPage,
  FAQPage,
  ContactUsPage,
  RulesPage,
} from '../pages/';

import {
  ApplyForVendorPage,
  UserInfoPage,
  VendorBackstagePage,
  // VendorContactPage,
  VendorInfoPage,
} from './NFTuserPages';

import {
  ProductPage,
  // EditProductPage,
  PostProductPage,
  SearchProductPage,
  CategorizedProductPage,
  VendorShopPage,
} from './NFTproductPages';

import { CartPage, CheckoutPage } from './NFTcartPages';

import {
  ClientOrdersPage,
  VendorOrdersPage,
  OrderDetailPage,
} from './NFTorderPages/';

import {
  AdminBackstagePage,
  AdminUserPage,
  AdminProductPage,
  AdminMailPage,
} from './NFTadminPages';
import Ido from './Ido'
import IdoList from './Ido/List'
import Mint from './Mint'
import { MEDIA_QUERY } from '../constants/style'
// import Farms from './Farms'
// import { UseWalletProvider } from "use-wallet"
// import FarmsProvider from '../contexts/Farms/Farms'

// import HomePage from './NFTHomePage';
// import RegisterPage from './NFTRegisterPage';
// import LoginPage from './NFTLoginPage';
// import EntrancePage from './NFTEntrancePage';
// import AboutUsPage from './NFTAboutUsPage';
// import FAQPage from './NFTFAQPage';
// import ContactUsPage from './NFTContactUsPage';
// import RulesPage from './NFTRulesPage';


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // padding-top: 60px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};
  z-index: 1;
  ${MEDIA_QUERY.sm} {
    padding: 0;
  }
`

const Marginer = styled.div`
  margin-top: 200px;
  ${MEDIA_QUERY.sm} {
    margin-top: 150px;
  }
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle}/>
}

// const Providers: React.FC = ({ children }) => {
//   return (
//
//     <UseWalletProvider
//       chainId={56}
//       connectors={{
//         walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
//       }}
//     >
//       <FarmsProvider>
//         {children}
//       </FarmsProvider>
//
//     </UseWalletProvider>
//
//   )
// }

export default function App() {
  useInactiveListener()
  return (
    <Suspense fallback={null}>
      {/*<Route element={<GoogleAnalyticsReporter/>}/>*/}
      <Route element={<DarkModeQueryParamReader/>}/>
      <AppWrapper>
        <URLWarning/>
        <HeaderWrapper>
          <Header/>
        </HeaderWrapper>
        <BodyWrapper>
          <Popups/>
          <Polling/>
          <TopLevelModals/>
          <Web3ReactManager>
            <Routes>
              <Route path="/iro" element={<IdoList />}/>
              <Route path="/drops" element={<Home/>}/>
              <Route path="/swap" element={<Swaping/>}/>
              {/* <Route path="/swaping" element={<Swaping/>}/> */}
              <Route path="/claim" element={<OpenClaimAddressModalAndRedirectToSwap/>}/>
              <Route path="/swap/:outputCurrency" element={<RedirectToSwap/>}/>
              <Route path="/send" element={<RedirectPathToSwapOnly/>}/>
              <Route path="/find" element={<PoolFinder/>}/>
              <Route path="/pool" element={<Pool/>}/>
              <Route path="/staking" element={<Earn/>}/>
              <Route path="/mint" element={<Mint />}/>
              <Route path="/iro/:currencyIdA/:currencyIdB/:idoAddress" element={<Ido />}/>
              {/* <Route path="/iro/:currencyIdA/:currencyIdB/:idoAddress" element={<Ido2 />}/> */}
              <Route path="/vote" element={<Vote/>}/>
              <Route path="/add" element={<AddLiquidity/>}/>
              <Route path="/add/:currencyIdA" element={<AddLiquidity/>}/>
              <Route path="/add/:currencyIdA/:currencyIdB" element={<AddLiquidity/>}/>
              <Route path="/create" element={<AddLiquidity/>}/>
              <Route path="/create/:currencyIdA" element={<AddLiquidity/>}/>
              <Route path="/create/:currencyIdA/:currencyIdB" element={<AddLiquidity/>}/>
              <Route path="/remove/:tokens" element={<RedirectOldRemoveLiquidityPathStructure/>}/>
              <Route path="/remove/:currencyIdA/:currencyIdB" element={<RemoveLiquidity/>}/>
              <Route path="/staking/:currencyIdA/:currencyIdB/:stakingRewardAddress" element={<Manage/>}/>
              <Route path="/vote/:id" element={<VotePage/>}/>
              <Route element={<RedirectPathToHomeOnly/>}/>

              <Route path={'/nft'}>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/about'} element={<AboutUsPage/>}/>
                <Route path={'/entrance'} element={<EntrancePage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/faq'} element={<FAQPage/>}/>
                <Route path={'/contact'} element={<ContactUsPage/>}/>
                <Route path={'/rules'} element={<RulesPage/>}/>

                <Route path={'/users'}>
                  <Route path={'/me'} element={<UserInfoPage/>}/>
                  <Route path={'/:id'} element={<UserInfoPage/>}/>
                  <Route path={'/apply'} element={<ApplyForVendorPage/>}/>
                  <Route path={'/backstage'} element={<VendorBackstagePage/>}/>
                  {/*<Route path={'/contact/:id'} element={<VendorContactPage/>}/>*/}
                  <Route path={'/vendor/:id'} element={<VendorInfoPage/>}/>
                </Route>

                <Route path={'/products'}>
                  <Route path={'/:id'} element={<ProductPage/>}/>
                  {/* <Route path={'/edit/:id'} element={<EditProductPage/>}/> */}
                  <Route path={'/post'} element={<PostProductPage/>}/>
                  <Route path={'/search/:keyword'} element={<SearchProductPage/>}/>
                  <Route path={'/category/:id'} element={<CategorizedProductPage/>} />
                  <Route path={'/vendor/:id'} element={<VendorShopPage/>}/>
                </Route>

                <Route path={'/cart'}>
                  <Route path={'/'} element={<CartPage/>}/>
                  <Route path={'/checkout'} element={<CheckoutPage/>}/>
                </Route>

                <Route path={'/orders'}>
                  <Route path={':id'} element={<OrderDetailPage/>}/>
                  <Route path={'/bidding'} element={<ClientOrdersPage/>}/>
                  <Route path={'/sale'} element={<ClientOrdersPage/>}/>
                  <Route path={'/purchase'} element={<ClientOrdersPage/>}/>
                  <Route path={'/vendor'} element={<VendorOrdersPage/>}/>
                </Route>

                <Route path={'/admin'}>
                  <Route path={'/'} element={<AdminBackstagePage/>}/>
                  <Route path={'/users'} element={<AdminUserPage/>}/>
                  <Route path={'/products'} element={<AdminProductPage/>}/>
                  <Route path={'/mails'} element={<AdminMailPage/>}/>
                </Route>
              </Route>

            </Routes>
          </Web3ReactManager>
          <Marginer/>
        </BodyWrapper>
        <Footer></Footer>
      </AppWrapper>
    </Suspense>
  )
}
