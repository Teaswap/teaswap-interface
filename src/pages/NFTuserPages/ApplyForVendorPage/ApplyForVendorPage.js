import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/userHooks/useUser';
import { Nav } from '../../../components/NFTButton';
import { useNavigate } from 'react-router-dom';
import { WrapperMask } from '../../../components/userSystem/';
import { COLOR, FONT, EFFECT, DISTANCE, MEDIA_QUERY } from '../../../constants/style';
import { GreyBtn } from '../../../components/NFTButton';
import {
  Announcement,
  VendorInfoForm,
  SetAvatar,
  SetBanner,
} from '../../../components/userSystem';
import { ThickNavPage } from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import { ButtonPrimary } from '../../../components/Button';
import { METHODS } from 'http';

const Wrapper = styled.div`
  width: 90%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  margin: 0 auto;
  padding: 30px;
  ${MEDIA_QUERY.sm}{
  }
`;

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
  width: 100%;
  margin: 0 auto;
  ${MEDIA_QUERY.sm} {
    width: 100%;
    font-size: 18px;
  }
`;
const Title2 = styled(Title)`
  ${MEDIA_QUERY.sm} {
    width: 50%;
  }
`

const ErrorText = styled.p`
  color: ${COLOR.text_alert};
  font-size: ${FONT.xss};
  margin-top: 15px;
`;

const SuccessMessage = styled.div`

`;

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
  ${MEDIA_QUERY.sm} {
    padding: 80px 0px;
  }
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
    // componentDidMount or componentDidUpdate
    window.scroll(0, 0);
    handleGetMe().then((result) => {
      console.log('dddd', 'handleGetMe', result )
      if (result && result.data && result.data.is_vendor) return navigate('/nft/products/post');
    });
  }, []);

  return (
    <ThickNavPage style={{maxWidth:"600px"}}>
      <Wrapper>
        {isCheck && (
          <div>
            <WrapperMask style={{
              width: '100%'
            }}>
              <CheckImage>
                <Title2>{t('Create collections and sell NFTs to your fans, start now !')}</Title2>
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
          </div>
        )}
        <Title>{t('Featured Artists Information')}</Title>
        {/*<Announcement isApply={true} />*/}
        <VendorInfoForm setSuccessMode={setSuccessMode} goPost={true} />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        {/* <PageBottom>
          <Nav path='/nft' children={t('Back to NFTHome')} />
        </PageBottom> */}
      </Wrapper>
    </ThickNavPage>
  );
};

export default ApplyForVendorPage;
