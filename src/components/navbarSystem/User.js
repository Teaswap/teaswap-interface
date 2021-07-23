import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import IconComponent from '../Icon';
import { COLOR, DISTANCE, FONT } from '../../constants/style';
import { useNavigate } from 'react-router-dom';
import { shortenAddress } from '../../utils'

const UserContainer = styled.div`
  position: absolute;
  top: -85px;
  right: -10px;
  &:hover {
    & div {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const OptionWrapper = styled.div`
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.2s linear;
  position: absolute;
  top: 30px;
  right: 0;
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-color: transparent transparent #e5e5e6;
    border-style: solid;
    border-width: 0 7px 10px;
    position: absolute;
    top: 0;
    right: 13px;
    z-index: 7000;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-color: transparent transparent #fff;
    border-style: solid;
    border-width: 0 6px 9px;
    position: absolute;
    top: 3px;
    right: 14px;
    z-index: 7500;
  }
`;

const OptionInner = styled.div`
  padding-top: 2px;
  z-index: 1;
  position: relative;
  width: 150px;
  background: ${COLOR.bg_primary};
`;

const OptionList = styled.ul`
  border: 1px solid #e5e5e6;
  border-radius: 0px;
  padding: 0px;
`;

const OptionItem = styled.li`
  margin: ${DISTANCE.xs} 0;
  list-style-type: none;
`;

const OptionName = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.xs};
  cursor: pointer;
  height: 25px;
  padding-left: 10px;
  &:hover {
    color: ${COLOR.btn_primary};
    background: #eeeeee;
    
    
  }
`;
//border-bottom: 1px solid #ccc;
export default function User() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const { user, handleGetMe } = useUser();
  const preaddress = username.split('_');
  const address = preaddress[1];

  useEffect(() => {
    handleGetMe().then((result) => {
      if (!result || result.ok === 0) return;
      setIsVendor(result.data.is_vendor);
      setUsername(result.data.username);
    });
  }, []);

  useEffect(() => {
    if(user){
      setIsVendor((isVendor) => (user.is_vendor ? true : isVendor));
    }
  }, [user,isVendor]);

  return (
    <UserContainer id="UserContainer">
      <IconComponent kind={'user-circle'} />
      <OptionWrapper>
        <OptionInner>
          <OptionList>
            {address && (
              <OptionItem
                style={{
                  color: COLOR.black,
                  margin: '2px 0',
                  padding: '0px 0px 0px 10px',

                }}
              >
                {shortenAddress(address)}
              </OptionItem>
            )}
            {/* <OptionItem>
              <OptionName onClick={() => navigate('/nft/users/me')}>
                Edit
              </OptionName>
            </OptionItem> */}
            <OptionItem>
              <OptionName onClick={() => navigate('/nft/orders')}>
                History
              </OptionName>
            </OptionItem>
            <OptionItem>
              <OptionName onClick={() => navigate('/nft/cart')}>
                Bidding
              </OptionName>
            </OptionItem>
            {/* {!isVendor && (
              <OptionItem>
                <OptionName onClick={() => navigate('/nft/users/apply')}>
                  To be Vendor
                </OptionName>
              </OptionItem>
            )}
            {isVendor && (
              <OptionItem>
                <OptionName onClick={() => navigate('/nft/orders/vendor')}>
                  Sell
                </OptionName>
              </OptionItem>
            )} */}
            {isVendor && (
              <OptionItem>
                <OptionName onClick={() => navigate('/nft/users/backstage')}>
                  My Profile
                </OptionName>
              </OptionItem>
            )}
          </OptionList>
        </OptionInner>
      </OptionWrapper>
    </UserContainer>
  );
}
