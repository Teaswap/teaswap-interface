import styled from "styled-components";
import React from "react";
import { IconComponent } from "../../components";
import { COLOR, FONT } from "../../constants/style";

import ItemDetail from "./ItemDetail";
import useCart from "../../hooks/cartHooks/useCart";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  border: solid 1px #f6f5f5;
  border-radius: 0px 0px;
  margin-bottom: 40px;
  position: relative;
`;

const Top = styled.div`
  background: #DCDCDC;
  border: 2px solid #DCDCDC;
  padding: 15px;
  border-radius: 0px 0px 0 0;
  display: flex;
  justify-content: space-between;
`;
const Seller = styled.div`
  display: flex;
`;
const Check = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 8px 11px;
`;
const Name = styled.p`
  margin: 8px 11px;
  color: ${COLOR.white};
  font-size: ${FONT.sm};
`;
const SendDetail = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Hr = styled.hr`
  border: solid 0.2px #f6f5f5;
  margin-bottom: 20px;
`;
const Title = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
`;
const Select = styled.select`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  border-color: ${COLOR.text_2};
  outline: none;
  border-radius: 0px;
  padding: 6px 20px;
  width: 15%;
  margin: 10px 0 10px 0;
`;
const IconContainer = styled.div``;
const Section = styled.div`
  position: fix;
  right: 0;
  margin-left: 450px;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 20px 0;
`;
const Price = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.sm};
  font-weight: bold;
`;
const TotalAmountTitle = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  margin-right: 20px;
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
`;
const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 60px;
  letter-spacing: 1px;
  justify-content: center;
  flex-direction: column;
  margin: 80px auto;
  height: 300px;
  width: 40%;
  min-width: 300px;
  border-radius: 0px;
  background: ${COLOR.white};
`;
const ModalIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 10px;
`;
export default function CartItem({ cart }) {
  const {
    handleDeleteCart,
    errorMessage,
    isSelect,
    isPaying,
    formatter,
    completeOrder,
    checked,
    handleClose,
    handleSelect,
  } = useCart();
  const SellerId = cart.cartDetail.map((data) => Object.values(data)[1]);

  const TotalAmount = cart.cartDetail
    .map((data) => Object.values(data)[6] * Object.values(data)[7])
    .reduce((acc, cur) => acc + cur);

  return (
    <Container>
      {errorMessage && (
        <Modal>
          <Form>
            <ModalIconContainer onClick={handleClose}>
              <IconComponent kind="close-black" />
            </ModalIconContainer>
            {errorMessage}
          </Form>
        </Modal>
      )}
      <Top>
        <Seller>
          <Name isSelect={isSelect}>{cart.sellerName}</Name>
        </Seller>
        {/* {isPaying || checked ? null : (
          <IconContainer onClick={() => handleDeleteCart(SellerId)}>
            <IconComponent kind="close-black" />
          </IconContainer>
        )} */}
      </Top>
      {cart.cartDetail.map((Item, index) => (
        <ItemDetail Item={Item} key={index} />
      ))}
    </Container>
  );
}
