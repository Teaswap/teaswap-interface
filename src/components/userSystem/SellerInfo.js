import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, FONT, DISTANCE, MEDIA_QUERY } from '../../constants/style';
import { ActionButton, Nav } from '../NFTButton';
import useUser from '../../hooks/userHooks/useUser';
import useProduct from '../../hooks/productHooks/useProduct';
import { useTranslation } from 'react-i18next'
import { AiFillTwitterSquare, AiFillEdit, AiFillInstagram } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { ExternalLink } from '../../theme';

const InfoBlock = styled.section`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin: 40px 0;
  flex-wrap: wrap;
  ${MEDIA_QUERY.sm} {
    width: calc(100% - 20px);
  }
`;

const Avatar = styled.img`
  width: 50%; 
  height: 50%;
`;

const InfoContainer = styled.div`
  align-self: center;
  height: 130px;
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
`;

const SellerName = styled.div`
  font-size: 16px;
  color: #474747;
  font-weight: bold;
  margin-right: 26px;
  width: 90%;
  margin: 0 auto
`;

const InfoBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBottomItem = styled.div`
  margin: 5px 10px 5px 10px;
  text-align: center;
  // width: 90px;
`;

const InfoName = styled.p`
  color: #474747;
`;

const InfoNumber = styled.div`
  color: #474747;
`;

const ContactContainer = styled.div`
  width: 250px;
  margin-left: 20px;
  align-self: center;
  color: #474747;
  min-width: max-content;
  margin-top: 20px;
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

const InfoLeft = ({ vendorInfo, onLoad, loaded }) => {
  return (
    <div className="user-left">
      <div className="user-avatar-div flex-center">
        <img
          className="user-avatar"
          src={vendorInfo.avatar_url}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={onLoad}
        />
      </div>
      <InfoContainer>
        <SellerName>{vendorInfo.nickname}</SellerName>
          {/*<ActionButton $margin={20}>+ 加入關注</ActionButton>*/}
          <div className="user-icons">
            <ExternalLink className="margin10" href={`${vendorInfo.twitter}`}>
              <AiFillInstagram color="#7a7a7a" title="twitter" size="30"/>
            </ExternalLink>
            <ExternalLink className="margin10" href={`${vendorInfo.twitter}`}>
              <AiFillTwitterSquare color="#7a7a7a" title="twitter" size="30"/>
            </ExternalLink>
            <NavLink className="margin10" style={{ minWidth: 'fit-content' }} to={`/nft/users/vendor/${vendorInfo.userId}`}>
              <AiFillEdit color="#7a7a7a" title="Edit Contact" size="30"/>
            </NavLink>
          </div>
      </InfoContainer>
    </div>
  );
};

const InfoMiddle = ({ nickname, products }) => {
  return (
    <InfoContainer>
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
        <InfoName>{t('On Sale')}</InfoName>
        <InfoNumber>{productCount}</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Collected')}</InfoName>
        <InfoNumber>0</InfoNumber>
      </InfoBottomItem>
      <InfoBottomItem>
        <InfoName>{t('Created')}</InfoName>
        <InfoNumber>0</InfoNumber>
      </InfoBottomItem>
      {/* <InfoBottomItem>
        <InfoName>{t('Views')}</InfoName>
        <InfoNumber>
          {averageShippingTime ? `${averageShippingTime} days` : 'No Work'}
        </InfoNumber>
      </InfoBottomItem> */}
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
    
    </ContactContainer>
  );
};

export default function SellerInfo({ onLoad, loaded, vendorInfo, products }) {
  return (
    <InfoBlock>
      <InfoLeft
        vendorInfo={vendorInfo}
        onLoad={onLoad}
        loaded={loaded}
      />
      <InfoMiddle nickname={vendorInfo.nickname} products={products} />
    </InfoBlock>
  );
}
