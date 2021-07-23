import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  COLOR,
  FONT,
  MEDIA_QUERY_MD,
  DISTANCE,
  MEDIA_QUERY,
} from "../../../constants/style";
import { IconComponent } from "../../../components";
import CartItem from "../../../components/cartSystem/CartItem";
import OrderPrice from "../../../components/cartSystem/OrderPrice";
import PayDetail from "../../../components/cartSystem/PayDetail.js";

import { LoopCircleLoading } from "react-loadingg";
import { getCartItem } from "../../../redux/slices/cartSlice/cartSlice";
import useCart from "../../../hooks/cartHooks/useCart";


export const ThickNavPage = styled.div`
  width: 90%;
  max-width: 1230px;
  min-height: 50vh;
  position: relative;
  margin-top: 50px;
  padding: 20px;
  padding-bottom: 50px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 16px 24px rgba(0, 0, 0, 0.1),
  0px 24px 32px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY.sm} {
    width: 100%;
    padding: 10px;
  }
`;
const PayTitle = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.md};
  width: 30%;
`;
const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  max-width: 1230px;
`;

// const Title = styled.p`
//   color: ${COLOR.text_2};
//   font-size: ${FONT.lg};
//   width: 30%;
//   padding: ${DISTANCE.xs};
// `;

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;
const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 99%;
  font-size: 20px;
  font-weight: bold;

`;

const Title = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
`;
const IconWrapper = styled.div``;
const LoadingMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
`;




const CartPage = () => {
  const dispatch = useDispatch();
  const {
    carts,
    isLoading,
    isPaying,
    isSelect,
    filter,
    checked,
    handleToCart,
    handleGetCart,
  } = useCart();

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingMessage>
          <LoopCircleLoading />;
        </LoadingMessage>
      )}
      <ThickNavPage>
      <Wrapper>
        <Title>Bidding Orders</Title>
        <Container>
          {carts &&
            carts.filter((cart) => {
                switch (filter) {
                  case "all":
                    return true;
                  case "select":
                    return cart.cartDetail[0].sellerId === isSelect;
                  default:
                    return true;
                }
              })
              .map((cart, index) => (
                <CartItem key={index} cart={cart} />
              ))}
        </Container>
        </Wrapper>
      </ThickNavPage>
    </>
  );
};

export default CartPage;
