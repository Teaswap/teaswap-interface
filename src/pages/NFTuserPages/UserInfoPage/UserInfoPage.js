import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from '../../../components/NFTButton';
import { WrapperMask } from '../../../components/userSystem/';
import { COLOR, FONT, EFFECT, DISTANCE } from '../../../constants/style';
import { ActionButton } from '../../../components/NFTButton';
import {
  Announcement,
  ClientInfoForm,
  SetPassword,
  SetAvatar,
} from '../../../components/userSystem';
import { ThickNavPage } from '../../../components/Page';
import useUser from '../../../hooks/userHooks/useUser';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 30px 0;
`;

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
`;

const Text = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.md};
  margin: ${DISTANCE.lg} 0 ${DISTANCE.sm} 0;
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
  border-radius: 0px;
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

const UserInfoPage = () => {
  const navigate = useNavigate();
  const [successMode, setSuccessMode] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const { handleGetMe, errorMessage } = useUser();
  const handleSetPassword = () => setIsSettingPassword(true);

  const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (!result.data) return navigate('/nft');
      if (result.data.is_vendor)
        return navigate(`/nft/users/vendor/${result.data.userId}`);
    }) ;
  }, []);

  return (
    <ThickNavPage>
      <Wrapper>
        <Title>{t('General Information')}</Title>
        {/*<Announcement />*/}
        <ClientInfoForm setSuccessMode={setSuccessMode} />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <Text>{t('Upload Avatar')}</Text>
        <SetAvatar setSuccessMode={setSuccessMode} />
        <PageBottom>
          <Nav path='/nft' children='Back to NFTHome' />
        </PageBottom>
        {successMode && (
          <WrapperMask>
            <SuccessMessage>
              <p>{t('Success')}</p>
              <ActionButton onClick={() => setSuccessMode(false)}>
                {t('Confirm')}
              </ActionButton>
            </SuccessMessage>
          </WrapperMask>
        )}
      </Wrapper>
    </ThickNavPage>
  );
};

export default UserInfoPage;
