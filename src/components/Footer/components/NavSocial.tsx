import React from 'react'
import styled from 'styled-components'

import twitterIcon from '../../../assets/images/twitter_icon.png';
import telegramIcon from '../../../assets/images/telegram_icon.png';
import insgramIcon from '../../../assets/images/instgram_icon.png';
import icashIcon from '../../../assets/images/icashrewards.png';
import linkTrIcon from '../../../assets/images/linktr_icon.png';
import { MEDIA_QUERY } from '../../../constants/style';

const NavSocial: React.FC = () => {
  return (
    <StyledNav>

      <StyledLink target="_blank" href="https://twitter.com/ArtTeaswap">
        <img src={twitterIcon}  width="31" height="31" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://t.me/icashrewards123">
        <img src={telegramIcon}  width="31" height="31" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://www.instagram.com/tsa.nft/">
        <img src={insgramIcon}  width="31" height="31" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://bit.ly/2zaJE39">
        <img src={icashIcon}  width="31" height="31" />
      </StyledLink>
      <StyledLink style={{padding:"0 4px"}}> </StyledLink>
      <StyledLink target="_blank" href="https://linktr.ee/teaswap">
        <img src={linkTrIcon}  width="31" height="31" />
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
  margin-top: 29px;
  ${MEDIA_QUERY.sm} {
   // width: 200px;
   display: inline-block;
    text-align: center;
  }
  
`

const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
`

export default NavSocial
