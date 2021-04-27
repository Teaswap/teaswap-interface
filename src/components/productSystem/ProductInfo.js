import { COLOR, FONT, DISTANCE } from '../../constants/style';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useOrder from '../../hooks/orderHooks/useOrder';
import useCart from '../../hooks/cartHooks/useCart';
import { ActionButton } from '../NFTButton';
import { IconComponent } from '../../components';
import { InfoBlock } from '../../components/productSystem';

import { getUser } from '../../redux/slices/orderSlice/orderSlice';
import { useTranslation } from 'react-i18next';
import { setErrorMessage } from '../../redux/slices/cartSlice/cartSlice'
import { InputComponent } from '../Input'
import { findNonSerializableValue } from '@reduxjs/toolkit'
const ProductInfoContainer = styled.div``;
const ProductName = styled.div`
  width:  100%;
  max-width: 500px;
  word-break: break-all;
  font-weight: bold;
  font-size: ${FONT.md};
  color: ${COLOR.text_2};
`;

const ProductPrice = styled.div`
  margin-top: ${DISTANCE.md};
  font-weight: bold;
  font-size: ${FONT.xs};
  color: ${COLOR.text_1};
`;

const ProductQuantityContainer = styled.div`
  margin-top: ${DISTANCE.md};
  margin-bottom: 50px;
  label {
    display: block;
    font-size: ${FONT.xs};
    color: ${COLOR.text_2};
    margin-bottom: ${DISTANCE.sm};
  }
`;

const InputName = styled.h2`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  margin: ${DISTANCE.sm} 0;
`;

const TwoButton = styled.div`
  margin: ${DISTANCE.md} auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCountSelect = styled.select`
  line-height: 1.4;
  font-size: 14px;
  color: #39393e;
  padding: 10px 14px 10px 14px;
  background-color: #fff;
  border: none;
  border-right: 14px solid #fff;
  box-shadow: 0 0 0 1px #d3d3d5;
  box-sizing: border-box;
  border-radius: 0;
  padding-right: 34px;
  margin: 1px;
  background-image: url(data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath class='color' d='M0 0h10L5 6z' fill='%23D3D3D5' fill-rule='evenodd'/%3E%3C/svg%3E%0A);
}
`;

const SoldOutMessage = styled.div`
  margin-top: ${(props) => props.$margin || '0px'};
  display: flex;
  align-items: center;
  font-size: ${FONT.lg};
  font-weight: bold;
  color: ${COLOR.hover};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
  padding-top: 90px;
`;
const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 80px auto;
  height: 300px;
  width: 40%;
  min-width: 300px;
  border-radius: 9px;
  background: ${COLOR.white};
  letter-spacing: 1px;
  color: ${COLOR.text_1};
  font-size: ${FONT.md};
`;
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 10px;
`;

const Options = ({ quantity }) => {
  let options = [];
  for (let i = 1; i <= quantity; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return <>{options}</>;
};

const ProductQuantitySelector = ({ quantity }) => {
  const { handleSelectQuantity } = useCart();
  const {t} = useTranslation();
  return (
    <>
      {quantity > 0 ? (
        <ProductQuantityContainer>
          <label>{t('Number')}</label>
          <ProductCountSelect onChange={(e) => handleSelectQuantity(e)}>
            <Options quantity={quantity} />
          </ProductCountSelect>
        </ProductQuantityContainer>
      ) : (
        <ProductQuantityContainer>
          <SoldOutMessage>{t('Sold Out')}</SoldOutMessage>
        </ProductQuantityContainer>
      )}
    </>
  );
};

const ShoppingCart = styled(ActionButton)`
  width: 100%;
  margin-top : 10px;
  width : 100%;
  border: 1px solid #cccccc;
  color: #111;
  background-color: transparent;
  font-weight: 400;
  padding: 8px;
  border-radius: 0;
  :hover{
    border-color : #000000;
  }
`;

const ShoppingBuy = styled(ActionButton)`
  margin-top : 10px;
  width : 100%;
  border: 1px solid #cccccc;
  color: #111;
  background-color: transparent;
  font-weight: 400;
  padding: 8px;
  border-radius: 0;
  :hover{
    background-color : ${COLOR.btn_grey};
    padding: 8px;
    color: #ffffff;
  }
`;

const RemindBlock = styled(InfoBlock)`
  margin-top: 20px;
  height: 100px;
  width: 100%;
  font-weight: normal;
  font-size: ${FONT.md};
  color: ${COLOR.text_2};
`;

const Remind = () => {
  return (
    <RemindBlock>

    </RemindBlock>
  );
};

export const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useOrder();
  const [bidValue, setBidValue] = useState('');
  const [isBiding, setIsBiding] = useState(false);
  const {
    isSelectQuantity,
    hasAdd,
    errorMessage,
    handleCloseAddProduct,
    handleAlert,
    handleAddProduct,
  } = useCart();
  const {t} = useTranslation();
  const formatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch]);

  const handlebidModal = ()=>{
    setIsBiding(true);
  };

  const handleCloseBiding =()=>{
    setIsBiding(false);
  };

  return (
    <ProductInfoContainer>
      {errorMessage && (
        <Modal>
          <Form>
            <IconContainer onClick={handleCloseAddProduct}>
              <IconComponent kind='close-black' />
            </IconContainer>
            {console.log(errorMessage)}
            Something wrong
          </Form>
        </Modal>
      )}
      {isBiding && (
        <Modal>
          <Form>
            <IconContainer onClick={handleCloseBiding}>
              <IconComponent kind='close-black' />
            </IconContainer>
            <InputName>{t('Input biding price')}</InputName>
            <InputComponent
              type='text'
              name='bidprice'
              $margin={0}
              maxLength='10'
              value = {product.price}
              onChange={(e) => setBidValue(e.target.value)}
            />
            <TwoButton>
              <ActionButton
                onClick={()=>
                  handleAddProduct(product.id, isSelectQuantity, user.userId, bidValue)
                }
              >
                {t('Confirm')}
              </ActionButton>
              <ActionButton
                $bg={'red'}
                onClick={handleCloseBiding}
              >
                {t('Cancel')}
              </ActionButton>
            </TwoButton>
          </Form>
        </Modal>
      )}
      <ProductName>{product.name || 'Loading...'}</ProductName>
      <ProductPrice>{formatter.format(product.price)}</ProductPrice>
      <ProductQuantitySelector quantity={product.quantity} />
      {user ? (
        <ShoppingCart
          $margin={0}
          $size={'lg'}
          onClick={handlebidModal}
        >
          {t('Bid')}
        </ShoppingCart>
      ) : (
        <ShoppingCart $margin={0} $size={'lg'} onClick={handleAlert}>
          {t('Bid')}
        </ShoppingCart>
      )}
      {user ? (
        <ShoppingBuy
          $margin={0}
          $size={'lg'}
          onClick={() =>
            handleAddProduct(product.id, isSelectQuantity, user.userId)
          }
        >
          {t('Buy Now')}
        </ShoppingBuy>
        ) : (
        <ShoppingBuy $margin={0} $size={'lg'} onClick={handleAlert}>
        {t('Buy Now')}
        </ShoppingBuy>
        )}
      <Remind />
    </ProductInfoContainer>
  );
};
