import React from 'react';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import styled from 'styled-components';
import useProduct from '../../hooks/productHooks/useProduct';
import { MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next';

const ProductPictureContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
  max-height: 400px;
  height: auto;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: ${(props) => (props.loaded ? 0 : 1)};
    background: url(${process.env.PUBLIC_URL}/logo.svg) center/contain no-repeat;
    object-fit: cover;
  }
`;

const ProductPictureImg = styled.img`
  position: relative;
  transition: opacity 0.2s;
  width: 80%;
  max-width: 500px;
  height: 100%;
  object-fit: cover;
`;

export const InfoTitle = styled.div`
  margin: ${DISTANCE.sm} auto;
  padding-bottom: ${DISTANCE.sm};
  font-size: ${FONT.lg};
  color: ${COLOR.text_2};
  border-bottom: 1px solid ${COLOR.text_2};

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
  color: ${COLOR.text_2};
  white-space: pre-line;
  word-break: break-all;
`;

export const InfoItem = styled.div`
  margin-top: ${DISTANCE.sm};
  display: flex;
  padding-bottom: ${DISTANCE.sm};
  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.text_2};
  }
`;

export const InfoItemTitle = styled.div`
  width: 150px;
  padding-right: 20px;
  font-size: ${FONT.md};
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
      <InfoTitle>{t('Introduction')}</InfoTitle>
      <ProductInfoWrap>{product.info}</ProductInfoWrap>
    </>
  );
};

export const FreightIntro = ({ product }) => {
  const {t} = useTranslation();
  return (
    <>
      <InfoTitle>{t('Item Info')}</InfoTitle>
      <InfoItem>
        <InfoItemTitle>{t('Biding Price')}</InfoItemTitle>
        <InfoBlock>{product.delivery === '0' ? t('Bid') : t('Auction')}</InfoBlock>
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Contract Info')}</InfoItemTitle>
        <InfoBlock>{product.delivery === '0' ? t('Bid') : t('Auction')}</InfoBlock>
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Trade History')}</InfoItemTitle>
        <InfoBlock>
          {product.payment_method === '0' ? '' : ''}
        </InfoBlock>
      </InfoItem>
      <InfoItem style={{ borderBottom: 'none' }}>
        <InfoItemTitle>{t('Warning')}</InfoItemTitle>
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
