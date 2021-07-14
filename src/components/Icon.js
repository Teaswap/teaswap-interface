import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Icon = styled.i`
  background: url(${process.env.PUBLIC_URL}/svg/${(props) => props.kind}.svg)
    center no-repeat;
  margin: 8px ${(props) => (props.$margin === 0 ? 0 : 11)}px;
  background-size: 50px;
  height : 50px;
  width : 50px;

`;

export default function IconComponent({ kind, margin, color }) {
  return (
    <IconContainer>
      <Icon kind={kind} color={color} $margin={margin} />
    </IconContainer>
  );
}
