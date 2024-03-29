import { ChainId, TokenAmount } from "@teaswap/uniswap-sdk";
import React, { useState } from "react";
import { Text } from "rebass";
import { NavLink } from "react-router-dom";
// import { darken } from 'polished'
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import Logo from "../../assets/images/teaswap-logo.png";
import LogoDark from "../../assets/images/teaswap-logo.png";
import { useActiveWeb3React } from "../../hooks";
import { useDarkModeManager } from "../../state/user/hooks";
import {
  useETHBalances,
  useAggregateUniBalance,
} from "../../state/wallet/hooks";
import { CardNoise } from "../earn/styled";
import { CountUp } from "use-count-up";
import { TYPE, ExternalLink } from "../../theme";
// import {  useToggleModal } from '../../state/application/hooks'
// import { ApplicationModal } from '../../state/application/actions'

import Settings from "../Settings";
import Menu from "../Menu";

import Row, { RowFixed } from "../Row";
import Web3Status from "../Web3Status";
import ClaimModal from "../claim/ClaimModal";
import { useShowClaimPopup } from "../../state/application/hooks";
import { useUserHasAvailableClaim } from "../../state/claim/hooks";
// import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
// import { Dots } from '../swap/styleds'
import Modal from "../Modal";
import UniBalanceContent from "./UniBalanceContent";
import usePrevious from "../../hooks/usePrevious";
import I18nSwitch from "../I18nSwitch";
// import { ButtonSecondary } from '../Button'
import { MEDIA_QUERY } from "../../constants/style";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding-top: 18px;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0.5rem 1rem;
  `}

  @media screen and (max-width: 1320px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 0px 0px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
  ${MEDIA_QUERY.sm} {
    padding: 0;
  }
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRow = styled(RowFixed)`
  background: rgba(255, 255, 255);
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  display: block;
  top: 0;
  left: 0;
`;

const HeaderLinks = styled(Row)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  color: ${({ theme }) => theme.gray};

  :focus {
    border: 1px solid blue;
  }
`;

const UNIAmount = styled(AccountElement)`
  color: black;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
`;

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`;

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`;

const NetworkCard = styled.span`
  white-space: nowrap;
  border-radius: 0px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.gray};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

// const Title = styled.a`
//   display: flex;
//   align-items: center;
//   pointer-events: auto;
//   justify-self: flex-start;
//   margin-right: 24px;
//   padding:0 40px;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     justify-self: center;
//     margin-right: 0;
//   `};
//   :hover {
//     cursor: pointer;
//   }
// `

const UniIcon = styled.div`
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
  /* :hover {
    transform: rotate(-5deg);
  } */
`;

const activeClassName = "ACTIVE";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  display: block;
  width: 100vw;
  padding: 10px 20px;
  margin-top: 5px;
  align-items: left;
  border-radius: 0px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.gray};
  width: fit-content;
  margin: 0 16px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: bold;
    color: ${({ theme }) => theme.darkGray};
  }

  :hover,
  :focus {
    color: ${({ theme }) => theme.darkGray};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin: 0;
  `}

  @media screen and (max-width: 1120px) {
    margin: 0 30px 0 0;
    font-size: 14px;
  }
  ${MEDIA_QUERY.sm} {
    // width: 22%;
    margin: 0 30px 0 0;
  }
`;

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  display: block;
  width: 100% !important;
  padding: 10px 20px;
  margin-top: 5px;
  align-items: left;
  border-radius: 0px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #7f7f7f;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  position: relative;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: bold;
    color: #000;
  }

  :hover,
  :focus,
  :active {
    color: #000;
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin: 0;
  `}

  @media screen and (max-width: 1120px) {
    margin: 0 24px 0 0;
    font-size: 14px;
  }
`;
// const Web3StatusGeneric = styled(ButtonSecondary)`
//   ${({ theme }) => theme.flexRowNoWrap}
//   width: 100%;
//   align-items: center;
//   padding: 0.285rem 0.3rem;
//   border-radius: 0px;
//   cursor: pointer;
//   user-select: none;
//   font-size: 14px;
//   margin-top: 1px;
//   :focus {
//     outline: none;
//   }
// `

// const Web3StatusConnected = styled(Web3StatusGeneric)`
//   background-color: #ffffff;
//   border: 1px solid ${({ theme }) => theme.lightGray};
//   color: ${({ theme }) => theme.gray};
//   font-weight: 500;
//   :hover,
//   :focus {
//     border: 1px solid ${({ theme }) => theme.darkGray};
//   }
//   height: 35px;
//   margin-left: 8px;
// `

const HeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  padding: 10px 2%;
  height: 80px;
  z-index: 1000;
  background-color: #fff;
`;

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "ETH Mainnet",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GOERLI]: "Goerli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.BSC_MAINNET]: "BSC Mainnet",
  [ChainId.BSC_TESTNET]: "BSC Testnet",
  [137]: "POLYGON",
};

const NETWORK_SYMBOLS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "ETH",
  [ChainId.RINKEBY]: "TETH",
  [ChainId.ROPSTEN]: "TETH",
  [ChainId.GOERLI]: "TETH",
  [ChainId.KOVAN]: "TETH",
  [ChainId.BSC_MAINNET]: "BNB",
  [ChainId.BSC_TESTNET]: "TBNB",
  [137]: "MATIC",
};

export default function Header() {
  const [show, setShow] = useState(false)
  const { account, chainId } = useActiveWeb3React();
  const { t } = useTranslation();

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  const [isDark] = useDarkModeManager();

  const availableClaim: boolean = useUserHasAvailableClaim(account);

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance();

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false);
  const showClaimPopup = useShowClaimPopup();

  const countUpValue = aggregateBalance?.toFixed(0) ?? "0";
  const countUpValuePrevious = usePrevious(countUpValue) ?? "0";

  console.log("Header: ", {account, chainId, userEthBalance})

  return (
    <HeaderRoot id="header-root">
      <HeaderFrame>
        <ClaimModal />
        <Modal
          isOpen={showUniBalanceModal}
          onDismiss={() => setShowUniBalanceModal(false)}
        >
          <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        <Button 
         style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            width: 40,
            height: 48,
            border: '1px solid grey'
          }}
        onClick={() => setShow(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue" fill="blue" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <Drawer
          anchor={'left'}
          open={show}
          onClose={() => setShow(false)}
        >
          <HeaderRow id='header-row'>
            <Button
              style={{
                position: 'fixed',
                top: 10,
                right: 10
              }}
             onClick={() => setShow(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            <UniIcon style={{ marginTop: "-6px" }}>
              <NavLink to={"/explore"}>
                <img
                  height="50px"
                  style={{ marginTop: 0 }}
                  src={isDark ? LogoDark : Logo}
                  alt="logo"
                />
              </NavLink>
            </UniIcon>
            <HeaderLinks style={{ fontSize: "13px" }}>
              <StyledNavLink
                onClick={() => setShow(false)}
               id={`swap-nav-link`} to={"/explore"}>
                {t("EXPLORE")}
              </StyledNavLink>
              <StyledNavLink
               onClick={() => setShow(false)}
               id={`NFT-nav-link`} to={"/nft/products/category/1"}>
                {t("NFT")}
                {/* <span>↗</span> */}
              </StyledNavLink>
              <StyledNavLink
               onClick={() => setShow(false)}
               id={`NFT-nav-link`} to={"/staking"}>
                {t("Stake")}
                {/* <span>↗</span> */}
              </StyledNavLink>
              <StyledExternalLink
                id={`Gallery-nav-link`}
                href={"https://www.teaswap.live/tsametaplay"}
              >
                {t("MetaPlay")}
              </StyledExternalLink>
              <StyledNavLink
               onClick={() => setShow(false)}
               id={`Incubator-nav-link`} to={"/iro"}>
                {t("Incubator")}
              </StyledNavLink>
              <StyledNavLink
               onClick={() => setShow(false)}
               to="/mint">{t("Create")}</StyledNavLink>

            </HeaderLinks>
          </HeaderRow>
        </Drawer>
        <HeaderControls style={{ fontSize: "13px" }}>
          <HeaderElement>
            <HideSmall>
              {chainId && NETWORK_LABELS[chainId] && (
                <NetworkCard title={NETWORK_LABELS[chainId]} color="#0bafb6">
                  {NETWORK_LABELS[chainId]}
                </NetworkCard>
              )}
            </HideSmall>
            {availableClaim && !showClaimPopup && (
              <UNIWrapper
                onClick={() => {
                  setShowUniBalanceModal(true);
                }}
              >
                <UNIAmount
                  active={!!account && !availableClaim}
                  style={{ pointerEvents: "auto", color: "#7f7f7f" }}
                >
                  {account && (
                    <HideSmall>
                      <TYPE.gray
                        style={{
                          paddingRight: ".4rem",
                        }}
                      >
                        <CountUp
                          key={countUpValue}
                          isCounting
                          start={parseFloat(countUpValuePrevious)}
                          end={parseFloat(countUpValue)}
                          thousandsSeparator={","}
                          duration={1}
                        />
                      </TYPE.gray>
                    </HideSmall>
                  )}
                  TSA
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
            {!availableClaim && aggregateBalance && (
              <UNIWrapper
                onClick={() => {
                  setShowUniBalanceModal(true);
                }}
              >
                <UNIAmount
                  active={!!account && !availableClaim}
                  style={{ pointerEvents: "auto", color: "#7f7f7f" }}
                >
                  {account && (
                    <HideSmall>
                      <TYPE.gray
                        style={{
                          paddingRight: ".4rem",
                        }}
                      >
                        <CountUp
                          key={countUpValue}
                          isCounting
                          start={parseFloat(countUpValuePrevious)}
                          end={parseFloat(countUpValue)}
                          thousandsSeparator={","}
                          duration={1}
                        />
                      </TYPE.gray>
                    </HideSmall>
                  )}
                  TSA
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
            <AccountElement
              active={!!account}
              style={{ pointerEvents: "auto" }}
            >
              {chainId && account && userEthBalance ? (
                <BalanceText
                  style={{ flexShrink: 0, color: "#7f7f7f" }}
                  pl="0.75rem"
                  pr="0.5rem"
                  fontWeight={500}
                >
                  {userEthBalance?.toSignificant(4)}{" "}
                  {NETWORK_SYMBOLS[chainId]}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Menu />
            {/* <Web3StatusConnected onClick={openClaimModal}>
              Airdrop
            </Web3StatusConnected> */}
            <Settings />
            <I18nSwitch />
          </HeaderElementWrap>
        </HeaderControls>
      </HeaderFrame>
    </HeaderRoot>
  );
}
