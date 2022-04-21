import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { useTranslation } from 'react-i18next'
import useProductForm from '../../hooks/productHooks/useProductForm';

const SetPictureContainer = styled.div`
  // display: flex;
  align-items: center;
`;

const PreviewPicture = styled.div`
  box-shadow: ${EFFECT.shadowInput};
  width: 432px;
  height: 576px;
  border-radius: 0px;
  object-fit: cover;
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MEDIA_QUERY.sm} {
    width: 80%;
    padding: 0;
    height: 100vw;
  }
`;

const RightSide = styled.div`
  min-width: max-content;
`;

const Description = styled.p`
  width: 60%;
  color: #474747;
  font-size: 14px;
  margin: 0;
  margin-top: 1rem;
`;

const Label = styled.label`
  display: none;
  // background-color: #ffffff;
  // color:  #7f7f7f;
  // min-width: max-content;
  // cursor: pointer;
  // &:hover {
  //   border: none;
  //   color: #ffffff;
  //   background-color: #7f7f7f;
  //   transform: scale(1.05);
  // }
  // // visibility: hidden;
  // height: 0px;
`;

const InputFile = styled.input`
  display: none;
`;

export function PictureBox({ pictureUrl, handleChange, productMediaType }) {
  const {t} = useTranslation()
  const _productMediaType = productMediaType || 'picture'
  let fileAccept = 'image/jpeg,image/png,image/gif'
  switch(_productMediaType) {
    case 'Video':
      fileAccept = 'video/mp4,video/mpeg,video/avi,video/quicktime,video/x-flv,video/x-ms-wmv,video/webm,video/x-msvideo';
      break;
    case 'Audio':
      fileAccept = 'audio/*';
      break;
    case 'Gif':
      fileAccept = 'image/gif';
      break;
  }
  console.log('productMediaType', productMediaType, fileAccept)
  const src = `https://teaswap.mypinata.cloud/ipfs/${pictureUrl}`
  const preview = (type) => {
    switch(type) {
      case 'Video':
        return <video controls style={{width: '100%'}} src={src}></video>
      case 'Audio':
        return <audio controls src={src}></audio>
      default:
        return <img width="100%" src={src} alt='' />
    } 
  }
  return (
    <SetPictureContainer>
      <PreviewPicture onClick={() => document.getElementById('upload-file').click()}>
        {preview(_productMediaType)}
      </PreviewPicture>
      <RightSide>
        <Description>
          {"Support： PNG, JPG , GIF, Video and Audio;"}
          <br />
          {"Suggested ratio 3:4; Size <10MB"}
          <br />
          {"Mint an NFT charges 0.01BNB"}
        </Description>
        <Label>
          <InputFile id="upload-file" type='file' accept={fileAccept} onChange={handleChange} />
          {/* {t("Choose File")} */}
        </Label>
      </RightSide>
    </SetPictureContainer>
  );
}
