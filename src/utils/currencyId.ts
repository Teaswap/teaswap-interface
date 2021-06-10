import {ChainId, Currency, ETHER, Token} from '@teaswap/uniswap-sdk'
import {PAYABLEETH} from "../constants";

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'BNB'
  if (currency === PAYABLEETH[ChainId.BSC_MAINNET]) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
