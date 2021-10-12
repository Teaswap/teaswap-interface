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
          <img height="40px" style={{ marginTop: -8 }} width="" src={Logo} alt="logo" />
          <StyledFooterSmallItemTitle>The One Hub for NFT Creators and Influencers.</StyledFooterSmallItemTitle>
          <StyledFooterItemTitle>© 2021 TSANFT All rights reserved.</StyledFooterItemTitle>
            
          {/* <StyledLink  target="_blank" href={'mailto:support@teaswap.art'}>support@teaswap.art</StyledLink> */}
        </StyledFooterItemLeft>
        <StyledFooterItem>
          <Nav />
          <NavSocial />
         
        </StyledFooterItem>
       
      </StyledFooterInner> 
       {/* <StyledFooterItemDiv  >
          <StyledFooterItemTitle>
            © 2021 TSANFT All rights reserved.
            </StyledFooterItemTitle>
        </StyledFooterItemDiv> */}
    </StyledFooter>
  )
}
// const StyledFooterItemDiv = styled.div`
// width:100%;  
// display: inline-block;
//   vertical-align: down;
// // display: 0 0 100%;
// //   max-width: 100%;
// //   flex-direction: column;
// //   align-items: flex-start;
// //   justify-content: center;
// //   margin: 10px 0;
// //   position: relative;
// //     width: 100%;
// //     min-height: 1px;
// //     padding-right: 15px;
// //     padding-left: 15px;
// `
const StyledFooter = styled.footer`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  width: 100%;
  background: #303030;
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
  ${MEDIA_QUERY.sm} {
    width: 98%;
  }
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
const StyledFooterSmallItemTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  min-width: 220px;
  margin-top: 22px;
  text-align:center;
`

const StyledFooterItemTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  min-width: 170px;
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
