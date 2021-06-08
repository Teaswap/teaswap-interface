import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/userHooks/useUser';
import { Nav } from '../../../components/NFTButton';
import { useNavigate } from 'react-router-dom';
import { WrapperMask } from '../../../components/userSystem/';
import { COLOR, FONT, EFFECT, DISTANCE } from '../../../constants/style';
import { ActionButton } from '../../../components/NFTButton';
import {
  Announcement,
  VendorInfoForm,
  SetAvatar,
  SetBanner,
} from '../../../components/userSystem';
import { ThickNavPage } from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import { ButtonPrimary } from '../../../components/Button';

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
  border-radius: 15px;
  background: ${COLOR.light_primary};
  box-shadow: ${EFFECT.shadowDark};
  & p {
    margin: 20px;
  }
`;

const CheckComponent = styled.div``;

const CheckImage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: max-content;
  padding: 80px 150px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${COLOR.bg_primary};
`;

const TwoButton = styled.div`
  margin: ${DISTANCE.md} auto 0 auto;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageBottom = styled.div`
  margin: ${DISTANCE.md} auto 0 auto;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApplyForVendorPage = () => {
  const { handleApplyForVendor } = useUser();
  const navigate = useNavigate();
  const [successMode, setSuccessMode] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const { handleGetMe, errorMessage } = useUser();

  const handleCheck = () => {
    setIsCheck(false);
    handleApplyForVendor();
  };
  const handleCancel = () => navigate('/nft');
  const {t} = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      if (result.data.is_vendor) return navigate('/nft/products/post');
    });
  }, []);

  return (
    <ThickNavPage>
      <Wrapper>
        {isCheck && (
          <CheckComponent>
            <WrapperMask>
              <CheckImage>
                <Title>{t('Apply for Artist needs more Information')}</Title>
                <TwoButton>
                  <ButtonPrimary onClick={handleCheck}>
                    {t('OK')}
                  </ButtonPrimary>
                  <ButtonPrimary style={{marginLeft: "20px"}} onClick={handleCancel}>
                    {t('Cancel')}
                  </ButtonPrimary>
                </TwoButton>
              </CheckImage>
            </WrapperMask>
          </CheckComponent>
        )}
        <Title>{t('General Information')}</Title>
        {/*<Announcement isApply={true} />*/}
        <VendorInfoForm setSuccessMode={setSuccessMode} />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <Text>{t('Upload Avatar')}</Text>
        <SetAvatar setSuccessMode={setSuccessMode} />
        <Text>{t('UpLoad Banner')}</Text>
        <SetBanner setSuccessMode={setSuccessMode} />
        <PageBottom>
          <Nav path='/nft' children={t('Back to NFTHome')} />
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

export default ApplyForVendorPage;
