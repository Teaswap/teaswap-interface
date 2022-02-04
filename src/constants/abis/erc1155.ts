import { Interface } from '@ethersproject/abi'
import {abi as ERC1155Collection_ABI} from './ERC1155Collection.json'

const ERC1155Collection_INTERFACE = new Interface(ERC1155Collection_ABI)

export { ERC1155Collection_INTERFACE }