import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MEDIA_QUERY } from '../../../constants/style'

const Nav: React.FC = () => {
  return (
    <StyledNav>
       <StyledNavLink to="/swap">
        Swap
      </StyledNavLink>
      <StyledLinkSep />
      <StyledNavLink to="/staking">
        Stake
      </StyledNavLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href="https://teaswap.myshopify.com/">
        Shop
      </StyledLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href="https://www.teaswap.live/info">
        Info
      </StyledLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href={'https://www.teaswap.live/news'}>
        News
      </StyledLink>
      <StyledLinkSep />
      <StyledLink target="_blank" href={'mailto:support@teaswap.art'}>
        Contact
      </StyledLink>
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
  margin-right: 20px;
  flex-wrap: wrap;
`
const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 34px;
`
const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 34px;
`
const StyledLinkSep = styled.span`
  padding: 0 12px;
  ${MEDIA_QUERY.sm} {
    padding: 0 6px;
  }
`

export default Nav
