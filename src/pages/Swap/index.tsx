import React from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'

import BakeTwitter from '../../assets/images/BakeTwitter.webp'

export default function Swap() {

    return (
    <ColumnCenter>
      <ImageDiv>
        <img src={BakeTwitter} width="100%"/> 
      </ImageDiv>
      <StyledLink href="/swaping">
        <JoinUs>
          Swap Now
        </JoinUs>
      </StyledLink>
    </ColumnCenter>
  )
}

const ImageDiv = styled.div`
  width: 100%;
  max-width: 600px;
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: none;
    color: inherit;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  :active {
    text-decoration: none;
    color: inherit;
  }
`
const JoinUs = styled.span`
  margin: 40px 0 37px 0;
  width: 120px;
  height: 40px;
  color: rgb(51,51,51);
  border: 1px solid rgb(51,51,51);
  text-align: center;
  line-height: 40px;
  align-self: flex-start;
  display: block;
  :hover{
    background: rgb(184, 184, 184);
    color: #ffffff;
  }
`