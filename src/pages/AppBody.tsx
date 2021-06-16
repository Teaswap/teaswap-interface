import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERY } from '../constants/style'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 350px;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
      border-radius: 0px;
  padding: 1rem;
  ${MEDIA_QUERY.sm} {
    width: 80%;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
