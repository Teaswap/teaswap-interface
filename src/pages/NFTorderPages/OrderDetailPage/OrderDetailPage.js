import React, { useEffect } from "react";
import styled from "styled-components";
import { ThickNavPage } from "../../../components/Page";
import { NormalButton } from "../../../components/NFTButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoopCircleLoading } from "react-loadingg";
import {
  getUser,
  getDetailOrder,
} from "../../../redux/slices/orderSlice/orderSlice";
import useOrder from "../../../hooks/orderHooks/useOrder";
import {
  COLOR,
  FONT,
  MEDIA_QUERY_MD,
  DISTANCE,
} from "../../../constants/style";
import Modal from "../../../components/orderSystem/Modal";
const Title = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
  width: 30%;
  padding: ${DISTANCE.xs};
  border-bottom: solid 1px ${COLOR.cccccc};
`;
const Message = styled.p`
  color: #835858;
  font-size: ${FONT.md};
  width: 30%;
  padding: ${DISTANCE.xs};
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%), translateY(-50%);
`;
const OrderNumber = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  width: 50%;
  padding: ${DISTANCE.xs};
`;
const Detail = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  width: 50%;
  padding: ${DISTANCE.xs};
  margin-top: 70px;
`;
const Container = styled.p`
  margin: 100px auto;
  min-width: 500px;
  width: 90%;
  padding: ${DISTANCE.xs};
  min-width: ${MEDIA_QUERY_MD.md};
`;
const Table = styled.table`
  width: 90%;
  text-align: center;
  min-width: 500px;
  table-layout: fixed;
  border-collapse: collapse;
  border-bottom: solid 1px ${COLOR.cccccc};
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
  color: ${COLOR.black};
  padding: ${DISTANCE.sm};
  cursor: pointer;
`;

const Photo = styled.div`
  width: 90px;
  height: 90px;
`;
const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Product = styled.p`
  font-size: ${FONT.md};
  color: ${COLOR.black};
`;
const TotalTable = styled.table`
  width: 90%;
  text-align: left;
  table-layout: fixed;
  border-collapse: collapse;
`;
const PayTitle = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  padding: ${DISTANCE.xs};
  margin-top: 74px;
  width: 90%;
  border-bottom: solid 1px ${COLOR.cccccc};
`;
const PayTable = styled.table`
  width: 90%;
  margin-top: 74px;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
`;
const Track = styled.div`
  border: solid 1px ${COLOR.btn_primary};
  background: ${COLOR.white};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 60px;
  z-index: 1;
`;
const FullTrack = styled.div`
  border: solid 1px ${COLOR.btn_primary};
  background: ${COLOR.btn_primary};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 60px;
  z-index: 1;
`;
const Line = styled.div`
  border: solid 1px ${COLOR.cccccc};
  height: 68px;
  margin-bottom: 7px;
`;
const FullLine = styled.div`
  border: solid 1px ${COLOR.btn_secondary};
  height: 68px;
  margin-bottom: 7px;
`;
const LineWrapper = styled.div`
  position: absolute;
  left: 4px;
  top: 11px;
`;
const PayLineWrapper = styled.div`
  position: absolute;
  left: 4px;
  top: 12px;
`;
const TrackContent = styled.div`
  display: flex;
  width: 90px;
  justify-content: space-between;
  align-items: baseline;
`;
const Status = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.xs};
`;
const Section = styled.div`
  position: absolute;
  top: 20%;
  left: 90%;
  transform: translateX(-50%), translateY(-50%);
`;
const PaySection = styled.div`
  position: absolute;
  top: 147%;
  left: 90%;
  transform: translateX(-50%), translateY(-50%);
`;
const PayTrack = styled.div`
  border: solid 1px ${COLOR.btn_primary};
  background: ${COLOR.white};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 60px;
  z-index: 1;
`;
const FullPayTrack = styled.div`
  border: solid 1px ${COLOR.btn_primary};
  background: ${COLOR.btn_primary};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 60px;
  z-index: 1;
`;
const ButtonSection = styled.div`
  position: absolute;
  top: 147%;
  left: 82%;
  transform: translateX(-50%), translateY(-50%);
`;
const OrderButtonSection = styled.div`
  position: absolute;
  top: 20%;
  left: 82%;
  transform: translateX(-50%), translateY(-50%);
  width: 50px;
`;
const Button = styled.div`
  padding: 5px 10px;
  border-radius: 4px;
  border: solid 1px ${COLOR.cccccc};
  background-color: ${COLOR.text_2};
  color: ${COLOR.bg_primary};
  margin: 0px ${(props) => (props.$margin === 0 ? 0 : 20)}px;
  min-width: max-content;
  margin-bottom: 40px;
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

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    detailOrder,
    user,
    mask,
    isLoading,
    totalAmount,
    order_number,
    is_sent,
    is_paid,
    is_completed,
    product_delivery,
    is_canceled,
    createdAt,
    seller_name,
    client_name,
    seller_email,
    client_address,
    sellerId,
    handleSentOrder,
    handleCompleteOrder,
    handlePayOrder,
    formatter,
    handleModal,
    cancelReason,
  } = useOrder();
  let navigate = useNavigate();
  useEffect(() => {
    getDetailOrder(id)(dispatch);
    getUser()(dispatch);
  }, [dispatch, id]);
  return (
    <>
      {mask && <Modal />}
      <ThickNavPage>
        {isLoading && (
          <LoadingMessage>
            <LoopCircleLoading />;
          </LoadingMessage>
        )}

        <Container>
          <Title>??????</Title>

          <OrderNumber>{detailOrder && order_number[0]}</OrderNumber>

          <Detail>??????</Detail>
          <Table>
            <NameContainer>
              <Name></Name>
              <Name>??????</Name>
              <Name>??????</Name>
              <Name>??????</Name>
              <Name>??????</Name>
            </NameContainer>
            {detailOrder &&
              detailOrder.map((data) => (
                <ContentContainer>
                  <Content>
                    <Photo>
                      <PhotoImg src={data.product_picture_url} />
                    </Photo>
                  </Content>
                  <Content>
                    <Product>{data.product_name}</Product>
                  </Content>
                  <Content>{formatter.format(data.product_price)}</Content>
                  <Content>{data.product_quantity}</Content>
                  <Content>
                    {formatter.format(
                      data.product_price * data.product_quantity
                    )}
                  </Content>
                </ContentContainer>
              ))}
          </Table>
          <TotalTable>
            <ContentContainer>
              <Content></Content>
              <Content></Content>
              <Content></Content>
              <Content>??????</Content>
              <Content>{formatter.format(totalAmount[0])}</Content>
            </ContentContainer>
            <ContentContainer>
              <Content></Content>
              <Content></Content>
              <Content></Content>
              <Content>??????</Content>
              <Content>NTD 0</Content>
            </ContentContainer>
            <ContentContainer>
              <Content></Content>
              <Content></Content>
              <Content></Content>
              <Content>??????</Content>
              <Content>{formatter.format(totalAmount[0])}</Content>
            </ContentContainer>
          </TotalTable>
          <PayTitle>?????????????????????</PayTitle>
          <PayTable>
            <ContentContainer>
              <Content>??????</Content>
              <Content>
                {detailOrder && is_canceled[0]
                  ? "?????????"
                  : is_sent[0]
                  ? "?????????"
                  : "?????????"}
              </Content>
              <Content>??????</Content>
              <Content> {detailOrder && order_number[0]}</Content>
            </ContentContainer>
            <ContentContainer>
              <Content>????????????</Content>
              <Content>????????????</Content>
              <Content>??????</Content>
              <Content>
                {detailOrder && product_delivery[0] ? "??????" : "????????????"}
              </Content>
            </ContentContainer>
            <ContentContainer>
              <Content>??????</Content>
              <Content>
                {detailOrder && is_canceled[0] ? cancelReason[0] : null}
              </Content>
              <Content>??????</Content>
              <Content>
                {detailOrder && new Date(createdAt[0]).toLocaleDateString()}
              </Content>
            </ContentContainer>
          </PayTable>
          <PayTitle>????????????</PayTitle>
          <PayTable>
            <ContentContainer>
              <Content>????????????</Content>
              <Content>{detailOrder && seller_name[0]}</Content>
              <Content></Content>
              <Content></Content>
            </ContentContainer>
            <ContentContainer>
              <Content>Email</Content>
              <Content>{detailOrder && seller_email[0]}</Content>
              <Content></Content>
              <Content></Content>
            </ContentContainer>
          </PayTable>
          <PayTitle>???????????????</PayTitle>
          <PayTable>
            <ContentContainer>
              <Content>????????????</Content>
              <Content>{detailOrder && client_name[0]}</Content>
              <Content></Content>
              <Content></Content>
            </ContentContainer>
            <ContentContainer>
              <Content>??????</Content>
              <Content>{detailOrder && client_address[0]}</Content>
              <Content></Content>
              <Content></Content>
            </ContentContainer>
          </PayTable>
          {detailOrder && is_canceled[0] ? (
            <Message>???????????????</Message>
          ) : (
            <>
              <ButtonSection>
                <NormalButton></NormalButton>
              </ButtonSection>
              <OrderButtonSection>
                {detailOrder && is_sent[0] ? (
                  <Button>????????????</Button>
                ) : (
                  <NormalButton
                    style={{
                      "margin-bottom": "40px",
                    }}
                    onClick={handleModal}
                  >
                    ????????????
                  </NormalButton>
                )}
                {user && sellerId == user.userId && (
                  <>
                    {detailOrder && is_sent[0] ? (
                      <Button>????????????</Button>
                    ) : (
                      <NormalButton
                        style={{
                          "margin-bottom": "40px",
                        }}
                        onClick={() => handleSentOrder(id)}
                      >
                        ????????????
                      </NormalButton>
                    )}
                    {detailOrder && is_completed[0] ? (
                      <Button>????????????</Button>
                    ) : (
                      <NormalButton onClick={handleCompleteOrder}>
                        ????????????
                      </NormalButton>
                    )}
                  </>
                )}
              </OrderButtonSection>
              <Section>
                <LineWrapper>
                  {detailOrder && is_sent[0] ? (
                    <>
                      <FullLine></FullLine>
                      <FullLine></FullLine>
                    </>
                  ) : (
                    <>
                      <Line></Line>
                      <Line></Line>
                    </>
                  )}
                  {detailOrder && is_completed[0] ? (
                    <FullLine></FullLine>
                  ) : (
                    <Line></Line>
                  )}
                </LineWrapper>
                <TrackContent>
                  {detailOrder && is_sent[0] ? (
                    <FullTrack></FullTrack>
                  ) : (
                    <Track></Track>
                  )}
                  <Status>????????????</Status>
                </TrackContent>
                <TrackContent>
                  {detailOrder && is_sent[0] ? (
                    <FullTrack></FullTrack>
                  ) : (
                    <Track></Track>
                  )}
                  <Status>?????????</Status>
                </TrackContent>
                <TrackContent>
                  {detailOrder && is_sent[0] ? (
                    <FullTrack></FullTrack>
                  ) : (
                    <Track></Track>
                  )}
                  <Status>?????????</Status>
                </TrackContent>
                <TrackContent>
                  {detailOrder && is_completed[0] ? (
                    <FullTrack></FullTrack>
                  ) : (
                    <Track></Track>
                  )}
                  <Status>????????????</Status>
                </TrackContent>
              </Section>
              <ButtonSection>
                {detailOrder && is_paid[0] ? (
                  <Button>????????????</Button>
                ) : (
                  <NormalButton onClick={handlePayOrder}>????????????</NormalButton>
                )}
              </ButtonSection>
              <PaySection>
                <PayLineWrapper>
                  {detailOrder && is_paid[0] ? (
                    <FullLine></FullLine>
                  ) : (
                    <Line></Line>
                  )}
                </PayLineWrapper>
                <TrackContent>
                  {detailOrder && is_paid[0] ? (
                    <FullPayTrack></FullPayTrack>
                  ) : (
                    <PayTrack></PayTrack>
                  )}
                  <Status>????????????</Status>
                </TrackContent>
                <TrackContent>
                  {detailOrder && is_paid[0] ? (
                    <FullPayTrack></FullPayTrack>
                  ) : (
                    <PayTrack></PayTrack>
                  )}
                  <Status>????????????</Status>
                </TrackContent>
              </PaySection>
            </>
          )}
          <NormalButton
            style={{
              "margin-top": "70px",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={() => navigate(-1)}
          >
            ?????????
          </NormalButton>
        </Container>
      </ThickNavPage>
    </>
  );
};

export default OrderDetailPage;
