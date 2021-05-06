import React from 'react'
import styled from 'styled-components'

import FlameImg from '../../assets/images/flame.jpeg'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <img src={FlameImg} width="30px" height="30px" />
      <StyledLink target="_self" href="https://www.teaswap.art/staking">
        Hot
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> | </StyledLink>
      <StyledLink>
        Earn TSA
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> | </StyledLink>
      <StyledLink>
        TSA Staking
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> | </StyledLink>
      <StyledLink>
        NFT Pool
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> | </StyledLink>
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
`

const StyledLink = styled.a`
  color: #474747;
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
    color: #474747;
  }

  :active {
    text-decoration: none;
    color: #474747;
  }
  :link {
    text-decoration: none;
    color: #474747;
  }
`

export default Nav
