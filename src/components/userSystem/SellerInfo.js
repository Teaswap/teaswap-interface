import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import { ActionButton, Nav } from '../NFTButton';
import useUser from '../../hooks/userHooks/useUser';
import useProduct from '../../hooks/productHooks/useProduct';
import { useTranslation } from 'react-i18next'

const InfoBlock = styled.section`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin: 40px 0;
`;
const AvatarContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

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
`;

const InfoContainer = styled.div`
  width: 55%;
  border-right: 1px solid ${COLOR.cccccc};
  padding-right: 40px;
  align-self: center;
  min-width: max-content;
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const SellerName = styled.div`
  font-size: ${FONT.lg};
  color: ${COLOR.text_2};
  font-weight: bold;
  margin-right: 26px;
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
`;

const InfoNumber = styled.div`
  color: ${COLOR.text_2};
`;

const ContactContainer = styled.div`
  width: 250px;
  margin-left: ${DISTANCE.sm};
  align-self: center;
  color: ${COLOR.text_2};
  min-width: max-content;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  min-width: max-content;
`;

const ContactInfoTitle = styled.div`
  font-size: ${FONT.lg};
  font-weight: bold;
  line-height: normal;
  min-width: max-content;
`;

const Email = styled.p`
  font-size: ${FONT.xs};
`;

const InfoLeft = ({ avatar, onLoad, loaded }) => {
  return (
    <AvatarContainer>
      <Avatar
        src={avatar}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={onLoad}
      />
    </AvatarContainer>
  );
};

const InfoMiddle = ({ nickname, products }) => {
  return (
    <InfoContainer>
      <InfoTop>
        <SellerName>{nickname}</SellerName>
        {/*<ActionButton $margin={20}>+ 加入關注</ActionButton>*/}
      </InfoTop>
      <InfoItem products={products} />
    </InfoContainer>
  );
};

const InfoItem = () => {
  const { averageShippingTime, productCount } = useProduct();
  const {t} = useTranslation();
  return (
    <InfoBottom>
      <InfoBottomItem>
        <InfoName>{t('Works Amount')}</InfoName>
        <InfoNumber>{productCount}</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Works Amount')}</InfoName>
        <InfoNumber>2</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Sold Amount')}</InfoName>
        <InfoNumber>3</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Watch Amount')}</InfoName>
        <InfoNumber>
          {averageShippingTime ? `${averageShippingTime} days` : 'No Work'}
        </InfoNumber>
      </InfoBottomItem>
    </InfoBottom>
  );
};

const InfoRight = ({ email }) => {
  const [id, setId] = useState(null);
  const { handleGetMe } = useUser();
  const {t} = useTranslation();

  useEffect(() => {
    handleGetMe().then((result) => {
      setId(result.data.userId);
    });
  }, []);

  return (
    <ContactContainer>
      <ContactInfo>
        <ContactInfoTitle>{t('Contact Info')}</ContactInfoTitle>
        <Nav children={t('Edit Contact')} path={`/nft/users/vendor/${id}`} />
      </ContactInfo>
      <Email>{email}</Email>
    </ContactContainer>
  );
};

export default function SellerInfo({ onLoad, loaded, vendorInfo, products }) {
  return (
    <InfoBlock>
      <InfoLeft
        avatar={vendorInfo.avatar_url}
        onLoad={onLoad}
        loaded={loaded}
      />
      <InfoMiddle nickname={vendorInfo.nickname} products={products} />
      <InfoRight email={vendorInfo.email} />
    </InfoBlock>
  );
}
