import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { COLOR, FONT, EFFECT, MEDIA_QUERY } from '../constants/style';
import IconComponent from './Icon';
import { ButtonPrimary } from '../components/Button'

const ButtonWrapper = styled.button`
  padding: 5px 10px;
  min-width: fit-content;
  transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out,
    color 0.1s ease-in-out;
  border: solid 1px ${COLOR.black};
  color: ${COLOR.black};
  cursor: pointer;
  text-align: center;
  text-decoration: none;
`;

const HelperButtonWrapper = styled(ButtonWrapper)`
  position: fixed;
  right: 50px;
  bottom: 100px;
  display: flex;
  align-items: center;
  border: solid 1px transparent;
  border-radius: 25px;
  padding: 3px 20px 3px 13px;
  background-color: ${COLOR.btn_primary};
  color: ${COLOR.black};
  font-size: ${FONT.sm};
  font-weight: 800;
  min-width: max-content;
  box-shadow: ${EFFECT.shadowDark};
  &:hover {
    transform: scale(1.05);
  }
`;

export const NormalButton = styled(ButtonWrapper)`
  width: 286px;
  height: 40px;
  padding: 5px 10px;
  margin: 0px ${(props) => (props.$margin === 0 ? 0 : 20)}px;
  min-width: max-content;
  font-size: 14px;
  background-color: #ffffff;
  color:  #7f7f7f;
  border: 1px solid #7f7f7f;
  height: 42px;
  &:hover {
    border: #474747;
  }
`;

export const GreyBtn = styled(ButtonPrimary)`
  margin: 40px 0 37px 0;
  padding: 0px;
  width: 286px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  align-self: flex-start;
  display: block;
`

export const ActionButton = styled(GreyBtn)`
  width: 286px;
`;

export const ActionButton2 = styled(GreyBtn)`
  ${MEDIA_QUERY.sm} {
    width: 100px;
  }
`;

export function HelperButton() {
  return (
    <HelperButtonWrapper>
      <IconComponent kind={'question-circle'} margin={0} />
      幫助
    </HelperButtonWrapper>
  );
}

export function Nav({ children, path, $margin }) {
  return (
    <NavLink style={{ minWidth: 'fit-content' }} to={path}>
      <NormalButton $margin={$margin}>{children}</NormalButton>
    </NavLink>
  );
}
