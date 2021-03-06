import styled from "styled-components";
import React, { useState } from "react";
import { IconComponent } from "../../components";
import { InputComponent } from "../../components/Input";
import { ActionButton } from "../NFTButton";
import { COLOR, FONT } from "../../constants/style";
import useCart from "../../hooks/cartHooks/useCart";
import useOrder from "../../hooks/orderHooks/useOrder";
import useProduct from "../../hooks/productHooks/useProduct";

const Container = styled.div`
  width: 300px;
  border: solid 1px #e6e6e6;
  border-radius: 0px 0px;
  border-radius: 0px 0px;
  margin-bottom: 40px;
  position: absolute;
  top: 25%;
  right: 10%;
  transform: translate(20%, -5%);
`;
const PayContainer = styled.div`
  width: 300px;
  border: solid 1px #f7f7f8;
  background: #f7f7f8;
  border-radius: 0px 0px;
  border-radius: 0px 0px;
  margin-bottom: 40px;
  position: absolute;
  top: 55%;
  right: 10%;
  transform: translate(20%, -5%);
  padding: 10px 20px;
`;
const IconContainer = styled.div``;
const ReceiveInfo = styled.div`
  padding: 10px 20px;
  background: #e6e6e6;
  border-radius: 0px 0px 0 0;
  border-radius: 0px 0px 0 0;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  letter-spacing: 1px;
`;
const RadioTitle = styled.label`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  letter-spacing: 1px;
  cursor: pointer;
`;
const UpdateTitle = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  letter-spacing: 1px;
  margin: 20px 0;
`;
const Name = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  margin-bottom: 8px;
  letter-spacing: 1px;
`;
const Address = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const ReceiveWay = styled.div`
  padding: 10px 20px;
  border-radius: 0 0 0px 0px;
  background: #f7f7f8;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: baseline;
`;
const PayWrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: baseline;
  margin-bottom: 15px;
`;
const WrapperAll = styled.div``;
const IconClose = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 10px;
`;
const ReceiveDetail = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.sm};
  font-weight: bold;
`;
const ReceiveTitle = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  margin-right: 20px;
`;
const Hr = styled.hr`
  border: solid 0.2px #d8d8d9;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const Radio = styled.input`
  margin: 0 12px 0 4px;
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
  justify-content: center;
  flex-direction: column;
  margin: 80px auto;
  width: 40%;
  min-width: 300px;
  border-radius: 0px;
  background: ${COLOR.white};
`;
const ErrorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
`;
const ErrorForm = styled.form`
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
export default function PayDetail({ cart }) {
  const [receiver, setReceiver] = useState("");
  const [receiveAddress, setReceiveAddress] = useState("");
  const [buyer, setBuyer] = useState("");
  const {
    completeOrder,
    update,
    errorMessage,
    handleUpdateInfo,
    handleUpdateBuyer,
    handleUpdateAddress,
    handleUpdateReceiver,
    handleCloseUpdate,
    handleUpdateReceiveInfo,
    handlePayWay,
    handleCloseError,
    handleToCheckOutCartPage,
  } = useCart();
  const { user } = useOrder();
  const { product } = useProduct();
  const readyToOrderItems = cart.cartDetail.map((cartDetail) => {
    return {
      ProductId: cartDetail.productId,
      UserId: cartDetail.sellerId,
      product_quantity: cartDetail.cartQuantity,
    };
  });

  return (
    <>
      {errorMessage && (
        <ErrorModal>
          <ErrorForm>
            <ModalIconContainer onClick={() => handleCloseError()}>
              <IconComponent kind="close-black" />
            </ModalIconContainer>
            {errorMessage}
          </ErrorForm>
        </ErrorModal>
      )}
      {update && (
        <Modal>
          <Form>
            <IconClose onClick={handleCloseUpdate}>
              <IconComponent kind="close-black" />
            </IconClose>
            <UpdateTitle>????????????????????????????????????</UpdateTitle>
            <Title>?????????</Title>
            <InputComponent
              value={receiver}
              placeholder="???????????????"
              onChange={(e) => handleUpdateReceiver(e, setReceiver)}
            ></InputComponent>
            <InputComponent
              value={receiveAddress}
              placeholder="????????????"
              onChange={(e) => handleUpdateAddress(e, setReceiveAddress)}
            ></InputComponent>
            <Title>?????????</Title>
            <InputComponent
              value={buyer}
              placeholder="???????????????"
              onChange={(e) => handleUpdateBuyer(e, setBuyer)}
            ></InputComponent>
            <ActionButton
              $margin={0}
              style={{ background: "#b6deea", "margin-bottom": "20px" }}
              onClick={handleUpdateInfo}
            >
              ????????????
            </ActionButton>
          </Form>
        </Modal>
      )}
      <WrapperAll>
        <Container>
          <ReceiveInfo>
            <Top>
              <Title>????????????</Title>
              {completeOrder ? null : (
                <IconContainer onClick={handleUpdateReceiveInfo}>
                  <IconComponent kind="update" />
                </IconContainer>
              )}
            </Top>
            <Name>{receiver ? receiver : user && user.username}</Name>
            <Address>
              {receiveAddress ? receiveAddress : user && user.address}
            </Address>
            <Name>????????????{buyer ? buyer : user && user.username}</Name>
          </ReceiveInfo>
          {/*<ReceiveWay>*/}
          {/*  <Wrapper>*/}
          {/*    <ReceiveTitle>*/}
          {/*      ???????????? : {product.delivery === 0 ? "??????" : "??????"}*/}
          {/*    </ReceiveTitle>*/}
          {/*    <ReceiveDetail></ReceiveDetail>*/}
          {/*  </Wrapper>*/}
          {/*</ReceiveWay>*/}
        </Container>
        {completeOrder ? null : (
          <PayContainer>
            <Title>????????????</Title>
            <Hr />
            <PayWrapper>
              <Radio
                type="radio"
                name="radio"
                id="???????????????"
                value="???????????????"
                onClick={handlePayWay}
              ></Radio>
              <RadioTitle for="???????????????">???????????????</RadioTitle>
            </PayWrapper>
            <PayWrapper>
              <Radio
                type="radio"
                name="radio"
                id="??????????????????"
                value="??????????????????"
                onClick={handlePayWay}
              ></Radio>
              <RadioTitle for="??????????????????">??????????????????</RadioTitle>
            </PayWrapper>
            <PayWrapper>
              <Radio
                type="radio"
                name="radio"
                id="Apple Pay"
                value="Apple Pay"
                onClick={handlePayWay}
              ></Radio>
              <RadioTitle for="Apple Pay">Apple Pay</RadioTitle>
            </PayWrapper>
            <ActionButton
              $margin={0}
              style={{ background: "#b6deea", width: "100%" }}
              onClick={() => handleToCheckOutCartPage(readyToOrderItems)}
            >
              ????????????
            </ActionButton>
          </PayContainer>
        )}
      </WrapperAll>
    </>
  );
}
