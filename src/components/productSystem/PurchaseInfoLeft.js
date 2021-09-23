import React from 'react';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import styled from 'styled-components';
import useProduct from '../../hooks/productHooks/useProduct';
import { MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next';
import {hideAddr} from '../../utils/strUtil'
import ClickableAddr from './ClickableAddr'

const ProductPictureContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 50%;
  ${MEDIA_QUERY.sm} {
    width: 100%;
    padding: 10px;
    justify-content: center;
  }
`;

const ProductPictureImg = styled.img`
  position: relative;
  transition: opacity 0.2s;
  width: 80%;
  // height: 100%;
  object-fit: contain;
`;

export const InfoTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: 19px;
  color: ${COLOR.dark_gray};
  border-bottom: 1px solid ${COLOR.cccccc};

  ${MEDIA_QUERY} {
    margin: 20px 0;
    margin-bottom: 20px;
  }
`;

export const InfoBlock = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100px;
  font-weight: bold;
  line-height: 1.5rem;
  color: ${COLOR.black};
  white-space: pre-line;
  word-break: break-all;
`;

const ProductInfoWrap = styled.div`
  min-height: 180px;
  line-height: 1.5rem;
  width: 100%;
  font-weight: normal;
  color: ${COLOR.black};
  white-space: pre-line;
  word-break: break-all;
`;

export const InfoItem = styled.div`
  margin-top: ${DISTANCE.sm};
  display: flex;
  padding-bottom: ${DISTANCE.sm};
  display: flex;
  flex-direction: column;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.cccccc};
  }
`;

export const InfoItemTitle = styled.div`
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 13px;
  color: ${COLOR.text_2};
  word-break: break-all;
`;

export const ProductPicture = ({ product }) => {
  const { loaded, onLoad } = useProduct();
  return (
    <ProductPictureContainer loaded={loaded}>
      <ProductPictureImg
        src={product.picture_url}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={onLoad}
      />
    </ProductPictureContainer>
  );
};

export const ProductIntro = ({ product }) => {
  const {t} = useTranslation();
  return (
    <>
      <InfoTitle>{t('Description')}</InfoTitle>
      <ProductInfoWrap>{product.info}</ProductInfoWrap>
    </>
  );
};

export const FreightIntro = ({ product }) => {
  const {t} = useTranslation();
  const { vendorInfo, Creator, productCarts, productOrders, handleTokenSwitch } = useProduct();
  console.log('productCarts FreightIntro', productCarts)
  return (
    <>
      <InfoTitle>{t('Additional Details')}</InfoTitle>
      <InfoItem className="scroll-table">
        <InfoItemTitle>{t('Bidding')}</InfoItemTitle>
        {/* <InfoBlock>{product.delivery === '0' ? t('Bid') : t('Auction')}</InfoBlock> */}
        {productCarts && productCarts.length > 0 && (
           <p className="trading-line">
            <span>Event</span>
            <span className="addr">Address</span>
            <span>Product Price</span>
            <span>Bid Price</span>
            <span>Date</span>
          </p>
        )}
        {productCarts && productCarts.map((cart, index) => {
          return (
            <p className="trading-line">
              <span>{cart.status == 0 ? 'bidding' : cart.status == 1 ? 'trading' : 'withdrawn'}</span>
              <ClickableAddr address={cart.userAddress} />
              <span>{cart.product_price} {handleTokenSwitch(cart.extoken)}</span>
              <span>{cart.bidprice} {handleTokenSwitch(cart.extoken)}</span>
              <span>{new Date(cart.createdAt).toLocaleDateString()}</span>
            </p>
          )
        })}
      </InfoItem>
      <InfoItem className="scroll-table">
        <InfoItemTitle>{t('Trading History')}</InfoItemTitle>
        {productOrders && productOrders.length > 0 && (
            <p className="trading-line">
              <span>Event</span>
              <span>Price</span>
              <span className="addr">From</span>
              <span className="addr">To</span>
              <span>Date</span>
            </p>
        )}
        {productOrders && productOrders.map((order, index) => {
          if (order.Order)
            return (
              <p className="trading-line">
                <span>{order.Order.order_type == 1 ? 'Transfer' : 'Buy'}</span>
                <span>{(order.product_price)} {handleTokenSwitch(order.extoken)}</span>
                <ClickableAddr address={order.Order.seller_address} />
                <ClickableAddr address={order.Order.client_address} />
                <span>{new Date(order.Order.createdAt).toLocaleDateString()}</span>
              </p>
            )
          else return (<> </>)
        })}
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Provenance')}</InfoItemTitle>
        <div>
          <p>Creator : <ClickableAddr address={Creator.address} /></p>
          <p>Owner : <ClickableAddr address={vendorInfo.address} /></p>
          <p>Contract Address : <ClickableAddr address={product.delivery_location} /></p>
          <p>Token ID : {product.tokenId}</p>
        </div>
      </InfoItem>
      <InfoItem style={{ borderBottom: 'none' }}>
        <InfoItemTitle>{t('Special notice')}</InfoItemTitle>
        <InfoBlock>
          {t('Discreet investment is suggested for the risk of the NFT market.')}
        </InfoBlock>
      </InfoItem>
    </>
  );
};

const PurchaseInfoLeftContainer = styled.section`
  width: 50%;
`;

export const PurchaseInfoLeft = ({ product }) => {
  return (
    <PurchaseInfoLeftContainer>
      <ProductPicture product={product} />
      <ProductIntro product={product} />
      <FreightIntro product={product} />
    </PurchaseInfoLeftContainer>
  );
};
