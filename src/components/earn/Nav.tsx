import React from 'react'
import styled from 'styled-components'

import FlameImg from '../../assets/images/flame.jpeg'
import { MEDIA_QUERY } from '../../constants/style'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <img src={FlameImg} width="30px" height="30px" />
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_self" href="https://www.teaswap.art/staking">
        Hot
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink>
        Earn TSA
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink>
        TSA Staking
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink>
        NFT Pool
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink>
        Ended
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://t.me/bestswap_com">
        Announcement
      </StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1600px;
  margin:0 auto;
  flex-wrap: wrap;
  ${MEDIA_QUERY.sm}{
    margin-top: 10px;
  }
`

const StyledLink = styled.a`
  color: #7f7f7f;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  :hover {
    text-decoration: none;
    color: #474747;
  }

  :focus {
    outline: none;
    text-decoration: none;
    color: #7f7f7f;
  }

  :active {
    text-decoration: none;
    color: #7f7f7f;
  }
  :link {
    text-decoration: none;
    color: #7f7f7f;
  }
`

export default Nav
