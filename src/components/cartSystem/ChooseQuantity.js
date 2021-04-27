import styled from "styled-components";
import React from "react";
import { IconComponent } from "../../components";
import { COLOR, FONT } from "../../constants/style";
import useCart from "../../hooks/cartHooks/useCart";

const Quantity = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  border: solid 1px #f1f1f1;
  outline: none;
  padding: 6px 20px;
`;
const CartQuantity = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.sm};
  outline: none;
  padding: 6px 20px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Container = styled.div`
  border: solid 1px #f1f1f1;
  &:hover {
    background: #f1f1f1;
  }
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
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 10px;
`;

export default function ChooseQuantity({ Item }) {
  const {
    errorMessage,
    isPaying,
    checked,
    handleClose,
    handleError,
    handleMinus,
    handlePlus,
  } = useCart();
  const { cartItemId, cartQuantity, productQuantity } = Item;

  return (
    <>
      {errorMessage && (
        <Modal>
          <Form>
            <IconContainer onClick={handleClose}>
              <IconComponent kind="close-black" />
            </IconContainer>
            {errorMessage}
          </Form>
        </Modal>
      )}
      {isPaying ? (
        <CartQuantity>x {Item.cartQuantity}</CartQuantity>
      ) : checked ? (
        <Wrapper>
          <Container onClick={handleError}>
            <IconComponent kind="minus" />
          </Container>
          <Quantity>{Item.cartQuantity}</Quantity>
          <Container onClick={handleError}>
            <IconComponent kind="plus" />
          </Container>
        </Wrapper>
      ) : (
        <Wrapper>
          <Container onClick={() => handleMinus(cartQuantity, cartItemId)}>
            <IconComponent kind={"minus"} />
          </Container>
          <Quantity>{Item.cartQuantity}</Quantity>
          <Container
            onClick={() =>
              handlePlus(cartQuantity, cartItemId, productQuantity)
            }
          >
            <IconComponent kind={"plus"} />
          </Container>
        </Wrapper>
      )}
    </>
  );
}
