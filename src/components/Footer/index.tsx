import React from 'react'
import styled from 'styled-components'
import Nav from './components/Nav'
import Logo from '../../assets/images/teaswap-logo.png'
import NavSocial from './components/NavSocial'


const Footer: React.FC = () => {

  return (
    <StyledFooter>
      <StyledFooterInner>
        <StyledFooterItem style={{ marginBottom: 20, width: '150px', textAlign: 'left' }}>
          <img height="30px" style={{ marginTop: -8 }} src={Logo} alt="logo" />
          <StyledFooterItemTitle>© 2021 TEAsWAP</StyledFooterItemTitle>
          <StyledLink  target="_blank" href={'mailto:support@teaswap.art'}>support@teaswap.art</StyledLink>
        </StyledFooterItem>
        <StyledFooterItem>
          <Nav />
          <NavSocial />
        </StyledFooterItem>
      </StyledFooterInner>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  width: 100%;
  background: #474747;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding-bottom: 40px;
  `}
`
const StyledFooterInner = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 11px 15px 34px;
  box-sizing: border-box;
`

const StyledFooterItem = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
`
const StyledFooterItemTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  min-width: 100px;
  margin-top: 22px;
`
const StyledLink = styled.a`
  color: ${({ theme }) => theme.bg2};
  text-decoration: none;
  font-size: 10px;
  font-weight: 
  font-weight: 500;
  @media (max-width: 540px) {
    padding-right: 16px;
  }
`

export default Footer
