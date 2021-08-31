import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  MEDIA_QUERY,
} from "../../../constants/style";
import Tabs from '../../../components/Tabs/Index'
import useCart from "../../../hooks/cartHooks/useCart";
import CartItem from "../../../components/cartSystem/CartItem";
import useProduct from "../../../hooks/productHooks/useProduct";
import { hideAddr } from '../../../utils/strUtil'
import { useTranslation } from "react-i18next";


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

const Title = styled.div`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
  margin-left: 20px;
  width: 10%;
  float: left;
`;
const Message = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.lg};
  margin: 70px auto;
  text-align: center;
`;
const Container = styled.p`
  margin: 10px auto;
  width: 100%;
  padding: ${DISTANCE.xs};
  min-width: ${MEDIA_QUERY_MD.md};
`;
const Table = styled.table`
  width: 100%;
  min-width: 500px;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
`;
const NameContainer = styled.tr``;
const Name = styled.th`
  font-size: ${FONT.xsm};
  color: ${COLOR.black};
  border-bottom: solid 1px ${COLOR.cccccc};
  padding: ${DISTANCE.sm};
`;
const ContentContainer = styled.tr``;
const Content = styled.td`
  font-size: ${FONT.xsm};
  color: ${COLOR.text_2};
  border-bottom: solid .5px ${COLOR.cccccc};
  padding: ${DISTANCE.sm};
  cursor: pointer;
  word-break: break-all;
  &:hover:nth-child(1) {
    color: ${COLOR.hover};
  }
  & img{
    cursor: pointer;
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

const OrderImg = styled.img`
  width: 120px;
  cursor: pointer;
  ${MEDIA_QUERY.sm}{
    width: 50px;
    height: 50px;
    transform: translate(0, 100%);
  }
`

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
  const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <>
      <ThickNavPage id="client-orders">
      <Wrapper>
        <div>
        <Title>History</Title>
        <span onClick={() => navigate('/staking')} className="orders-go-stake">Stake $TSA</span>
          </div>
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
            <div className="client-order-tables">
              <Table>
                <NameContainer>
                  <Name>{t('Item')}</Name>
                  <Name>{t("Order-No")}</Name>
                  <Name>{t("Buyer")}</Name>
                  <Name>{t("Seller")}</Name>
                  <Name>{t("Date")}</Name>
                  <Name>{t("Amount")}</Name>
                  <Name>{t("Status")}</Name>
                </NameContainer>
                {orders &&
                  orders.map((order) => (
                    order.Order_items.map((item) => (
                      <ContentContainer key={order.id}>
                        <OrderImg 
                          onClick={() => navigate(`/nft/products/${order.Order_items[0].ProductId}`)} 
                          src={order.Order_items[0].product_picture_url} />
                        <Content> {order.order_number} </Content>
                        <Content> {hideAddr(order.client_name)} </Content>
                        <Content> {hideAddr(order.seller_name)} </Content>
                        <Content>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Content>
                        <Content>{item.product_price + handleTokenSwitch(item.extoken)}</Content>
                        <Content>
                          {/* {order.is_completed ? '已完成' : '未完成' } */}
                          {t("Complete")}
                        </Content>
                      </ContentContainer>
                    ))
                  ))}
              </Table>
            </div>
          )}
        </Container>
        </Wrapper>
      </ThickNavPage>
    </>
  );
};

export default ClientOrdersPage;
