import React from 'react';
import { COLOR, FONT, MEDIA_QUERY } from '../../constants/style';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const ProductSelect = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FONT.xs};
`;

const SortName = styled.div`
  margin-right: 40px;

  ${MEDIA_QUERY.lg} {
    display: none;
  }
`;

const Select = styled.select`
  width: 195px;
  padding: 5px 2px;
  font-family:'Noto Sans TC', "sans-serif normal", 'Helvetica Neue', 'Adobe Garamond W08','adobe-garamond-pro','AGaramondPro-Regular','Times New Roman','Times','serif' ;
  color: ${COLOR.text_2};

  option {
    color: ${COLOR.text_2};
  }
`;

export const ProductSort = ({ id, handleChangeProductSort }) => {
  const {t} = useTranslation();
  return (
    <ProductSelect>
      <SortName>{t('Sort')}</SortName>
      <Select onChange={(e) => handleChangeProductSort(id, e.target.value, 1)}>
        <option value={'latest'}>{t('New Post')}</option>
        <option value={'lowToHight'}>{t('Price Up')}</option>
        <option value={'hightToLow'}>{t('Price Down')}</option>
      </Select>
    </ProductSelect>
  );
};
