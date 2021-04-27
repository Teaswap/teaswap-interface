import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import useSet from '../../hooks/userHooks/useSet';
import { WrapperMask } from '../userSystem';
import { COLOR, FONT, DISTANCE, EFFECT } from '../../constants/style';
import { ActionButton } from '../NFTButton'

const SetAvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PreviewAvatar = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  height: 250px;
  width: 250px;
  min-width: 250px;
  border-radius: 0px;
  object-fit: cover;
`;

const RightSide = styled.div`
  padding: ${DISTANCE.md};
  min-width: max-content;
`;

const Description = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.xs};
  margin-bottom: ${DISTANCE.md};
`;

const Label = styled.label`
  border: solid 1px transparent;
  border-radius: 0px;
  padding: ${(props) => (props.$size === 'lg' ? '10px 90px' : '10px 20px')};
  background-color: ${COLOR.btn_primary};
  color: ${COLOR.white};
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
  width: 200px;
  &:hover {
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
  box-shadow: ${EFFECT.shadowInput};
  height: 300px;
  width: 300px;
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

export default function SetAvatar({ setSuccessMode }) {
  const { user } = useUser();
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
      <PreviewAvatar src={avatarUrl} alt='圖片載入失敗' />
      <RightSide>
        <Description>
          從電腦中選取圖檔<br></br>最佳大小為 250 x 250px
        </Description>
        <Label>
          <InputFile type='file' onChange={handleChangeFile} />
          選擇圖片
        </Label>
        {isCheckImage && (
          <WrapperMask>
            <CheckImage>
              <Title>是否上傳這張照片？</Title>
              <CheckAvatar src={avatarUrl} alt='圖片載入失敗' />
              {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
              <TwoButton>
                <ActionButton
                  $margin={0}
                  onClick={() => handleSubmitSetAvatar(setSuccessMode)}
                >
                  確定
                </ActionButton>
                <ActionButton
                  $bg={'red'}
                  $margin={0}
                  onClick={() => handleCancelSetAvatar(setSuccessMode)}
                >
                  取消
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
