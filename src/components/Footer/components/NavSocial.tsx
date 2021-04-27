import React from 'react'
import styled from 'styled-components'

import twitterIcon from '../../../assets/images/twitter_icon.webp';
import telegramIcon from '../../../assets/images/telegram_icon.webp';
import insgramIcon from '../../../assets/images/instgram_icon.webp';
import icashIcon from '../../../assets/images/icashrewards.webp';
import linkTrIcon from '../../../assets/images/linktr_icon.webp';

const NavSocial: React.FC = () => {
  return (
    <StyledNav>

      <StyledLink target="_blank" href="https://twitter.com/ArtTeaswap">
        <img src={twitterIcon} width="21" height="21" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://www.tumblr.com/">
        <img src={telegramIcon} width="21" height="21" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://www.instagram.com/artteaswap/">
        <img src={insgramIcon} width="21" height="21" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://icashrewards.ca/">
        <img src={icashIcon} width="21" height="21" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://linktr.ee/teaswap">
        <img src={linkTrIcon} width="21" height="21" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      {/* <StyledLink target="_blank" href="https://t.me/bestswap_com">
        Announcement
      </StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: flex-end;;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 16px;
`

const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
`

export default NavSocial
