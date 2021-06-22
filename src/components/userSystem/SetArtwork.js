import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next'

const SetAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    display: block;
  }
`;

const PreviewAvatar = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  height: 300px;
  width: 300px;
  border-radius: 0px;
  object-fit: cover;
  cursor: pointer;
`;

const RightSide = styled.div`
  padding: ${DISTANCE.md};
  min-width: max-content;
  font-size: 16px;
`;

const Description = styled.p`
  color: ${COLOR.text_2};
  font-size: 16px;
  margin-bottom: ${DISTANCE.md};
`;

const Label = styled.label`
  background-color: #ffffff;
  color:  #7f7f7f;
  border: 1px solid #7f7f7f;
  padding: ${(props) => (props.$size === 'lg' ? '10px 90px' : '10px 20px')};
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
  width: 200px;
  visibility: hidden;
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

export default function SetAvatar({ productPictureUrl, handleChangePicture }) {
  const {t} = useTranslation()

  return (
    <SetAvatarContainer>
      <PreviewAvatar onClick={() => document.getElementById('uploadArtwork').click()} src={productPictureUrl} alt='' />
      <RightSide>
        <Description>
          {"Support： PNG, JPG , GIF, Video and Audio; Suggested ratio 3:4; Size <10MB"}
        </Description>
        <Label>
          <InputFile id="uploadArtwork" type='file' onChange={handleChangePicture} />
          {t("Choose File")}
        </Label>
      </RightSide>
    </SetAvatarContainer>
  );
}
