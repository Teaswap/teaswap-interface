import React from 'react';
import styled from 'styled-components';
import { DISTANCE, COLOR, FONT } from '../../constants/style';
import { NavLink } from 'react-router-dom';
import { NormalButton } from '../NFTButton'
import { useTranslation } from 'react-i18next'

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled(NormalButton)`
  padding: 8px 45px;
  border-radius: 0px;
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
        {t('Confirm')}
      </Button>
      <NavLink to='/nft/users/backstage'>
        <Button $margin={0}>{t('Back')}</Button>
      </NavLink>
      {productErrorMessage && (
        <ErrorMessageContainer>{productErrorMessage}</ErrorMessageContainer>
      )}
    </ButtonContainer>
  );
};
