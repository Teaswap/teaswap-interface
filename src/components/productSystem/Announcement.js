import React from 'react';
import styled from "styled-components";
import { COLOR, FONT } from "../../constants/style";
import { useTranslation } from 'react-i18next'

const AnnouncementContainer = styled.section`
  margin: 75px auto;
  width: 100%;
  min-height: 130px;
  background: ${COLOR.bg_secondary};
  padding: 20px 50px;
  font-size: ${FONT.xs};
`;

const AnnouncementTitle = styled.div`
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  font-weight: bold;
  margin-bottom: 15px;
`;

const AnnouncementContent = styled.div`
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  line-height: 1.5rem;
  white-space: break-spaces;
  word-wrap: break-word;
`;

export const Announcement = ({ announcement }) => {
  const {t} = useTranslation();
  return (
    <AnnouncementContainer>
      <AnnouncementTitle>{t('Artist Description')}</AnnouncementTitle>
      <AnnouncementContent>{announcement}</AnnouncementContent>
    </AnnouncementContainer>
  );
};
