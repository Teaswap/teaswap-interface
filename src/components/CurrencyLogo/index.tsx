import { Currency, ETHER, Token } from '@teaswap/uniswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/bnb.svg'
import BLPLogo from '../../assets/images/blp_logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import {  WrappedTokenInfo } from '../../state/lists/hooks'
// import Logo from '../Logo'
import { HOST_URL } from '../../constants/unit'

const getTokenLogoURL = (address: string) =>
  `${HOST_URL}/default-token-list/images/${address}.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`


// const StyledLogo = styled(Logo)<{ size: string }>`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
//   border-radius: ${({ size }) => size};
//   box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
// `

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  // const selectedListInfo = useSelectedListInfo()

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []
    if (currency?.symbol?.includes("BLP")) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency?.symbol?.includes("BLP")){
    return <StyledEthereumLogo src={BLPLogo} size={size} style={style} />
  }

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }
  console.log(srcs)
  // return (<StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />)
  return <StyledEthereumLogo src={srcs[0]} size={size} style={style} />
}
