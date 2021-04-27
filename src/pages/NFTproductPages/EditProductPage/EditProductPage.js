import { StandardNavPage } from '../../../components/Page';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE } from '../../../constants/style';
import { InputItem, ButtonsBox } from '../../../components/productSystem/';
import useUser from '../../../hooks/userHooks/useUser';
import useProduct from '../../../hooks/productHooks/useProduct';
import useProductForm from '../../../hooks/productHooks/useProductForm';
import { useParams, useNavigate } from 'react-router-dom';
import React,{ useEffect } from 'react';
import { getProduct } from '../../../redux/slices/productSlice/productSlice';
import { useDispatch } from 'react-redux';
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

const EditProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { handleGetMe } = useUser();
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
    handleSubmitEditForm,
    productPictureUrl,
    productCategory,
    productName,
    productInfo,
    productPrice,
    productQuantity,
    delivery,
    deliveryTime,
    deliveryLocation,
    paymentMethod,
    remark,
    changeProductValue,
    handleChangePicture,
  } = useProductForm(id);

  const {t} = useTranslation();

  useEffect(() => {
    (getProduct(id)(dispatch)).then((res) => {
      changeProductValue(res.product);
    });
  }, [id, dispatch]);

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (!result.data || !result.data.is_vendor) navigate('/');
    });
  }, []);

  return (
    <StandardNavPage>
      <Wrapper>
        <FormWrap>
          <Title>{t('Edit Work')}</Title>
          <InputItem
            title={t('Work\'s name')}
            type={'input'}
            hasValue={hasProductName}
            errorMessage={t('please input name')}
            handleChange={handleChange(setProductName)}
            value={productName}
          />

          <InputItem
            title={t('Introduction')}
            type={'textArea'}
            hasValue={hasProductInfo}
            textareaRows={4}
            errorMessage={t('please input introduction')}
            handleChange={handleChange(setProductInfo)}
            value={productInfo}
          />

          <InputItem
            title={t('Picture')}
            type={'picture'}
            errorMessage={t('please choose picture')}
            productPictureUrl={productPictureUrl}
            handleChange={handleChangePicture}
          />

          <InputItem
            title={t('Category')}
            type={'radio'}
            options={productCategories}
            hasValue={hasProductCategory}
            errorMessage={t('please chooe category')}
            handleChange={handleChange(setProductCategory)}
            value={productCategory}
          />

          <InputItem
            title={t('Price')}
            type={'input'}
            hasValue={hasProductPrice}
            errorMessage={t('please input price')}
            handleChange={handleChange(setProductPrice)}
            value={productPrice}
          />

          <InputItem
            title={t('Number(ERC1155)')}
            type={'input'}
            errorMessage={t('please input number')}
            hasValue={hasProductQuantity}
            handleChange={handleChange(setProductQuantity)}
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
          />

          <InputItem
            title={t('Remark')}
            type={'textArea'}
            textareaRows={2}
            handleChange={handleChange(setRemark)}
            value={remark || ''}
          />

          <ButtonsBox
            handler={handleSubmitEditForm}
            productErrorMessage={productErrorMessage}
          />
        </FormWrap>
      </Wrapper>
    </StandardNavPage>
  );
};

export default EditProductPage;
