import React from 'react'
import { ColumnCenter } from '../../components/Column'
import styled from 'styled-components'
import {MEDIA_QUERY} from '../../constants/style';

import { ExternalLink } from '../../theme'
const List = ()=>{

  return (
    <PageWrapper >
      <img src={process.env.PUBLIC_URL + '/mint_banner.png'} width="100%" />
      <Title>
        <StyledLink href="/nft/users/apply">
          Click & Mint Now!
        </StyledLink>
      </Title>
      <SubTitle>
        <StyledLink href="https://docs.google.com/forms/d/e/1FAIpQLSeDP0KdH1VC9v9G-D97SUX1ykcOOkMR_ff9OX5je-g1Qw8ePw/viewform">
          Featured Artist Application 
        </StyledLink>
      </SubTitle>
    </PageWrapper>
  )
};
export default List;

const PageWrapper = styled(ColumnCenter)`
  text-align: center;
  margin-top: -80px;
  width: 100%;
  ${MEDIA_QUERY.sm} {
    margin-top: -40px;
  }
`
const StyledLink = styled(ExternalLink)`
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
const Title = styled.p`
  font-size: 32px;
  text-align: center;
`
const SubTitle = styled.p`
  font-size: 20px;
  text-align: center;
`

