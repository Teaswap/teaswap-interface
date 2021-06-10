import React from 'react';
import styled from 'styled-components';
import { COLOR, MEDIA_QUERY } from '../../constants/style';
import {
  Products,
  InfoTitle,
  InfoItem,
  VendorInfo,
} from '../../components/productSystem';
import { useTranslation } from 'react-i18next';

const VendorTitle = styled(InfoTitle)`
  margin-top: 40px;
`;

const OtherProductWrap = styled(InfoItem)`
  margin-top: 40px;
  padding-bottom: 0;
  border-bottom: none;
  ${MEDIA_QUERY} {
    display: flex;
    justify-content: space-between;
  }
`;

const OtherProductTitle = styled(InfoTitle)`
  margin: 0;
  border-bottom: none;
`;

const MoreLink = styled.a`
  margin: 0 20px;
  color: #007bff;
  display: inline-block;
  &:hover {
    color: ${COLOR.hover};
    text-decoration: underline;
  }
`;

export const VendorIntro = ({
  products,
  id,
  productErrorMessage,
  vendorInfo,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <VendorTitle>{t('Artist')}</VendorTitle>
      <VendorInfo />
      {products.length !== 0 ? (
        <>
          <OtherProductWrap>
            <OtherProductTitle>{t('Other Wokrs by This Artist')}</OtherProductTitle>
            <MoreLink href={`/nft/products/vendor/${vendorInfo.id}`}>
              {t('More')}
            </MoreLink>
          </OtherProductWrap>
          <Products
            products={products}
            id={id}
            productErrorMessage={productErrorMessage}
            $padding={'20px 10px'}
            $width={'150px'}
            $height={'150px'}
            $margin={'0 5px'}
            $justify={'space-around'}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
