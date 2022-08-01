import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/userHooks/useUser';
import { Nav } from '../../../components/NFTButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { WrapperMask } from '../../../components/userSystem/';
import { COLOR, FONT, EFFECT, DISTANCE, MEDIA_QUERY } from '../../../constants/style';
import { ActionButton } from '../../../components/NFTButton';
import {
  Announcement,
  VendorInfoForm,
  SetPassword,
  SetAvatar,
  SetBanner,
  SetPermission,
} from '../../../components/userSystem';
import { ThickNavPage } from '../../../components/Page';
import { ThickestNavPage } from '../../../components/Page';
import { useTranslation } from 'react-i18next'
import { ExternalLink } from '../../../theme';

const Wrapper = styled.div`
  width: 50vw;
  max-width: 820px
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    width: 100%;
  }
`;

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
`;

const Text = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  margin: ${DISTANCE.sm} 0 ${DISTANCE.sm} 0;
`;

const ErrorText = styled.p`
  color: ${COLOR.text_alert};
  font-size: ${FONT.xss};
  margin-top: 15px;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  min-width: 40vw;
  color: ${COLOR.text_1};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: ${FONT.lg};
  border-radius: 15px;
  background: ${COLOR.light_primary};
  box-shadow: ${EFFECT.shadowDark};
  & p {
    margin: 20px;
  }
`;

const PageBottom = styled.div`
  margin: ${DISTANCE.md} auto 0 auto;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VendorInfoPage = () => {
  const { handleGetUserById } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [successMode, setSuccessMode] = useState(false);
  const [isAdminStatus, setIsAdminStatus] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const { handleGetMe, errorMessage } = useUser();
  const {t} = useTranslation();

  const handleSetPassword = () => setIsSettingPassword(true);
  const doAdminStatusInit = (userId) => {
    setIsAdminStatus(true);
    handleGetUserById(userId);
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      const userId = location.pathname.split('/')[4];
      if (!result.data) return navigate('/nft');
      if (result.data.is_admin) return doAdminStatusInit(userId);
      if (Number(userId) !== result.data.userId || !result.data.is_vendor)
        return navigate('/nft');
    });
  }, []);

  return (
    <ThickestNavPage>
      <Wrapper>
        <Title>{t('My Profile Information')}</Title>
        {/*<Announcement />*/}
        {isAdminStatus && <SetPermission setSuccessMode={setSuccessMode} />}
        <VendorInfoForm
          setSuccessMode={setSuccessMode}
          successMode={successMode}
          isAdminStatus={isAdminStatus}
        />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {/* <Text>{t('Upload Avatar')}</Text>
        <SetAvatar setSuccessMode={setSuccessMode} />
        <Text>{t('Upload Banner')}</Text>
        <SetBanner setSuccessMode={setSuccessMode} /> */}
        <PageBottom>
          <Nav path='/nft/users/backstage' children={t('Back to Account')} />
        </PageBottom>
        <Title style={{marginTop: '20px', fontSize: 20}}>
          Note : How to launch your own Web3Social Token ? &nbsp;
          <ExternalLink href={"https://docs.google.com/forms/d/e/1FAIpQLSfA-dOW15tyN6dfyZScvcEmT3lC13K9ThFBTruiFD0wOVsoUQ/viewform"}>
            Apply Now !
          </ExternalLink>
        </Title>
      </Wrapper>
    </ThickestNavPage>
  );
};

export default VendorInfoPage;
