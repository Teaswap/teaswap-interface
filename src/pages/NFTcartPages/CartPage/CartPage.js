import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  COLOR,
  FONT,
  MEDIA_QUERY_MD,
  DISTANCE,
} from "../../../constants/style";
import { ThickNavPage } from "../../../components/Page";
import { IconComponent } from "../../../components";
import CartItem from "../../../components/cartSystem/CartItem";
import OrderPrice from "../../../components/cartSystem/OrderPrice";
import PayDetail from "../../../components/cartSystem/PayDetail.js";

import { LoopCircleLoading } from "react-loadingg";
import { getCartItem } from "../../../redux/slices/cartSlice/cartSlice";
import useCart from "../../../hooks/cartHooks/useCart";
const Title = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.lg};
  width: 30%;
  padding: ${DISTANCE.xs};
`;
const PayTitle = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.md};
  width: 30%;
`;
const Container = styled.div`
  margin-top: 100px;
  min-width: 800px;
  width: 1230px;
  padding: ${DISTANCE.xs};
  min-width: ${MEDIA_QUERY_MD.md};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
        <Container>
          {isPaying && checked ? (
            <Wrapper>
              <IconWrapper onClick={() => handleToCart()}>
                <IconComponent kind="left-blue" $margin={0} />
              </IconWrapper>
              <PayTitle>返回購物車</PayTitle>
            </Wrapper>
          ) : (
            <Title>購物車</Title>
          )}
          {carts &&
            carts
              .filter((cart) => {
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
                <>
                  <CartItem key={index} cart={cart} />
                  {isPaying ? (
                    <PayDetail cart={cart} />
                  ) : (
                    <OrderPrice cart={cart} />
                  )}
                </>
              ))}
        </Container>
      </ThickNavPage>
    </>
  );
};

export default CartPage;
