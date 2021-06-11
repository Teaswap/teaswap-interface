import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next'

const SetPictureContainer = styled.div`
  // display: flex;
  align-items: center;
`;

const PreviewPicture = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  // height: 250px;
  // width: 250px;
  // min-width: 250px;
  width: 100%;
  border-radius: 0px;
  object-fit: cover;
`;

const RightSide = styled.div`
  padding: ${DISTANCE.md};
  min-width: max-content;
`;

const Description = styled.p`
  width: 60%;
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

export function PictureBox({ pictureUrl, handleChange }) {
  const {t} = useTranslation()
  return (
    <SetPictureContainer>
      <PreviewPicture src={pictureUrl} alt='' />
      <RightSide>
        <Description>
        {"Support： PNG, JPG , GIF, Video and Audio; Suggested ration 3:4; Size <10MB"}
        </Description>
        <Label>
          <InputFile type='file' onChange={handleChange} />
          {t("Choose File")}
        </Label>
      </RightSide>
    </SetPictureContainer>
  );
}
