import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import { COLOR, FONT, MEDIA_QUERY } from '../../../constants/style';
import { InputItem, ButtonsBox } from '../../../components/productSystem/';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import useProductFrom from '../../../hooks/productHooks/useProductForm';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
// import {useETHBalances, useTokenBalance} from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks';
// import {PAYABLEETH, ZERO_ADDRESS} from "../../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import {useNFTFactoryContract} from "../../../hooks/useContract";
import {NFTFACTORY} from "../../../constants";
import {useUserFirstToken, useUserNFTTokens} from "../../../state/wallet/hooks";
import {TransactionResponse} from "@ethersproject/providers";
import {useTransactionAdder} from "../../../state/transactions/hooks";
import {SubmittedView} from "../../../components/ModalViews";
import {AutoColumn} from "../../../components/Column";
import {TYPE} from "../../../theme";

const Wrapper = styled.div`
  width: 90%;
  max-width: 600px
  margin: 0 auto;
  padding: 20px;
  padding-left: 40px;
  padding-bottom: 50px;
  margin-top: 50px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),
    0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {
    width: 100%;
    padding: 10px;
    padding-left: 10px;
  }
`;

const FormWrap = styled.form``;

const Title = styled.h1`
  color: ${COLOR.text_2};
  font-size: ${FONT.lg}
  margin-bottom: 30px;
`;

const PostProductPage = () => {
  const navigate = useNavigate();
  const { handleGetMe } = useUser();
  const { account, chainId } = useActiveWeb3React()
  const {t} = useTranslation();
  const { productCategories, productErrorMessage,handleGetProductCategories } = useProduct();
  const {
    setProductName,
    setProductInfo,
    setProductCategory,
    setProductPrice,
    setDelivery,
    setProductRoyalty,
    setRemark,
    setProductQuantity,
    setProductToken,
    setProductMediaType,
    handleChange,
    hasProductName,
    hasProductInfo,
    hasProductCategory,
    hasProductToken,
    hasProductMediaType,
    hasProductPrice,
    hasDelivery,
    hasProductQuantity,
    handleSubmitAddForm,
    productPictureUrl,
    handleChangePicture,
    productCategory,
    productName,
    productPrice,
    productQuantity,
    productInfo,
    delivery,
    productRoyalty,
    remark,
    productToken
  } = useProductFrom();

  const {user} = useUser()
  const NFTFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET]);
  // const hasToken = useUserHasToken(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  const NFTTokens = useUserNFTTokens(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  const firstNftAddress = useUserFirstToken(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  const [hash, setHash] = useState('')
  const [attempting, setAttempting] = useState(false)
  const addTransaction = useTransactionAdder()
  const wrappedOnDismiss = useCallback(() => {
    setHash('')
    setAttempting(false)
  }, [])

  async function onMint() {
    setAttempting(true)
    if (NFTFactoryContract) {
      if(NFTTokens){
        const mintargs = [
          firstNftAddress,
          account,
          1,
          productPictureUrl,
          productName,
          productRoyalty,
          0
        ]
        NFTFactoryContract.mint(
            ...mintargs,{ gasLimit: 350000 })
            .then((response: TransactionResponse) => {
              addTransaction(response, {
                summary: t('mint NFT')
              })
              setHash(response.hash)
            })
            .catch((error: any) => {
              setAttempting(false)
              console.log(error)
            })
      }else{
        const args = [
          user.banner_url,
          user.nickname+ ' Collection',
          user.nickname+'NFT',
          productPictureUrl,
          productName,
          productRoyalty,
          account
        ]
        NFTFactoryContract.createERC1155(
            ...args,{ gasLimit: 350000 })
              .then((response: TransactionResponse) => {
                addTransaction(response, {
                  summary: t('create NFT')
                })
                setHash(response.hash)
              })
              .catch((error: any) => {
                setAttempting(false)
                console.log(error)
              })
      }
      handleSubmitAddForm();

      } else {
        setAttempting(false)
        throw new Error(t('no factory'))
      }
    }


  useEffect(() => {
    handleGetProductCategories();
  }, []);

  useEffect(() => {
    handleGetMe().then((result) => {
      if (!result.data || !result.data.is_vendor) navigate('/nft');
    });
  }, []);

  const tokenOptions = [
    { id: 'BNB', name: 'BNB' },
    { id: 'BUSD', name: 'BUSD' },
    { id: 'TSA', name: 'TSA' },
    { id: 'Shih', name: 'Shih' },
    { id: 'CJAI', name: 'CJAI' },
  ]

  const mediaTypeOptions = [
    { id: 'Picture', name: 'Picture',value:'Picture' },
    { id: 'Gif', name: 'Gif',value:'Gif' },
    { id: 'Video', name: 'Video',value:'Video' },
    { id: 'Audio', name: 'Audio',value:'Audio' },
  ]
  //Royalties: 1%, 5% , 10%, 20% 30%
  const royaltyOptions = [
    { id: '1', name: '1%' },
    { id: '5', name: '5%' },
    { id: '10', name: '10%' },
    { id: '20', name: '20%' },
    { id: '30', name: '30%' },
  ]

  return (
    <Wrapper>
      <FormWrap>
        <Title>{t('Mint Artwork')}</Title>

        <InputItem
          title={t('NFT Name')}
          type={'input'}
          hasValue={hasProductName}
          errorMessage={t('Please Input Name')}
          handleChange={handleChange(setProductName)}
          isNumber={false}
          options={undefined}
          productPictureUrl = {undefined}
          textareaRows = {1}
          value = {productName}
        />

        <InputItem
          title={t('Your NFT Information')}
          type={'textArea'}
          hasValue={hasProductInfo}
          textareaRows={4}
          errorMessage={t('Please Input Information')}
          handleChange={handleChange(setProductInfo)}
          isNumber={false}
          options={undefined}
          productPictureUrl={undefined}
          value={productInfo}
        />

        <InputItem
          title={t('Artwork Type')}
          type={'radio'}
          options={mediaTypeOptions}
          hasValue={hasProductMediaType}
          errorMessage={t('Please Choose Artwork type')}
          handleChange={handleChange(setProductMediaType)}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows={1}
          value={'Picture'}
        />

        <InputItem
          title={t('Upload Artwork')}
          type={'picture'}
          errorMessage={t('Please Choose Picture')}
          productPictureUrl={productPictureUrl}
          handleChange={handleChangePicture}
          isNumber={false}
          hasValue={false}
          options={undefined}
          textareaRows={1}
          value={productPictureUrl}
        />

        <InputItem
          title={t('Category')}
          type={'radio'}
          options={productCategories}
          hasValue={hasProductCategory}
          errorMessage={t('Please Choose Category')}
          handleChange={handleChange(setProductCategory)}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows = {1}
          value = {productCategory}
        />

        <InputItem
          title={t('Which token will you charge for your NFT?')}
          type={'radio'}
          options={tokenOptions}
          hasValue={hasProductToken}
          errorMessage={t('Please Choose Token')}
          handleChange={handleChange(setProductToken)}
          isNumber = {false}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productToken}
        />

        <InputItem
          title={t('Price')}
          type={'input'}
          hasValue={hasProductPrice}
          errorMessage={t('Please Input Price')}
          handleChange={handleChange(setProductPrice)}
          isNumber = {false}
          options = {undefined}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productPrice}
        />

        <InputItem
          title={t('Number (ERC1155)')}
          type={'input'}
          errorMessage={t('Please Input NFT Number')}
          hasValue={hasProductQuantity}
          handleChange={handleChange(setProductQuantity)}
          isNumber={false}
          options={undefined}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productQuantity}
        />

        <InputItem
          title={t('How to buy')}
          type={'radio'}
          options={[
            { name: t('Bid'), id: '0' },
            { name: t('Auction'), id: '1' },
          ]}
          hasValue={hasDelivery}
          errorMessage={t('please choose')}
          handleChange={handleChange(setDelivery)}
          value={delivery}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows={1}
        />

        <InputItem
          title={t('Royalties')}
          type={'radio'}
          options={royaltyOptions}
          hasValue={productRoyalty}
          errorMessage={t('Please Choose Royalties')}
          handleChange={handleChange(setProductRoyalty)}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productRoyalty}
        />

        <InputItem
          title={t('Remark')}
          type={'textArea'}
          textareaRows={2}
          handleChange={handleChange(setRemark)}
          isNumber={false}
          errorMessage={"wrong"}
          hasValue={false}
          options={undefined}
          productPictureUrl={undefined}
          value={remark}
        />
        <div className="declare-checkbox">
          <input type="checkbox" id="declare" />
          {t("I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected.")}
        </div>
        <ButtonsBox
          handler={onMint}
          productErrorMessage={productErrorMessage}
        />
      </FormWrap>
      {attempting && hash && (
          <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>
              <TYPE.body fontSize={20}>
                {t('Mint')} {user.nickname+'NFT'}
              </TYPE.body>
            </AutoColumn>
          </SubmittedView>
      )}
    </Wrapper>
  );
};

export default PostProductPage;