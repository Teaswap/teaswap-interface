import { ChainId, JSBI, Percent, Token, WETH } from "@teaswap/uniswap-sdk";
import { AbstractConnector } from "@web3-react/abstract-connector";

import {
  fortmatic,
  injected,
  portis,
  walletconnect,
  walletlink,
  bsc,
} from "../connectors";

// export const ROUTER_ADDRESS = '0xDB7ef44D6689B7C74FdA0C2dD468e2FfD5E78bb2'

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ROUTER_ADDRESS = "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin"
);
export const USDC = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC",
  "USD//C"
);
export const USDT = new Token(
  ChainId.MAINNET,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  6,
  "USDT",
  "Tether USD"
);
export const COMP = new Token(
  ChainId.MAINNET,
  "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  18,
  "COMP",
  "Compound"
);
export const MKR = new Token(
  ChainId.MAINNET,
  "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  18,
  "MKR",
  "Maker"
);
export const AMPL = new Token(
  ChainId.MAINNET,
  "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
  9,
  "AMPL",
  "Ampleforth"
);
export const WBTC = new Token(
  ChainId.MAINNET,
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  18,
  "WBTC",
  "Wrapped BTC"
);
export const PAYABLEETH: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    ZERO_ADDRESS,
    18,
    "ETH",
    "Ether"
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    ZERO_ADDRESS,
    18,
    "ETH",
    "Ether"
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    ZERO_ADDRESS,
    18,
    "ETH",
    "Ether"
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, ZERO_ADDRESS, 18, "ETH", "Ether"),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, ZERO_ADDRESS, 18, "ETH", "Ether"),
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET,
    ZERO_ADDRESS,
    18,
    "BNB",
    "BNB"
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    ZERO_ADDRESS,
    18,
    "BNB",
    "BNB"
  ),
  [ChainId.POLYGON]: new Token(
    ChainId.POLYGON,
    ZERO_ADDRESS,
    18,
    "MATIC",
    "MATIC"
  ),
};
// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7;

export const GOVERNANCE_ADDRESS = "0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F";

const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    UNI_ADDRESS,
    18,
    "UNI",
    "Uniswap"
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    UNI_ADDRESS,
    18,
    "UNI",
    "Uniswap"
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    UNI_ADDRESS,
    18,
    "UNI",
    "Uniswap"
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET,
    "0x5f99acf13caff815dd9cb4a415c0fb34e9f4545b",
    18,
    "TSA",
    "TEAsWap.ART"
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    "0x36eb1b02cB7Be3ffA1eE7Bd2A3c7D036002730F7",
    18,
    "BEST",
    "Bestswap"
  ),
  [ChainId.POLYGON]: new Token(
    ChainId.POLYGON,
    ZERO_ADDRESS,
    18,
    "BEST",
    "Bestswap"
  ),
};

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "0x090D4613473dEE047c3f2706764f49E0821D256e",
  [ChainId.BSC_MAINNET]: "0x0dbB2879DC1493A6d43Aed62Cd8A48a83459EB8a",
};

export const NFTFACTORY: { [chainId in ChainId]?: string } = {
  [ChainId.BSC_MAINNET]: "0x11f611A84e2DAd9445bd2eFfA3680C8A6e5f05b0",
};

export const NFTEXCHANGE: { [chainId in ChainId]?: string } = {
  [ChainId.BSC_MAINNET]: "0xc5377314018C3f0d35c4efC25F3895D480174f78",
};
//0x2B26ce125e7B817d5e94801d88b04F9fb767bA6E
//0x56f1C01A4784914BAF0E77ca834a623c12663B03
//0xf11f8eab67334a3e4d464dE7613D55b564C24F67
//0x50F1DE017f1Dd26d12B93471574F88E82B6007B1
//0x35026E7EA11824c832D9C73449dd333cBcd1c674
//0xe38924646842F252c8C76Ebc09208F3c2e478E90
//0xb0AEB3b4C1CDf40Bc05Dc232073634d08de72060   0.01BNB
//0x4ebf158511bb844d3c827d71d519637479942ac4   0BNB
//0x236b4961D3fE0D16aa021CaA394d5F32273e3521 new
//0xFEf9247041A508cfaFa07ac895BCB285DF47A79A 有钱

export const USDT_TSA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xcedeebd6127b65bb4b56d86b92eb4dd9bf28988a",
  18,
  "TSA_USDT BLP",
  "USDT_TSA BakeryLP"
);

export const BTC_TSA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x17cc384dc8057ef2d06ee2e9c5102cba1118971a",
  18,
  "BTC_TSA BLP",
  "BTC_TSA BakeryLP"
);

export const BNB_CJAI_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xfa833a21c87856cf1c853e131bae0d6fc71fe5f8",
  18,
  "BNB_CJAI BLP",
  "BNB_CJAI BakeryLP"
);

export const BNB_LOT_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x56d01ce3ba0425b4cdfe8ac17ed890f0da760205",
  18,
  "BNB_LOT BLP",
  "BNB_LOT BakeryLP"
);

export const GensisNFT = new Token(
  ChainId.BSC_MAINNET,
  "0x69eF3AeE75113BE968790883B0B91d7D0989309b",
  0,
  "Genesis NFT",
  "Genesis Collection"
);

export const TSAMetaPlay = new Token(
  ChainId.BSC_MAINNET,
  "0x82cD666cfB435CCD5bD75D66cdB5d68343CC579F",
  0,
  "MetaPlay NFT",
  "TSA MetaPlay Collection"
);

export const TSAMembership = new Token(
  ChainId.BSC_MAINNET,
  "0xe378d5c0aac7ed8b8ad06367c6aefe16c8c8cf77",
  0,
  "TSA Membership NFT",
  "tsamembership30 Collection"
)
export const PenguinPunksCollection = new Token(
  ChainId.BSC_MAINNET,
  "0x325Cc08b140B643B1e23c50973Cd85f511Cc6D51",
  0,
  "PenguinPunks NFT",
  "PenguinPunks Collection"
);

;

export const TSAMetaverseAvatar = new Token(
  ChainId.BSC_MAINNET,
  "0xe2F923b956B53b9D94d5aDEB7e5aD9B108c00309",
  0,
  "TSANFT Avatar",
  "TSA Metaverse Avatar Collection"
);

export const PenguinPunks = new Token(
  ChainId.BSC_MAINNET,
  "0x325Cc08b140B643B1e23c50973Cd85f511Cc6D51",
  0,
  "Penguin Punks NFT",
  "Penguin Punks Collection"
);

export const NorseMythology = new Token(
  ChainId.BSC_MAINNET,
  "0x6eB9D382f569715f098Cf2c144be2A087ce4bc45",
  0,
  "NorseMythology NFT",
  "NorseMythology Collection"
);

export const TSANFTMetaverseII = new Token(
  ChainId.BSC_MAINNET,
  "0x8DB099F2D73016CFBDaC978BC21E5470e7fBAaa0",
  0,
  "TSANFT Metaverse II",
  "TSA HolderHFT Collection"
);

export const TSAMetaverse = new Token(
  ChainId.BSC_MAINNET,
  "0x1aa3DfE63CDad8A66fCEb00FBC99b29a9f956ed8",
  0,
  "TSANFT Metaverse",
  "TSANFT Metaverse Collection"
);

export const TSALOTNFT = new Token(
  ChainId.BSC_MAINNET,
  "0x057a1Bd7A6C87Ec2E483667126FAEaE3C18cE8E2",
  0,
  "TSALOT NFT",
  "TSA Metaverse LOT Collection"
);

export const ShihCryptoPunk = new Token(
  ChainId.BSC_MAINNET,
  "0xa0fa21d79c48B2c4A03c5e717e84C18D07C547E5",
  0,
  "Shih CryptoPunk NFT",
  "Shih CryptoPunk Collection"
);

export const BNB_BUSD_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x559e3d9611e9cb8a77c11335bdac49621382188b",
  18,
  "BNB-BUSD BLP",
  "BNB_BUSD_BakeryLP"
);

export const BNB_ETH_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xa50b9c5DB61C855D5939aa1a66B26Df77745809b",
  18,
  "BNB-ETH BLP",
  "BNB_ETH_BakeryLP"
);

export const BNB_WBTC_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x58521373474810915b02FE968D1BCBe35Fc61E09",
  18,
  "BNB-BTCB BLP",
  "BNB_BTCB_BakeryLP"
);

export const ETH_TSA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xc31173132a36c2453693d9e46d776d4b669b158f",
  18,
  "ETH_TSA BLP",
  "ETH_TSA BakeryLP"
);

export const BNB_BAKE_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xc2eed0f5a0dc28cfa895084bc0a9b8b8279ae492",
  18,
  "BNB-BAKE BLP",
  "BNB_BAKE_BakeryLP"
);

export const BNB_SHIH_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x2a97f25152032b68ce1e38b8f0c12405cae4f628",
  18,
  "BNB-SHIH BLP",
  "BNB_SHIH_BakeryLP"
);

export const BNB_TSA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xab8f32d5e14d84b21befe0cc57b63e086af558e1",
  18,
  "BNB-TSA BLP",
  "BNB_TSA_BakeryLP"
);

export const TSA_RACA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x6a150ac32b9019ca1b7ba8d0e19a73b976890ce0",
  18,
  "TSA-RACA BLP",
  "TSA_RACA_BakeryLP"
);

export const BUSD_SHIH_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x1692b78116352fc8f11838a61a115b0ba0e6a88d",
  18,
  "BUSD-SHIH BLP",
  "BUSD_SHIH_BakeryLP"
);

export const USDT_SHIH_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x25b0d63f06ae5103a4710b009c7e26c8ca149e16",
  18,
  "USDT_SHIH BLP",
  "USDT_SHIH_BakeryLP"
);

export const TSA_SHIB_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x3596048e577a5c1342b466cd5f4b0329e42cc69e",
  18,
  "TSA_SHIB BLP",
  "TSA_SHIB_BakeryLP"
);

export const TSA_SHIH_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xac260f8ff6eca1da77d0ca18120acc46bdcb4049",
  18,
  "TSA_SHIH BLP",
  "TSA_SHIH_BakeryLP"
);

export const TSA_BAKE_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x5df97c1666ac2268f4af5ca84b64eb28ae25bad6",
  18,
  "TSA_BAKE BLP",
  "TSA_BAKE_BakeryLP"
);

export const TSA_DOGE_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x350bed8350905a9fae538ece34476b009a677b88",
  18,
  "TSA_DOGE BLP",
  "TSA_DOGE_BakeryLP"
);

export const TSA_BUSD_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x8dD10e4f461c37a8c7CB16715c2980B31A292a1b",
  18,
  "TSA_BUSD BLP",
  "TSA_BUSD_BakeryLP"
);

export const TSA_FLOKI_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xc11b1e49da84612615b9ef46670704fce899fb58",
  18,
  "TSA_FLOKI BLP",
  "TSA_FLOKI_BakeryLP"
);

export const TSA_CAKE_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x451480148483867e7c53f22bbe78eb3a2192a257",
  18,
  "TSA_CAKE BLP",
  "TSA_CAKE_BakeryLP"
);

export const ICASH_BUSD_LP = new Token(
  ChainId.BSC_MAINNET,
  "0xa8a1cee15c15a68036c7e652f764ef4f33d62ff4",
  18,
  "ICASH_BUSD BLP",
  "ICASH_BUSD_BakeryLP"
);

export const MATIC_TSA_LP = new Token(
  ChainId.BSC_MAINNET,
  "0x94341c7fd36cab09a1ff2c055dbfc187a977651f",
  18,
  "MATIC_TSA BLP",
  "MATIC_TSA_BakeryLP"
);

export const B_DAI = new Token(
  ChainId.BSC_MAINNET,
  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  18,
  "DAI",
  "Dai Token"
);
export const BUSD = new Token(
  ChainId.BSC_MAINNET,
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  18,
  "BUSD",
  "BUSD Token"
);

export const CAKE = new Token(
  ChainId.BSC_MAINNET,
  "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
  18,
  "Cake",
  "PancakeSwap Token"
);

export const BETH = new Token(
  ChainId.BSC_MAINNET,
  "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  18,
  "BETH",
  "Binance-Peg Ethereum Token"
);

export const DOGE = new Token(
  ChainId.BSC_MAINNET,
  "0xba2ae424d960c26247dd6c32edc70b295c744c43",
  8,
  "DOGE",
  "Binance-Peg Dogecoin"
);

export const SHIB = new Token(
  ChainId.BSC_MAINNET,
  "0x2859e4544c4bb03966803b044a93563bd2d0dd4d",
  18,
  "SHIB",
  "Shiba Inu"
);

export const SHIH = new Token(
  ChainId.BSC_MAINNET,
  "0x36ac9eaf028c175d62e086945862924e4ba7516f",
  18,
  "Shih",
  "Shih Tzu"
);

export const DOGGY = new Token(
  ChainId.BSC_MAINNET,
  "0x74926b3d118a63f6958922d3dc05eb9c6e6e00c6",
  18,
  "DOGGY",
  "DOGGY"
);

export const TSALOT = new Token(
  ChainId.BSC_MAINNET,
  "0x1729552618376F8a179c0F61F9FE789C77b230FE",
  18,
  "LOT",
  "TSA Lot"
);

export const SAFEMOON = new Token(
  ChainId.BSC_MAINNET,
  "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3",
  9,
  "SAFEMOON",
  "SafeMoon"
);

export const BAKE = new Token(
  ChainId.BSC_MAINNET,
  "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
  18,
  "BAKE",
  "BakeryToken"
);

export const ICASH = new Token(
  ChainId.BSC_MAINNET,
  "0x3668a68140a103947c83ef43333fe4711d59ba9f",
  18,
  "iCash",
  "iCashToken.io"
);

export const SATO = new Token(
  ChainId.BSC_MAINNET,
  "0xf6e6892325a74383a70570f1ebea9a476483a611",
  18,
  "SATO",
  "Super Algorithmic Token"
);

export const CJAI = new Token(
  ChainId.BSC_MAINNET,
  "0x26c1a317c4cdea9408bf9a82b4c7645bffdfea21",
  18,
  "CJAI",
  "CaoJunNFT"
);

export const B_USDT = new Token(
  ChainId.BSC_MAINNET,
  "0x55d398326f99059fF775485246999027B3197955",
  18,
  "USDT",
  "Tether USD"
);

export const T_DAI = new Token(
  ChainId.BSC_TESTNET,
  "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
  18,
  "DAI",
  "Dai Token"
);
export const T_BUSD = new Token(
  ChainId.BSC_TESTNET,
  "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  6,
  "BUSD",
  "BUSD Token"
);
export const T_USDT = new Token(
  ChainId.BSC_TESTNET,
  "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
  6,
  "USDT",
  "Tether USD"
);

export const BBBPENGUIN = new Token(
  ChainId.BSC_MAINNET,
  "0x68caacEEf02723f5589490128a25f0bDE9cd5b47",
  0,
  "BBBPENGUIN",
  "Binance NFT Blind Box- Penguin"
);

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC_MAINNET]: [WETH[ChainId.BSC_MAINNET]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
  [ChainId.POLYGON]: [WETH[ChainId.BSC_MAINNET]],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [
    ...WETH_ONLY[ChainId.MAINNET],
    DAI,
    USDC,
    USDT,
    COMP,
    MKR,
  ],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    B_DAI,
    BUSD,
    B_USDT,
  ],
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
} = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]],
  },
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    B_USDT,
    BUSD,
    B_DAI,
  ],
  [ChainId.BSC_TESTNET]: [
    ...WETH_ONLY[ChainId.BSC_TESTNET],
    T_USDT,
    T_BUSD,
    T_DAI,
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    B_USDT,
    BUSD,
    B_DAI,
  ],
  [ChainId.BSC_TESTNET]: [
    ...WETH_ONLY[ChainId.BSC_TESTNET],
    T_USDT,
    T_BUSD,
    T_DAI,
  ],
};

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][];
} = {
  [ChainId.MAINNET]: [
    [
      new Token(
        ChainId.MAINNET,
        "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
        8,
        "cDAI",
        "Compound Dai"
      ),
      new Token(
        ChainId.MAINNET,
        "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
        8,
        "cUSDC",
        "Compound USD Coin"
      ),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    iconName: "arrow-right.svg",
    description: "Injected web3 provider.",
    href: null,
    color: "#010101",
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  BINANCE_WALLET: {
    connector: bsc,
    name: "BinanceWallet",
    iconName: "binanceWallet.png",
    description: "Connect to Binance Wallet",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    iconName: "walletConnectIcon.svg",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: "Coinbase Wallet",
    iconName: "coinbaseWalletIcon.svg",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
  },
  COINBASE_LINK: {
    name: "Open in Coinbase Wallet",
    iconName: "coinbaseWalletIcon.svg",
    description: "Open in Coinbase Wallet app.",
    href: "https://go.cb-w.com/mtUDhEZPy1",
    color: "#315CF5",
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: fortmatic,
    name: "Fortmatic",
    iconName: "fortmaticIcon.png",
    description: "Login using Fortmatic hosted wallet",
    href: null,
    color: "#6748FF",
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: "Portis",
    iconName: "portisIcon.png",
    description: "Login using Portis hosted wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
};

export const tokenOptions = [
  { id: "1", name: "BNB", value: ZERO_ADDRESS },
  { id: "2", name: "BUSD", value: BUSD.address },
  { id: "3", name: "TSA", value: UNI[ChainId.BSC_MAINNET].address },
  { id: "6", name: "ETH", value: BETH.address },
  { id: "4", name: "Shih", value: SHIH.address },
  { id: "5", name: "CJAI", value: CJAI.address },
  { id: "7", name: "LOT", value: TSALOT.address },
  { id: "8", name: "ICASH", value: ICASH.address },
];

export const NetworkContextName = "NETWORK";

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

export const BIG_INT_ZERO = JSBI.BigInt(0);

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100),
  BIPS_BASE
); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300),
  BIPS_BASE
); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500),
  BIPS_BASE
); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500),
  BIPS_BASE
); // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(
  JSBI.BigInt(10),
  JSBI.BigInt(16)
); // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(
  JSBI.BigInt(75),
  JSBI.BigInt(10000)
);
