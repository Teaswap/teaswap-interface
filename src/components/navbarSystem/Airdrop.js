import React from 'react';
import styled from 'styled-components';
import IconComponent from '../Icon';
import { COLOR, DISTANCE, FONT } from '../../constants/style';

const UserContainer = styled.div`
  position: relative;
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


export default function Airdrop() {
  return (
    <UserContainer>
      <span>Activity</span>
      <OptionWrapper>
        <OptionInner>
          <OptionList>
            <OptionItem>
              <OptionName>My Profile</OptionName>
            </OptionItem>
            <OptionItem>
              <OptionName>AirDrop</OptionName>
            </OptionItem>
          </OptionList>
        </OptionInner>
      </OptionWrapper>
    </UserContainer>
  );
}
