import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Icon = styled.i`
  background: url(${process.env.PUBLIC_URL}/svg/${(props) => props.kind}.svg)
  center no-repeat;
  margin: -3px ${(props) => (props.$margin === 0 ? 0 : -15)}px;
  background-size: 30px;
  height : 30px;
  width : 30px;
`;

export default function IconComponent({ kind, margin, color }) {
  return (
    <IconContainer>
      <Icon kind={kind} color={color} $margin={margin} />
    </IconContainer>
  );
}
