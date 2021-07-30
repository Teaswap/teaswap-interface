import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import useSet from '../../hooks/userHooks/useSet';
import { WrapperMask } from '../userSystem';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { ActionButton } from '../NFTButton'
import { useTranslation } from 'react-i18next'

const SetBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PreviewBanner = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  height: 200px;
  width: 100%;
  max-width: 600px;
  border-radius: 0px;
  object-fit: cover;
`;

const RightSide = styled.div`
  min-width: max-content;
`;

const Description = styled.p`
  color: #474747;
  font-size: 12px;
  margin-bottom: ${DISTANCE.md};
  ${MEDIA_QUERY.sm} {
    width: 80%;
  }

`;

const Label = styled.label`
  background-color: #ffffff;
  color:  #7f7f7f;
  border: 1px solid #7f7f7f;
  padding: ${(props) => (props.$size === 'lg' ? '10px 90px' : '10px 20px')};
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
  width: 286px;
  cursor: pointer;
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #7f7f7f;
    transform: scale(1.05);
  }
`;

const InputFile = styled.input`
  display: none;
`;

const CheckImage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: max-content;
  padding: 20px 250px;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${COLOR.bg_primary};
`;

const CheckBanner = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  height: 200px;
  width: 600px;
  border-radius: 0px;
  object-fit: cover;
`;

const Title = styled.h1`
  margin: ${DISTANCE.md} auto;
  color: ${COLOR.black};
  font-size: ${FONT.sm};
`;

const TwoButton = styled.div`
  margin: ${DISTANCE.md} auto;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ErrorMessage = styled.p`
  color: ${COLOR.text_alert};
  font-size: ${FONT.sm};
`;

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.bg_mask};
  color: ${COLOR.text_1};
  font-size: ${FONT.lg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SetBanner({ setSuccessMode }) {
  const { user } = useUser();
  const {t} = useTranslation()
  const {
    isCheckImage,
    uploadError,
    isLoadingUpload,
    bannerUrl,
    setBannerUrl,
    handleChangeBannerFile,
    handleSubmitSetBanner,
    handleCancelSetBanner,
  } = useSet();

  useEffect(() => {
    if(user){
      if (user.banner_url) setBannerUrl(user.banner_url);
    }
  }, [user]);

  return (
    <SetBannerContainer>
      <PreviewBanner src={bannerUrl} alt='' />
      <RightSide>
        <Description>
        {t("Pick from computer")}，{t("The best size")} 250 x 1140px
        </Description>
        <Label>
          <InputFile type='file' onChange={handleChangeBannerFile} />
          {t("Choose File")}
        </Label>
        {isCheckImage && (
          <WrapperMask>
            <CheckImage>
              <Title>{t("Upload or not")}</Title>
              <CheckBanner src={bannerUrl} alt='' />
              {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
              <TwoButton>
                <ActionButton
                  $margin={0}
                  onClick={() => handleSubmitSetBanner(setSuccessMode)}
                >
                  {t("Submit")}
                </ActionButton>
                <ActionButton
                  $bg={'red'}
                  $margin={0}
                  onClick={() => handleCancelSetBanner(setSuccessMode)}
                >
                  {t("Cancel")}
                </ActionButton>
              </TwoButton>
            </CheckImage>
            {isLoadingUpload && <LoadingMask>Loading...</LoadingMask>}
          </WrapperMask>
        )}
      </RightSide>
    </SetBannerContainer>
  );
}
