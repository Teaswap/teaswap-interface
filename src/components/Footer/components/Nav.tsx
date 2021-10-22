import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MEDIA_QUERY } from '../../../constants/style'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledNavLink to="/staking">
        Stake
      </StyledNavLink>
      <StyledLinkSep />
       <StyledNavLink to="/swap">
        Swap
      </StyledNavLink>
      <StyledLinkSep />
      {/* <StyledLink target="_blank" href="https://teaswap.myshopify.com/">
        Shop
      </StyledLink> */}
      {/* <StyledLinkSep /> */}
      <StyledLink target="_blank" href="https://www.teaswap.live/info">
        Info
      </StyledLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href={'https://www.teaswap.live/news'}>
        News
      </StyledLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href="https://www.teaswap.live/contact">
        Contact
      </StyledLink>
      {/* </StyledNav>{'mailto:support@teaswap.art'}> */}
      {/* <StyledLink target="_blank" href="https://t.me/bestswap_com">
        Announcement
      </StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -10px;
  margin-right: 20px;
  flex-wrap: wrap;
  ${MEDIA_QUERY.sm} {
    width: 300px;
    margin-top: -10px;
  }
`
const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
`
const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
`
const StyledLinkSep = styled.span`
  padding: 0 16px;
  ${MEDIA_QUERY.sm} {
    padding: 0 12px;
  }
`

export default Nav
