import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import useSet from '../../hooks/userHooks/useSet';
import { WrapperMask } from '../userSystem';
import { COLOR, FONT, DISTANCE, EFFECT, MEDIA_QUERY } from '../../constants/style';
import { ActionButton } from '../NFTButton'
import { useTranslation } from 'react-i18next'
import useProductForm from '../../hooks/productHooks/useProductForm';


const SetAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  max-width: 600px;
`;

const PreviewAvatar = styled.img`
  width: 432px;
  height: 576px
  border-radius: 0px;
  object-fit: contain;
  cursor: pointer;
  ${MEDIA_QUERY.sm}{
    width: 90%;
  }
`;

const RightSide = styled.div`
  min-width: max-content;
  font-size: 12px;

`;

const Description = styled.p`
  color: #474747;
  font-size: 12px;
  margin-bottom: ${DISTANCE.sm};
  ${MEDIA_QUERY.sm} {
    width: 60%;
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

export default function SetArtwork({productPictureUrl, handleChangePicture, setProductPictureUrl, productMediaType}) {
  const {t} = useTranslation()

  const{
    uploadError,
    isCheckImage,
    isLoadingUpload,
    setIsCheckImage,
    setIsLoadingUpload,
    setUploadError
  } = useProductForm()

  const _productMediaType = productMediaType || 'Picture'
  let fileAccept = 'image/jpeg,image/png,image/gif'
  switch(_productMediaType) {
    case 'Video':
      fileAccept = 'video/mp4,video/webm,video/mp3,video/wav,video/OGG';
      break;
    case 'Audio':
      fileAccept = 'audio/*';
      break;
    case 'Gif':
      fileAccept = 'image/gif';
      break;
  }
  console.log('productMediaType', productMediaType, fileAccept, productPictureUrl)
  const src = productPictureUrl.startsWith('http') ? productPictureUrl : `https://teaswap.mypinata.cloud/ipfs/${productPictureUrl}`
  const preview = (type) => {
    if (productPictureUrl == 'https://i.imgur.com/uqZxFCm.png') {
      return <PreviewAvatar onClick={() => document.getElementById('uploadArtwork').click()} src={src} alt='' />
    }
    switch(type) {
      case 'Video':
        return <video style={{width: '100%'}} controls onClick={() => document.getElementById('uploadArtwork').click()}src={src}></video>
      case 'Audio':
        return <audio controls onClick={() => document.getElementById('uploadArtwork').click()}src={src}></audio>
      default:
        return <PreviewAvatar onClick={() => document.getElementById('uploadArtwork').click()} src={src} alt='' />
    } 
  }

  return (
    <SetAvatarContainer>
      {preview(productMediaType)}
      <RightSide>
        <Description>
          {"Support： PNG, JPG , GIF, Video and Audio; Suggested ratio 3:4; Size <100MB"}
          <br />
          {"Mint an NFT charges 0.01BNB"}
        </Description>
        <Label>
          <InputFile id="uploadArtwork" type='file' accept={fileAccept}  onChange={(e) => handleChangePicture(e, setProductPictureUrl, setIsCheckImage, setIsLoadingUpload, setUploadError)} />
          {t("Choose File")}
        </Label>
        {isCheckImage && (
          <WrapperMask>
            <CheckImage>
              <Title>{t("File Loading")}</Title>
              <CheckAvatar src={productPictureUrl} alt='' />
              {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
            </CheckImage>
            {isLoadingUpload && <LoadingMask>Loading...</LoadingMask>}
          </WrapperMask>
        )}
      </RightSide>
    </SetAvatarContainer>
  );
}
