
export interface Farm {
  pid: number,
  name: string
  poolAddress: string,
  stakingToken: string
  stakingTokenAddress: string
  earnToken: string
  earnTokenAddress: string
  id: string
  tokenSymbol: string,
  isWBNB: boolean,
  isLp?: boolean,
  icon: string,
  acceleratorAddress: string,
  nftSymbol: string,
  magnification: number,
}

export interface FarmsContext {
  farms: Farm[]
}
