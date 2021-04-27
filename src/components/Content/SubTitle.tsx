import React from 'react'
import styled from 'styled-components'

const Title = styled.span`
  color: #474747;
  font-size: 15px;
  margin-bottom: 10px;
`

// eslint-disable-next-line react/prop-types
export default function ConSubTitle({ con }: { con: string }) {
  return (
      <Title> {con} </Title>
  )
}
