import React from 'react'
import styled from 'styled-components'
import {  transparentize } from 'polished'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${({theme}) => transparentize(0.1, theme.white)};
  border: 1px solid ${({theme}) => theme.white}ff;
  border-radius: 3px;
  box-shadow: inset 1px 1px 0px ${({theme}) => theme.white};
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
`

export default Card
