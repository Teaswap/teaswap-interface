import React,{ useEffect } from 'react';
import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE } from '../../../constants/style';
import { InputItem, ButtonsBox } from '../../../components/productSystem/';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import useProductFrom from '../../../hooks/productHooks/useProductForm';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 30px 0;
`;

const FormWrap = styled.form``;

const Title = styled.h1`
  color: ${COLOR.text_2};
  font-size: ${FONT.lg};
  margin-bottom: ${DISTANCE.lg};
`;

const PostProductPage = () => {
  const navigate = useNavigate();
  const { handleGetMe } = useUser();
  const {t} = useTranslation();
  const { productCategories, productErrorMessage } = useProduct();
  const {
    setProductName,
    setProductInfo,
    setProductCategory,
    setProductPrice,
    setDeliveryTime,
    setDeliveryLocation,
    setDelivery,
    setPaymentMethod,
    setRemark,
    setProductQuantity,
    handleChange,
    hasProductName,
    hasProductInfo,
    hasProductCategory,
    hasDeliveryLocation,
    hasProductPrice,
    hasDeliveryTime,
    hasDelivery,
    hasPaymentMethod,
    hasProductQuantity,
    handleSubmitAddForm,
    productPictureUrl,
    deliveryLocation,
    delivery,
    handleChangePicture,
  } = useProductFrom();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (!result.data || !result.data.is_vendor) navigate('/nft');
    });
  }, []);

  return (
    <StandardNavPage>
      <Wrapper>
        <FormWrap>
          <Title>{t('Apply fot Mint NFT')}</Title>

          <InputItem
            title={t('NFT Name')}
            type={'input'}
            hasValue={hasProductName}
            errorMessage={t('Please Input Name')}
            handleChange={handleChange(setProductName)}
          />

          <InputItem
            title={t('Your NFT Information')}
            type={'textArea'}
            hasValue={hasProductInfo}
            textareaRows={4}
            errorMessage={t('Please Input Information')}
            handleChange={handleChange(setProductInfo)}
          />

          <InputItem
            title={t('Picture')}
            type={'picture'}
            errorMessage={t('Please Choose Picture')}
            productPictureUrl={productPictureUrl}
            handleChange={handleChangePicture}
          />

          <InputItem
            title={t('Category')}
            type={'radio'}
            options={productCategories}
            hasValue={hasProductCategory}
            errorMessage={t('Please Choose Category')}
            handleChange={handleChange(setProductCategory)}
          />

          <InputItem
            title={t('Price')}
            type={'input'}
            hasValue={hasProductPrice}
            errorMessage={t('Please Input Price')}
            handleChange={handleChange(setProductPrice)}
          />

          <InputItem
            title={t('Number(ERC1155)')}
            type={'input'}
            errorMessage={t('Please Input NFT Number')}
            hasValue={hasProductQuantity}
            handleChange={handleChange(setProductQuantity)}
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
          />

          <InputItem
            title={t('Remark')}
            type={'textArea'}
            textareaRows={2}
            handleChange={handleChange(setRemark)}
          />

          <ButtonsBox
            handler={handleSubmitAddForm}
            productErrorMessage={productErrorMessage}
          />
        </FormWrap>
      </Wrapper>
    </StandardNavPage>
  );
};

export default PostProductPage;
