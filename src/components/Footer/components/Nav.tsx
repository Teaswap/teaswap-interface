import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
       <StyledLink target="_blank" href="/swap">
        Swap
      </StyledLink>
      <StyledLink style={{padding:"0 2px"}}>  </StyledLink>
      <StyledLink target="_blank" href="/staking">
        Stake
      </StyledLink>
      <StyledLink style={{padding:"0 2px"}}>  </StyledLink>
      <StyledLink target="_blank" href="https://teaswap.myshopify.com/">
        Shop
      </StyledLink>
      <StyledLink style={{padding:"0 2px"}}>  </StyledLink>
      <StyledLink target="_blank" href="https://www.teaswap.live/info">
        Info
      </StyledLink>
      <StyledLink style={{padding:"0 2px"}}>  </StyledLink>
      <StyledLink target="_blank" href={'https://www.teaswap.live/news'}>
        News
      </StyledLink>
      <StyledLink style={{padding:"0 2px"}}>  </StyledLink>
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
`

const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
`

export default Nav
