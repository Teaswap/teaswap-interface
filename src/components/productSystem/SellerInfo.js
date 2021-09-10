import React from 'react';
import styled from 'styled-components';
import useProduct from '../../hooks/productHooks/useProduct';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../constants/style';
import { ActionButton, NormalButton } from '../NFTButton';
import { VendorContact } from '../../components/productSystem';
import { useTranslation } from 'react-i18next'
import { AiFillTwitterSquare, AiFillInstagram, AiFillLike } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { ExternalLink } from '../../theme';

const InfoBlock = styled.section`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin: 40px 0;
`;
const AvatarContainer = styled.div`
  position: relative;
  max-width: 150px;
  max-height: 150px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url(${process.env.PUBLIC_URL}/logo-g.svg) center/contain
      no-repeat;
  }
`;

const Avatar = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  align-self: center;
  height: 110px;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${MEDIA_QUERY.sm} {
    width: 100%;
  }
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  ${MEDIA_QUERY.lg_1} {
    flex-direction: column;
    margin-bottom: 0px;
    justify-content: center;
  }
`;

const SellerName = styled.div`
  font-size: ${FONT.xs};
  color: ${COLOR.text_2};
  font-weight: bold;
  margin-right: 26px;

  ${MEDIA_QUERY.lg_1} {
    margin-right: 0px;
    margin-bottom: 40px;
  }
`;

const InfoBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBottomItem = styled.div`
  margin: 5px 20px 5px 0;
  width: 90px;
`;

const InfoName = styled.p`
  color: ${COLOR.text_2};
  font-size: 13px;
`;

const InfoNumber = styled.div`
  color: ${COLOR.text_2};
`;

const ContactContainer = styled.div`
  width: 250px;
  margin-left: ${DISTANCE.sm};
  align-self: center;
  color: ${COLOR.text_2};
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ContactInfoTitle = styled.div`
  font-size: ${FONT.lg};
  font-weight: bold;
  line-height: normal;
`;

const Email = styled.p`
  font-size: ${FONT.xs};
`;

const InfoLeft = ({ vendorInfo, onLoad, loaded }) => {
  const {t} = useTranslation()

  return (
    <div className="user-left">
      <div className="user-avatar-div flex-center">
        <img
          className="user-avatar"
          src={vendorInfo.avatar_url  || 'https://i.imgur.com/PFVXOOM.png'}
          style={{ opacity: loaded ? 1 : 0, }}
          onLoad={onLoad}
        />
      </div>
      <InfoContainer style={{
        marginTop: -100
      }}>
        <SellerName style={{marginLeft: 40}}>{vendorInfo.nickname}</SellerName>
          {/*<ActionButton $margin={20}>+ 加入關注</ActionButton>*/}
          <div className="user-icons">
            <ExternalLink className="margin10" href={`${vendorInfo.twitter}`}>
              <AiFillInstagram color="#7a7a7a" title="twitter" size="20"/>
            </ExternalLink>
            <ExternalLink className="margin10" href={`${vendorInfo.twitter}`}>
              <AiFillTwitterSquare color="#7a7a7a" title="twitter" size="20"/>
            </ExternalLink>
            <span style={{cursor: 'pointer'}} className="margin10">
              <AiFillLike size="20" color="#7a7a7a" title={t("Follow")} />
            </span>
          </div>
      </InfoContainer>
    </div>
  );
};

const InfoMiddle = ({ vendorInfo, products }) => {
  return (
    <InfoContainer>

      <InfoItem vendorInfo={vendorInfo} products={products} />
    </InfoContainer>
  );
};

const VendorInfoWrap = styled.div`
  display: flex;
  justify-content: center;

  ${MEDIA_QUERY.sm} {
    padding: 10px 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;

  ${MEDIA_QUERY.sm} {
    font-size: 10px;
  }
`;

const InfoItem = ({vendorInfo}) => {
  const {t} = useTranslation();
  // const { averageShippingTime, productCount } = useProduct();
  return (
    <InfoBottom>
      <InfoBottomItem>
        <InfoName>{t('Created')}</InfoName>
        <InfoNumber>{vendorInfo.created}</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Collected')}</InfoName>
        <InfoNumber>{vendorInfo.collected}</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('On Sale')}</InfoName>
        <InfoNumber>{vendorInfo.onSale}</InfoNumber>
      </InfoBottomItem>
      {/* <InfoBottomItem>
        <InfoName>Average shipment speed</InfoName>
        <InfoNumber>
          {averageShippingTime ? `${averageShippingTime} days` : 'No Products'}
        </InfoNumber>
      </InfoBottomItem> */}
    </InfoBottom>
  );
};

const InfoRight = ({ email, isShowContact, setIsShowContact, handleClick }) => {
  const {t} = useTranslation();
  return (
    <ContactContainer>
      <ContactInfo>
        {/* <ContactInfoTitle>{t('Contact Info')}</ContactInfoTitle> */}
        {/* <NormalButton onClick={handleClick}>{t('Contact')}</NormalButton> */}
        {/* {isShowContact && <VendorContact setIsShowContact={setIsShowContact} />} */}
      </ContactInfo>
      <Email>{email}</Email>
    </ContactContainer>
  );
};

export const SellerInfoMobile = ({
  onLoad,
  loaded,
  vendorInfo,
  products,
  isShowContact,
  setIsShowContact,
  handleClick,
}) => {
  const {t} = useTranslation();
  return (
    <InfoContainer>
      <VendorInfoWrap>
        <InfoTop>
          <AvatarContainer>
            <Avatar
              src={vendorInfo.avatar_url}
              style={{ opacity: loaded ? 1 : 0 }}
              onLoad={onLoad}
            />
          </AvatarContainer>
          <SellerName>{vendorInfo.nickname}</SellerName>
          <Buttons>
            <ActionButton $margin={20}>{t("Follow")}</ActionButton>
            <ActionButton onClick={handleClick} $margin={20} $bg={'red'}>
              {t("Follow")}
            </ActionButton>
            {/* {isShowContact && (
              <VendorContact setIsShowContact={setIsShowContact} />
            )} */}
          </Buttons>
        </InfoTop>
      </VendorInfoWrap>
      <InfoItem vendorInfo={vendorInfo} />
    </InfoContainer>
  );
};

export const SellerInfo = ({
  onLoad,
  loaded,
  vendorInfo,
  products,
  isShowContact,
  setIsShowContact,
  handleClick,
}) => {
  return (
    <InfoBlock>
      <InfoLeft
        vendorInfo={vendorInfo}
        onLoad={onLoad}
        loaded={loaded}
      />
      <InfoMiddle vendorInfo={vendorInfo} products={products} />
    </InfoBlock>
  );
};
