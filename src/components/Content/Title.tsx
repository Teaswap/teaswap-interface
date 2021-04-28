import React from 'react'
import styled from 'styled-components'

const Title = styled.span`
  color: ${({ theme }) => theme.darkGray};
  font-size: 28px;
  margin-bottom: 20px;
  margin-top: -10px;
`

// eslint-disable-next-line react/prop-types
export default function ConTitle({ con }: { con: string }) {
  return (
    <Title> {con} </Title>
  )
}
