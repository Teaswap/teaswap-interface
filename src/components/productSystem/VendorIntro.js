import React from 'react';
import styled from 'styled-components';
import { COLOR, MEDIA_QUERY } from '../../constants/style';
import {
  Products,
  InfoTitle,
  VendorInfo,
} from '../../components/productSystem';

import { useTranslation } from 'react-i18next';

const VendorTitle = styled(InfoTitle)`
  margin-top: 40px;
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
    </>
  );
};
