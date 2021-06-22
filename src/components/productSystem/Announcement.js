import React from 'react';
import styled from "styled-components";
import { COLOR, FONT, MEDIA_QUERY } from "../../constants/style";
import { useTranslation } from 'react-i18next'
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

const AnnouncementContainer = styled.section`
  position: relative;
  margin: 15px auto;
  width: calc(100% 100px);
  min-height: 130px;
  background: ${COLOR.bg_secondary};
  padding: 20px 50px;
  font-size: ${FONT.xs};
  ${MEDIA_QUERY.sm} {
    width: 90%;
    padding: 20px 5%;
  }
`;

const AnnouncementTitle = styled.div`
  font-size: 15px;
  color: #7a7a7a;
  font-weight: bold;
  margin-bottom: 15px;
`;

const AnnouncementContent = styled.div`
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  line-height: 1.5rem;
  white-space: break-spaces;
  word-wrap: break-word;
  margin-top: 20px;
`;

export const Announcement = ({ announcement, handleSetAnnouncement }) => {
  const {t} = useTranslation();
  return (
    <AnnouncementContainer>
      <AnnouncementTitle>{t('Artist Description')}</AnnouncementTitle>
      <AnnouncementContent>{announcement}</AnnouncementContent>
      {handleSetAnnouncement && (<span className="edit-desc-btn flex-center" onClick={handleSetAnnouncement}>
        <AiFillEdit color="#7a7a7a" title="Edit Contact" size="30"/>
      </span>)}
    </AnnouncementContainer>
  );
};
