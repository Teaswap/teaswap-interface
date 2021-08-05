import { Interface } from '@ethersproject/abi'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as STAKING_REWARDS_FACTORY_ABI } from '@uniswap/liquidity-staker/build/StakingRewardsFactory.json'
import {abi as IFO_ABI} from './ifo.json'
import {abi as NFTSTAKE_REWARDS_ABI} from './NFTStakeRewards.json'

const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI)

const STAKING_REWARDS_FACTORY_INTERFACE = new Interface(STAKING_REWARDS_FACTORY_ABI)

const IDO_ABI_INTERFACE = new Interface(IFO_ABI)

const NFTSTAKE_ABI_INTERFACE = new Interface(NFTSTAKE_REWARDS_ABI)

export { STAKING_REWARDS_FACTORY_INTERFACE, STAKING_REWARDS_INTERFACE,IDO_ABI_INTERFACE,NFTSTAKE_ABI_INTERFACE }
