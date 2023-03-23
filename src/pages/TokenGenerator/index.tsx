import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
// import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { ActionButton } from "../../components/NFTButton";
import { InputItem } from "../../components/productSystem";
import { COLOR, DISTANCE, FONT, MEDIA_QUERY } from "../../constants/style";
import { theChainId, usePrice, useTheContract } from "./hooks";
import { BigNumber } from "@ethersproject/bignumber";
import { JSBI } from "@teaswap/uniswap-sdk";
import { calculateGasMargin } from "../../utils";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { toWei } from "web3-utils";

export default () => {
  const contract = useTheContract();
  const price = usePrice(contract, theChainId);
  const {t} = useTranslation();

  const [tokenType, setTokenType] = React.useState('SimpleToken');
  const [tokenName, setTokenName] = React.useState('');
  const [tokenSymbol, setTokenSymbol] = React.useState(''); 
  const [tokenDecimals, setTokenDecimals] = React.useState('');
  const [tokenInitialSupply, setTokenInitialSupply] = React.useState(''); 
  const [tokenMaxSupply, setTokenMaxSupply] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [msg, setMsg] = React.useState("");
  const [hash, setHash] = React.useState("");
  const tokens = [
    'SimpleToken', 'BurnableToken', 'MintableToken', 'PauseableToken',
    'BurnableMintableToken', 'BurnablePauseableToken', 'MintablePauseableToken',
    'PowerfulToken '
  ];
  useEffect(() => {
    switch (tokenType) {
      case 'SimpleToken':
        setTotalPrice(price * 0);
        break;
      case 'BurnableToken': 
      case 'MintableToken':
      case 'PauseableToken':
        setTotalPrice(price * 1);
        break;
      case 'BurnableMintableToken':
      case 'BurnablePauseableToken':
      case 'MintablePauseableToken':  
        setTotalPrice(price * 2);
        break;
      case 'PowerfulToken':
        setTotalPrice(price * 3);
        break;  
      default:
        setTotalPrice(0);
        break;
    }
  }, [tokenType]);
  const handleMint = async (e: any) => {
    setMsg("");
    setHash("");
    if (!contract || e.target.value == "Mint") return;
    debugger
    if (!tokenName || !tokenSymbol || !tokenDecimals || !tokenInitialSupply || !tokenMaxSupply) {
      setMsg("Please fill all fields");
      return; 
    } 
    const args = [tokenName, tokenSymbol, tokens.indexOf(tokenType), JSBI.BigInt(tokenInitialSupply).toString(), JSBI.BigInt(tokenMaxSupply).toString()];
    const estimatedGas = await contract.estimateGas
      .new_token(...args)
      .catch(() => {
        return BigNumber.from(1950000);
      });
    console.log("estimatedGas", estimatedGas);
    contract
      .new_token(...args, {
        gasLimit: calculateGasMargin(estimatedGas),
        value: toWei(String(totalPrice))
      })
      .then(async (response: TransactionResponse) => {
        console.log("buy: res", { response });
        setHash(response.hash);
      })
      .catch((error: any) => {
        console.log({
          gasLimit: 350000,
          value: toWei(String(totalPrice))
        });
        setMsg("int error: " + error.mesage);
      });
  };
  return (
    <Wrapper>
      <FormWrap>  
        <Title>{t('Create BEP20 Token')}</Title>

        <InputItem
          title={t('Token Type')}
          label={t('Token Type')}
          type={'select'}
          hasValue={true}
          errorMessage={t('Please Token Type')}
          handleChange={(e:any) => {
            setTokenType(e.target.value);
          }}
          isNumber={false}
          options={tokens}
          placeholder={t('Please Token Type')}  
          productPictureUrl = {undefined}
          textareaRows = {1}
          value = {tokenType}
        />
        <InputItem
          title={t('Total Price')}
          label={t('Total Price (BNB)')}
          type={'input'}
          disabled={true}
          hasValue={true}
          errorMessage={t('')}
          handleChange={() => {}}
          isNumber={false}
          options={undefined}
          placeholder={t('')}  
          productPictureUrl = {undefined}
          textareaRows = {1}
          value = {totalPrice}
        />


        <InputItem
          title={t('Token Name')}
          label={t('Token Name')}
          type={'input'}
          hasValue={true}
          errorMessage={t('Please Token Name')}
          handleChange={(e: any) => {
            setTokenName(e.target.value);
          }}
          isNumber={false}
          options={undefined}
          productPictureUrl = {undefined}
          textareaRows = {1}
          value = {tokenName}
          placeholder={t('e.g. MyToken')}  
        />

        <InputItem
          title={t('Token Symbol')}
          label={t('Token Symbol')}
          type={'input'}
          hasValue={true}
          errorMessage={t('Please Token Symbol')}
          handleChange={(e: any) => {
            setTokenSymbol(e.target.value); 
          }}
          isNumber={false}  
          textareaRows = {1}  
          value = {tokenSymbol}  
          placeholder={t('e.g. MYT')} 
          options={undefined} 
          productPictureUrl = {undefined}
        />

        <InputItem  
          title={t('Token Decimals')}
          label={t('Token Decimals')} 
          type={'input'}
          hasValue={true}
          errorMessage={t('Please Token Decimals')}
          handleChange={(e: any) => {
            setTokenDecimals(e.target.value);
          }}
          isNumber={true}
          textareaRows = {1}
          value = {tokenDecimals}
          placeholder={t('e.g. 18')}
          options={undefined} 
          productPictureUrl = {undefined}
        />  

        
        <InputItem
          title={t('Token Initial Supply')}
          label={t('Token Initial Supply')}
          type={'input'}
          hasValue={true}
          errorMessage={t('Please Token Initial Supply')}
          handleChange={(e: any) => {
            setTokenInitialSupply(e.target.value);
          }}
          isNumber={true}
          textareaRows = {1}
          value = {tokenInitialSupply}
          options={undefined} 
          productPictureUrl = {undefined}
          placeholder={t('e.g. 2100000000000')}
        />

        <InputItem
          title={t('Token Max Supply')}
          label={t('Token Max Supply')}
          type={'input'}
          hasValue={true}
          errorMessage={t('Please Token Max Supply')}
          handleChange={(e: any) => {
            setTokenMaxSupply(e.target.value);
          }}  
          isNumber={true} 
          textareaRows = {1}
          value = {tokenMaxSupply}  
          options={undefined} 
          productPictureUrl = {undefined}
          placeholder={t('e.g. 1000000000000000000')} 
        />

        <ButtonContainer>
          <Button  onClick={(e: any) => {
            console.log({
              tokenType,
              tokenName,
              tokenSymbol,
              tokenDecimals,
              tokenInitialSupply, 
              tokenMaxSupply, 
              totalPrice
            })
            handleMint(e)
          }}>
            {t('Mint')}
          </Button>
          <NavLink className="a-link"  to='/nft/users/backstage'>
            <Button >{t('Back to Account')}</Button>
          </NavLink>
        </ButtonContainer> 
        {msg && (
          <ErrorMessageContainer>{msg}</ErrorMessageContainer>
        )}
        {hash && (
          <ErrorMessageContainer>{hash}</ErrorMessageContainer>
        )}
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

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled(ActionButton)`
  background-color: #ffffff;
  color:  #7f7f7f;
  border: 1px solid #7f7f7f;
  // padding: 8px 45px;
  border-radius: 0px;
  ${MEDIA_QUERY.sm} {
    width: 120px;
  }
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #7f7f7f;
  }
  &:last-child {
    margin-left: ${DISTANCE.sm};
  }
`;

const ErrorMessageContainer = styled.div`
  margin-left: ${DISTANCE.lg};
  font-size: ${FONT.lg};
  font-weight: bold;
  color: ${COLOR.text_alert};
  line-height: 1.5;
`;