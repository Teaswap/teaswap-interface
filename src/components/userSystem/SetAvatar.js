import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import useSet from '../../hooks/userHooks/useSet';
import { WrapperMask } from '../userSystem';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { ActionButton } from '../NFTButton'
import { useTranslation } from 'react-i18next'

const SetAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PreviewAvatar = styled.img`
  // box-shadow: ${EFFECT.shadowInput};
  height: 102px;
  width: 102px;
  border-radius: 0px;
  object-fit: cover;
  cursor: pointer;
`;

const RightSide = styled.div`
  min-width: max-content;
  font-size: 14px;

`;

const Description = styled.p`
  color: #474747;
  font-size: 14px;
  margin-bottom: ${DISTANCE.sm};
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
  width: 200px;
  display: none;
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

const CheckAvatar = styled.img`
  height: 102px;
  width: 102px;
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
  width: 270px;
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

export default function SetAvatar({ setSuccessMode }) {
  const { user } = useUser();
  const {t} = useTranslation()
  const {
    isCheckImage,
    uploadError,
    isLoadingUpload,
    avatarUrl,
    setAvatarUrl,
    handleChangeFile,
    handleSubmitSetAvatar,
    handleCancelSetAvatar,
  } = useSet();

  useEffect(() => {
    if(user){
      if (user.avatar_url) setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  return (
    <SetAvatarContainer>
      <PreviewAvatar onClick={() => document.getElementById('uploadAvatar').click()} src={avatarUrl} alt='' />
      <RightSide>
        <Description>
          {"Support： PNG, JPG , GIF, Video and Audio; Suggested 102* 102;"}
        </Description>
        <Label>
          <InputFile id="uploadAvatar" type='file' onChange={handleChangeFile} />
          {t("Choose File")}
        </Label>
        {isCheckImage && (
          <WrapperMask>
            <CheckImage>
              <Title>{t("Upload or not")}</Title>
              <CheckAvatar src={avatarUrl} alt='' />
              {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
              <TwoButton>
                <ActionButton
                  $margin={0}
                  onClick={() => handleSubmitSetAvatar(setSuccessMode)}
                >
                  {t("Submit")}
                </ActionButton>
                <ActionButton
                  style={{
                    marginLeft: '10px'
                  }}
                  $bg={'red'}
                  $margin={0}
                  onClick={() => handleCancelSetAvatar(setSuccessMode)}
                >
                  {t("Cancel")}
                </ActionButton>
              </TwoButton>
            </CheckImage>
            {isLoadingUpload && <LoadingMask>Loading...</LoadingMask>}
          </WrapperMask>
        )}
      </RightSide>
    </SetAvatarContainer>
  );
}
