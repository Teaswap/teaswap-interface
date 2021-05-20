import React from 'react'
import styled from 'styled-components'

import FlameImg from '../../assets/images/flame.jpeg'
import { MEDIA_QUERY } from '../../constants/style'

const Nav = (props: any) => {
  return (
    <StyledNav>
      <img src={FlameImg} width="30px" height="30px" />
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink onClick={() => props.handleCatChange(0)}>
        Hot
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink onClick={() => props.handleCatChange(1)}>
        Earn TSA
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink onClick={() => props.handleCatChange(2)}>
        TSA Staking
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink onClick={() => props.handleCatChange(3)}>
        NFT Pool
      </StyledLink>
      <StyledLink style={{padding:"0 14px"}}> </StyledLink>
      <StyledLink onClick={() => props.handleCatChange(4)}>
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
  max-width: 1270px;
  margin:0 auto;
  // margin-top: 20px;
  flex-wrap: wrap;
  ${MEDIA_QUERY.sm}{
    margin-top: 10px;
  }
`

const StyledLink = styled.span`
  color: #7f7f7f;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`

export default Nav
