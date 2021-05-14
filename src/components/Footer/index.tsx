import React from 'react'
import styled from 'styled-components'
import Nav from './components/Nav'
import Logo from '../../assets/images/teaswap-logo.png'
import NavSocial from './components/NavSocial'
import { MEDIA_QUERY } from '../../constants/style'


const Footer: React.FC = () => {

  return (
    <StyledFooter>
      <StyledFooterInner>
        <StyledFooterItemLeft style={{ marginBottom: 20, width: '150px', textAlign: 'left' }}>
          <img height="30px" style={{ marginTop: -8 }} width="86" src={Logo} alt="logo" />
          <StyledFooterItemTitle>© 2021 TEAsWAP</StyledFooterItemTitle>
          {/* <StyledLink  target="_blank" href={'mailto:support@teaswap.art'}>support@teaswap.art</StyledLink> */}
        </StyledFooterItemLeft>
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
  background: #7f7f7f;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding-bottom: 40px;
  `} 
`
const StyledFooterInner = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 60px 15px 54px;
  box-sizing: border-box;
`

const StyledFooterItemLeft = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
  ${MEDIA_QUERY.sm} {
    display: none;
  }
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
// const StyledLink = styled.a`
//   color: ${({ theme }) => theme.bg2};
//   text-decoration: none;
//   font-size: 10px;
//   font-weight: 
//   font-weight: 500;
//   @media (max-width: 540px) {
//     padding-right: 16px;
//   }
// `

export default Footer
