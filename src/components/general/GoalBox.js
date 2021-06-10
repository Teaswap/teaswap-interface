import React from 'react';
import styled from 'styled-components';
import { FONT, COLOR, DISTANCE, MEDIA_QUERY } from '../../constants/style';
import {useTranslation} from 'react-i18next';

const GoalSection = styled.div`
  margin: ${DISTANCE.md} 0;
  padding: ${DISTANCE.lg} 0;
  background: ${COLOR.bg_secondary};
  display: flex;
  justify-content: center;
`;

const Goal = styled.div`
  padding: 0 ${DISTANCE.md};
  text-align-center;
`;

const GoalTitle = styled.h2`
  margin-bottom: ${DISTANCE.md};
  font-size: ${FONT.lg};
  font-weight: 400;
  color: ${COLOR.text_2};
  ${MEDIA_QUERY.sm} {
    font-size: ${FONT.xss};
  }
`;

const GoalPicture = styled.img`
  display: block;
  margin: 0 auto;
`;

const GoalBox = () => {
  const {t} = useTranslation();
  return (
    <GoalSection>
      <Goal>
        <GoalTitle>{t('Security & Convenient')}</GoalTitle>
        <GoalPicture
          src={process.env.PUBLIC_URL + '/about-us-security.png'}
          alt='Security & Convenient'
        />
      </Goal>
      <Goal>
        <GoalTitle>{t('Most Artistic Value')}</GoalTitle>
        <GoalPicture
          src={process.env.PUBLIC_URL + '/about-us-heart.png'}
          alt='Most Artistic Value'
        />
      </Goal>
    </GoalSection>
  );
};

export default GoalBox;
