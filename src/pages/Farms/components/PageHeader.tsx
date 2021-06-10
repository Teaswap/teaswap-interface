import React from 'react'
import styled from 'styled-components'

import Container from '../../../components/Container'

interface PageHeaderProps {
  icon?: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        {icon && <StyledIcon>{icon}</StyledIcon>}
        {title && <StyledTitle>{title}</StyledTitle>}
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 48px;
  padding-top: 48px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.bg5};
  font-size: 25px;
  font-weight: 700;
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif, 'Adobe Garamond W08','adobe-garamond-pro','AGaramondPro-Regular','Times New Roman','Times','serif'  ;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${({ theme }) => theme.bg5};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
