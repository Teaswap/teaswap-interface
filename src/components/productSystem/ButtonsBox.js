import React from 'react';
import styled from 'styled-components';
import { DISTANCE, COLOR, FONT, MEDIA_QUERY } from '../../constants/style';
import { NavLink } from 'react-router-dom';
import { NormalButton } from '../NFTButton'
import { useTranslation } from 'react-i18next'

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled(NormalButton)`
  background-color: #ffffff;
  color:  #7f7f7f;
  border: 1px solid #7f7f7f;
  // padding: 8px 45px;
  border-radius: 0px;
  ${MEDIA_QUERY.sm} {
    width: 120px;
  }
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #7f7f7f;
  }
  &:last-child {
    margin-left: ${DISTANCE.sm};
  }
`;

const ErrorMessageContainer = styled.div`
  margin-left: ${DISTANCE.lg};
  font-size: ${FONT.lg};
  font-weight: bold;
  color: ${COLOR.text_alert};
  line-height: 1.5;
`;

export const ButtonsBox = ({ handler, productErrorMessage }) => {
  const {t} = useTranslation();
  return (
    <ButtonContainer>
      <Button $margin={0} onClick={handler}>
        {t('Mint')}
      </Button>
      <NavLink to='/nft/users/backstage'>
        <Button $margin={0}>{t('My Account')}</Button>
      </NavLink>
      {productErrorMessage && (
        <ErrorMessageContainer>{productErrorMessage}</ErrorMessageContainer>
      )}
    </ButtonContainer>
  );
};
