import React from 'react';
import { COLOR, FONT, MEDIA_QUERY } from '../../constants/style';
import styled from 'styled-components';
import { ActionButton } from '../NFTButton'
import useProduct from '../../hooks/productHooks/useProduct';
import {
  InfoBlock,
  InfoItem,
  InfoItemTitle,
} from '../../components/productSystem';
import { useTranslation } from 'react-i18next'
import { hideAddr } from '../../utils/strUtil';

const VendorInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY.lg} {
    align-items: center;
  }
`;

const VendorInfoTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const VendorName = styled.div`
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 14px;
  width: 75px;
  height: 75px;

  a {
    width: 100%;
    height: 100%;
  }

`;

const VendorAvatar = styled.img`
  position: relative;
  margin-right: 14px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: opacity 0.2s;
  object-fit: cover;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const FollowButton = styled(ActionButton)`
  width: 110px;
  margin-right: 50px;
`;
const ContactButton = styled(ActionButton)`
  width: 110px;
`;

const Buttons = () => {
  return (
    <ButtonsContainer>
      <FollowButton $margin={0}>加入關注</FollowButton>
      <ContactButton $margin={0} $bg={'red'}>
        聯絡賣家
      </ContactButton>
    </ButtonsContainer>
  );
};

const InfoWrap = styled(InfoItem)`
  flex-direction: column;
  color: ${COLOR.text_2};
  padding-bottom: 0;

  ${InfoItemTitle} {
    min-width: 150px;
    font-size: ${FONT.xs};
  }

  ${InfoItem} {
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: none;
    padding-bottom: 0;
  }

  ${MEDIA_QUERY.lg} {
    flex-wrap: wrap;
    align-items: center;
  }
`;

const InfoItemBlock = styled(InfoBlock)`
  font-weight: normal;
  color: ${COLOR.black};
  height: 20px;
  ${MEDIA_QUERY.lg} {
    max-width: 40px;
  }
`;

const VendorInfoItem = () => {
  const {t} = useTranslation();
  const { averageShippingTime, userCreated, userSold, vendorInfo } = useProduct();
  return (
    <InfoWrap>
      <InfoItem>
        <InfoItemTitle>{t('Created')} : {userCreated}</InfoItemTitle>
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Sold')} : {userSold}</InfoItemTitle>
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('Like')} : {vendorInfo.likes}</InfoItemTitle>
      </InfoItem>
      <InfoItem>
        <InfoItemTitle>{t('View')} : {vendorInfo.views}</InfoItemTitle>
      </InfoItem>
    </InfoWrap>
  );
};

export const VendorInfo = () => {
  const { loaded, onLoad, vendorInfo } = useProduct();
  return (
    <VendorInfoContainer>
      <VendorInfoTop>
        <AvatarContainer>
          <a href={`/nft/products/vendor/${vendorInfo.id}`}>
            <VendorAvatar
              src={vendorInfo.avatar_url}
              style={{ opacity: loaded ? 1 : 0 }}
              onLoad={onLoad}
            />
          </a>
        </AvatarContainer>
        <a class='a-link' href={`/nft/products/vendor/${vendorInfo.id}`}>
          <VendorName>{hideAddr(vendorInfo.nickname)}</VendorName>
        </a>
      </VendorInfoTop>
      {/*<Buttons />*/}
      <VendorInfoItem/>
    </VendorInfoContainer>
  );
};
