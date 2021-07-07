import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUser,
} from "../../../redux/slices/orderSlice/orderSlice";
import { ThickNavPage } from "../../../components/Page";
import { getAuthToken } from "../../../NFTutils";
import useOrder from "../../../hooks/orderHooks/useOrder";
import { LoopCircleLoading } from "react-loadingg";
import {
  COLOR,
  FONT,
  MEDIA_QUERY_MD,
  DISTANCE,
} from "../../../constants/style";
import Tabs from '../../../components/Tabs/Index'
import useCart from "../../../hooks/cartHooks/useCart";
import CartItem from "../../../components/cartSystem/CartItem";
import useProduct from "../../../hooks/productHooks/useProduct";
import { truncStr } from '../../../utils/strUtil'

const Title = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
`;
const Message = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.lg};
  margin: 70px auto;
  text-align: center;
`;
const Container = styled.p`
  margin: 50px auto;
  width: 80%;
  padding: ${DISTANCE.xs};
  min-width: ${MEDIA_QUERY_MD.md};
`;
const Table = styled.table`
  width: 100%;
  min-width: 500px;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin-top: ${DISTANCE.lg};
`;
const NameContainer = styled.tr``;
const Name = styled.th`
  font-size: ${FONT.md};
  color: ${COLOR.black};
  border-bottom: solid 1px ${COLOR.cccccc};
  padding: ${DISTANCE.sm};
`;
const ContentContainer = styled.tr``;
const Content = styled.td`
  font-size: ${FONT.md};
  color: ${COLOR.text_2};
  border-bottom: solid 1px ${COLOR.cccccc};
  padding: ${DISTANCE.sm};
  cursor: pointer;
  &:hover:nth-child(1) {
    color: ${COLOR.hover};
  }
`;
const OrderContent = styled(Link)`
  font-size: ${FONT.md};
  color: ${COLOR.text_2};
  border-bottom: solid 1px ${COLOR.cccccc};
  padding: ${DISTANCE.sm};
  cursor: pointer;
  &:hover:nth-child(1) {
    color: ${COLOR.hover};
  }
`;
const LoadingMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  z-index: 2;
`;

const ClientOrdersPage = () => {
  const dispatch = useDispatch();
  const {
    carts,
    handleGetCart,
  } = useCart();

  const { 
    orders, 
    handleGetClientOrder,
    handleGetSellerOrder
  } = useOrder();

  const { handleTokenSwitch } = useProduct()

  useEffect(() => {
    if (getAuthToken()) {
      getUser()(dispatch);
    }
  }, [dispatch]);
  useEffect(() => {
    handleGetCart();
  }, [dispatch]);

  const BID_TAB = 'Bidding Orders'
  const SALE_TAB = 'Sales History'
  const BUY_TAB = 'Purchase History'

  const tabs = [BID_TAB, SALE_TAB, BUY_TAB]
  const [tab, setTab] = useState(BID_TAB)

  return (
    <>
      <ThickNavPage>
        <Container>
          <Tabs tabs={tabs} value={tab} handleChange={(v) => {
            switch(v){
              case BID_TAB:
                handleGetCart()
                break;
              case SALE_TAB:
                handleGetSellerOrder()
                break;
              case BUY_TAB:
                handleGetClientOrder()
            }
            setTab(v)
          }} />
          {tab == BID_TAB && carts && (
              carts.map((cart, index) => (
                <CartItem key={'cart' + index} cart={cart} />
              ))
          )}
          { tab != BID_TAB && (
            <Table>
              <NameContainer>
                <Name>編號</Name>
                <Name>买家</Name>
                <Name>卖家</Name>
                <Name>下单时间</Name>
                <Name>總金額</Name>
                <Name>狀態</Name>
              </NameContainer>
              {orders &&
                orders.map((order) => (
                  order.Order_items.map((item) => (
                    <ContentContainer key={order.id}>
                      <Content> {order.order_number} </Content>
                      <Content> {truncStr(order.client_name)} </Content>
                      <Content> {truncStr(order.seller_name)} </Content>
                      <Content>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Content>
                      <Content>{item.product_price + handleTokenSwitch(item.Product.extoken)}</Content>
                      <Content>
                        {order.is_completed ? '已完成' : '未完成' }
                      </Content>
                    </ContentContainer>
                  ))
                ))}
            </Table>
          )}
        </Container>
      </ThickNavPage>
    </>
  );
};

export default ClientOrdersPage;
