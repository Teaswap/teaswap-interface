import React from 'react';
import styled from 'styled-components';
import { NormalButton } from '../NFTButton'
import {useTranslation} from 'react-i18next';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MoreButton = ({ id, handler }) => {
  const {t} = useTranslation();
  return (
    <ButtonContainer>
      <NormalButton onClick={() => handler(id)}>{t('More')}</NormalButton>
    </ButtonContainer>
  );
};
