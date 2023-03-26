import React from "react";
import { useTranslation } from "react-i18next";
// import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { FONT, MEDIA_QUERY } from "../../constants/style";
import { useActiveWeb3React } from "../../hooks";
import { useTheContract, useGetContractsForWallet } from "./hooks";
import { fromWei } from "web3-utils";
import addTokenToWallet from "../../utils/addTokenToWallet";
import { shortenAddress } from "../../utils";

function TokenInfo({ c }: any) {

  return (
    <div style={{
      borderBottom: '1px solid #e5e5e5'
    }}>
      <div style={{
        display: 'flex'
      }}>
        <Label>Contract:</Label>
        <TokenAddress>
          <a href={`https://testnet.bscscan.com/token/${c.address}#balances`}>
            {shortenAddress(c.address)}
          </a>
          <Button onClick={() => {
            addTokenToWallet({
              address: c.address,
              symbol: c.symbol,
              decimals: c.decimals,
              image: ''
            });
          }}>
            Import to Metamask
          </Button>
        </TokenAddress>
      </div>
      <div>
        <Label>Name:</Label>
        <span>{c.name}</span>
      </div>
      <div>
        <Label>Token Symbol:</Label>
        <span>{c.symbol}</span>
      </div>
      <div>
        <Label>Decimals:</Label>
        <span>{c.decimals}</span>
      </div>
      <div>
        <Label>Total Supply:</Label>
        <span>{fromWei(c.totalSupply.toString())}</span>
      </div>
    </div>
  );
}
export default () => {
  const contract = useTheContract();
  const {t} = useTranslation();
  const { library, account, chainId } = useActiveWeb3React();
  const contracts = useGetContractsForWallet(contract, account ?? '', chainId, library);
  
  return (
    <Wrapper>
      <FormWrap>  
        <Title>{t('My BEP20 Tokens')}</Title>
        {contracts.map((c: any, index: number) => {
          return (
            <div style={{width: '90%'}} key={index}>
             <TokenInfo c={c} />
            </div>
          )
        })
        }
      </FormWrap>
    </Wrapper>
  );
};

const Title = styled.h1`
  color: #474747;
  font-size: ${FONT.lg};
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),
    0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {
    width: 90%;
    padding-left: 10px;
    padding-bottom: 50px;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  ${MEDIA_QUERY.sm} {
    width: 100%;
  }
`;

const Label = styled.span`
  display: inline-block;
  width: 100px;
  height: 50px;
  line-height: 50px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #f69e4d;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 8px;
  cursor: pointer;
`;

const TokenAddress = styled.span`
  display: flex;
  align-items: center;
  color: rgb(52, 152, 210);
`;
