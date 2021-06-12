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
  min-width: max-content;
  margin-top: -100px;
  margin-left: 20px;
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
  // border: 1px solid #7f7f7f;
  // padding: 10px 40px;
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
  cursor: pointer;
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #7f7f7f;
    transform: scale(1.05);
  }
  // visibility: hidden;
  height: 0px;
`;

const InputFile = styled.input`
  display: none;
`;

export function PictureBox({ pictureUrl, handleChange }) {
  const {t} = useTranslation()
  return (
    <SetPictureContainer>
      <PreviewPicture onClick={() => document.getElementById('upload-file').click()} src={pictureUrl} alt='' />
      <RightSide>
        <Description>
          <p>
            {"Support： PNG, JPG , GIF, Video and Audio; Suggested ration 3:4; Size <10MB"}
          </p>
          <p>
            {"Mint an NFT charges 0.01BNB"}
          </p>
        </Description>
        <Label>
          <InputFile id="upload-file" type='file' onChange={handleChange} />
          {/* {t("Choose File")} */}
        </Label>
      </RightSide>
    </SetPictureContainer>
  );
}
