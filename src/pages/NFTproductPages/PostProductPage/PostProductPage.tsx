import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {COLOR, DISTANCE, FONT, MEDIA_QUERY} from '../../../constants/style';
import { InputItem } from '../../../components/productSystem/';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import useProductFrom from '../../../hooks/productHooks/useProductForm';
import {NavLink, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next'
// import {useETHBalances, useTokenBalance} from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks';
// import {PAYABLEETH, ZERO_ADDRESS} from "../../../constants";
import {ChainId} from "@teaswap/uniswap-sdk";
import { tokenOptions} from "../../../constants";
import {useNFTLastId, useUserFirstToken} from "../../../state/wallet/hooks";
// import {SubmittedView} from "../../../components/ModalViews";
// import {AutoColumn} from "../../../components/Column";
// import {TYPE} from "../../../theme";
import MintModal  from "../../../components/NFT/mintModal"

import { ActionButton } from '../../../components/NFTButton'
import SetArtwork from '../../../components/userSystem/SetArtwork'
import { BASE_URL } from '../../../constants/unit'
const md5 = require('js-md5');


const Wrapper = styled.div`
  width: 100%;
  max-width: 820px
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  margin-top: 50px;
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
  ${MEDIA_QUERY.sm} {
    width: 100%;
  }
`;

const Title = styled.h1`
  color: #474747;
  font-size: ${FONT.lg}
  margin-bottom: 30px;
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
    // setProductQuantity,
    setProductToken,
    setProductMediaType,
    setDeliveryLocation,
    handleChange,
    hasProductName,
    hasProductInfo,
    hasProductCategory,
    hasProductToken,
    hasProductMediaType,
    hasProductPrice,
    hasDelivery,
    // hasProductQuantity,
    productPictureUrl,
    setProductPictureUrl,
    handleChangePicture,
    checkInputError,
    productCategory,
    productName,
    productPrice,
    // productQuantity,
    productInfo,
    delivery,
    deliveryLocation,
    productRoyalty,
    remark,
    productToken,
    productMediaType,

    hasSaleCopyright,
    saleCopyright,
    setSaleCopyright,
  } = useProductFrom();
  // setProductQuantity(1);

  const {user} = useUser()
  // const NFTFactoryContract = useNFTFactoryContract(NFTFACTORY[ChainId.BSC_MAINNET]);
  // const hasToken = useUserHasToken(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  // const NFTTokens = useUserNFTTokens(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  const firstNftAddress = useUserFirstToken(account?account:user.address,chainId?chainId:ChainId.BSC_MAINNET)
  // const [hash, setHash] = useState('')
  // const [attempting, setAttempting] = useState(false)
  const [showMintModal, setShowMintModal] = useState<boolean>(false)
  const [tokenUrl, setTokenUrl] = useState("")

  const handleShowMintModel = () => {
    if(!checkInputError()){
      setShowMintModal(true)
    }else{
      alert(t('have some input error!'))
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

  useEffect(() => {
    console.log("nftaddress:"+firstNftAddress)
    if(firstNftAddress){
      setDeliveryLocation(firstNftAddress.toString())
    }
  }, [firstNftAddress]);

  const lastIdres = useNFTLastId(deliveryLocation)

  const lastId = useMemo(()=>{
    if (lastIdres) {
      console.log("postpage--lastIdres:"+lastIdres)
      return lastIdres-1
    }else{
      return undefined
    }
  },[lastIdres])

  useMemo(() => {
    setTokenUrl(BASE_URL + '/products/tokenurl/' + md5(productPictureUrl))
  }, [productPictureUrl])


  const mediaTypeOptions = [
    { id: '1', name: 'Picture',value:'Picture' },
    { id: '2', name: 'Gif',value:'Gif' },
    { id: '3', name: 'Video',value:'Video' },
    { id: '4', name: 'Audio',value:'Audio' },
  ]
  //Royalties: 1%, 5% , 10%, 20% 30%
  const royaltyOptions = [
    { id: '0', name: '0%',value:0 },
    { id: '1', name: '1%',value:100 },
    { id: '5', name: '5%' ,value:500},
    { id: '10', name: '10%',value:1000 },
    { id: '20', name: '20%',value:2000},
    { id: '30', name: '30%' ,value:3000},
  ]

  return (

    <Wrapper>

      { user && account && productPictureUrl && productName && productRoyalty && productToken && productMediaType &&
      (
          <MintModal
            isOpen={showMintModal}
            onDismiss={() => setShowMintModal(false)}
            mintInfo={{
              tokenUrl: tokenUrl, 
              ProductCategoryId: productCategory,
              productInfo: productInfo,
              productPrice: productPrice,
              delivertyLocation: deliveryLocation,
              delivery: delivery,
              user: user,
              account: account,
              productPictureUrl: productPictureUrl,
              productName: productName,
              productRoyalty: productRoyalty,
              productToken: productToken,
              productMediaType: productMediaType,
              saleCopyright: saleCopyright,
              remark: remark}}
              lastId = {lastId}
          />
        )
      }

      <FormWrap>
        <Title>{t('Mint Artwork')}</Title>

        <InputItem
          title={t('NFT Name')}
          label={t('NFT Name')}
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
          label={t('Your NFT Information')}
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
          title={t('ArtworkType')}
          label={t('Artwork Type')}
          type={'radio'}
          options={mediaTypeOptions}
          hasValue={hasProductMediaType}
          errorMessage={t('Please Choose Artwork type')}
          handleChange={handleChange(setProductMediaType)}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productMediaType}
        />

        <QuestionTitle>{t('Upload Artwork')}</QuestionTitle>
        <SetArtwork productMediaType={productMediaType} productPictureUrl={productPictureUrl} handleChangePicture={handleChangePicture} setProductPictureUrl={setProductPictureUrl}/>

        <InputItem
          title={t('Category')}
          label={t('Category')}
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
          title={t('Token')}
          label={t('Which token will you charge for your NFT?')}
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
          label={t('Price')}
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

        {/* <InputItem
          title={t('Number')}
          label={t('Number (ERC1155)')}
          type={'input'}
          errorMessage={t('Please Input NFT Number')}
          hasValue={hasProductQuantity}
          handleChange={handleChange(setProductQuantity)}
          isNumber={false}
          options={undefined}
          productPictureUrl={undefined}
          textareaRows={1}
          value={productQuantity}
        /> */}

        <InputItem
          label={t('How to buy')}
          title={t('How to buy')}
          type={'radio'}
          options={[
            { name: t('Bid'), id: '0',value:0 },
            { name: t('Auction'), id: '1',value:1, disable: true },
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
          label={t('Copyright Transferred')}
          title={t('copyright')}
          type={'radio'}
          options={[
            { name: t('No'), id: '0',value:0 },
            { name: t('Yes'), id: '1',value:1 },
          ]}
          hasValue={hasSaleCopyright}
          errorMessage={t('please choose')}
          handleChange={handleChange(setSaleCopyright)}
          value={saleCopyright}
          isNumber={false}
          productPictureUrl={undefined}
          textareaRows={1}
        />

        <InputItem
          title={t('Royalties')}
          label={t('Royalties')}
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
          label={t('Remark')}
          type={'textArea'}
          textareaRows={2}
          handleChange={handleChange(setRemark)}
          isNumber={false}
          errorMessage={""}
          hasValue={false}
          options={undefined}
          productPictureUrl={undefined}
          value={remark}
        />
        <div className="declare-checkbox">
          <input type="checkbox" id="declare" />
          {t("I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected.")}
        </div>
        <ButtonContainer>
          <Button  onClick={() => handleShowMintModel()}>
            {t('Mint')}
          </Button>
          <NavLink className="a-link"  to='/nft/users/backstage'>
            <Button >{t('Back to Account')}</Button>
          </NavLink>
          {productErrorMessage && (
              <ErrorMessageContainer>{productErrorMessage}</ErrorMessageContainer>
          )}
        </ButtonContainer>
        {/*{attempting && hash && (*/}
        {/*    <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>*/}
        {/*      <AutoColumn gap="12px" justify={'center'}>*/}
        {/*        <TYPE.largeHeader>{t('transactionSubmitted')}</TYPE.largeHeader>*/}
        {/*        <TYPE.body fontSize={20}>*/}
        {/*          {t('Mint')} {user.nickname+'NFT'}*/}
        {/*        </TYPE.body>*/}
        {/*      </AutoColumn>*/}
        {/*    </SubmittedView>*/}
        {/*)}*/}
      </FormWrap>

    </Wrapper>
  );
};

export default PostProductPage;
const QuestionTitle = styled.div`
  margin-bottom: 10px;
  color: #474747;
  font-size: 12px;
  width: 90%;
  max-width: 600px;
  text-align: left;
`;
