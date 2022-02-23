import {
  ChainId,
  CurrencyAmount,
  JSBI,
  Token,
  TokenAmount,
} from "@teaswap/uniswap-sdk";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  UNI,
  BUSD,
  PAYABLEETH,
  CJAI,
  DOGE,
  // SHIB,
  SHIH,
  ICASH,
  BAKE,
  BNB_BAKE_LP,
  DOGGY,
  SAFEMOON,
  BNB_SHIH_LP,
  BUSD_SHIH_LP,
  B_USDT,
  USDT_SHIH_LP,
  BNB_BUSD_LP,
  BNB_ETH_LP,
  BNB_WBTC_LP,
  BNB_TSA_LP,
  TSA_SHIH_LP,
  // TSA_SHIB_LP,
  TSA_BAKE_LP,
  TSA_DOGE_LP,
  TSA_BUSD_LP,
  USDT_TSA_LP,
  TSA_CAKE_LP,
  ETH_TSA_LP,
  TSALOT,
  TSAMetaverse,
  TSALOTNFT,
  BTC_TSA_LP,
  TSAMetaverseAvatar,
  NorseMythology,
  TSA_RACA_LP,
  CAKE,
  TSANFTMetaverseII,
  TSA_SHIB_LP,
  TSA_FLOKI_LP,
  PenguinPunks,
  TSAMetaPlay,
  MATIC_TSA_LP,
  TSAMembership,
  SHIB,
  PenguinPunksCollection
  // GensisNFT
} from "../../constants";
import {
  IDO_ABI_INTERFACE,
  NFTSTAKE_ABI_INTERFACE,
  STAKING_REWARDS_INTERFACE,
} from "../../constants/abis/staking-rewards";
import { useActiveWeb3React } from "../../hooks";
import {
  NEVER_RELOAD,
  useMultipleContractSingleData,
} from "../multicall/hooks";
import { tryParseAmount } from "../swap/hooks";

export const STAKING_GENESIS = 1620946800;

export const REWARDS_DURATION_DAYS = 60;

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token];
    stakingRewardAddress: string;
    iconUrl: string;
    cate: string;
  }[];
} = {
  [ChainId.BSC_MAINNET]: [
    // {
    //   tokens: [PenguinPunks, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0x64022bB71d9A5BE510837a967f64218B22C29280',
    //   iconUrl: "/TSAPenguinPunks.png",
    //   cate:"NFT"
    // },
    {
      tokens: [PenguinPunksCollection, SHIB],
      stakingRewardAddress: "0xf29766e4f02947a8588d4ed19d0ea701e50b4bce",
      iconUrl: "/penguin-punks_2.gif",
      cate: "NFT",
    },
    {
      tokens: [TSAMembership, SHIB],
      stakingRewardAddress: "0x1B0c0d5B6dA81eeAfeE73F769591fA58525E03C8",
      iconUrl: "/membership.gif",
      cate: "NFT",
    },
    {
      tokens: [PenguinPunks, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xc4D4D745305696B6F1a11968e1EA64B8EC91099c",
      iconUrl: "/penguin punks.gif",
      cate: "NFT",
    },
    {
      tokens: [TSANFTMetaverseII, TSALOT],
      stakingRewardAddress: "0x3741356c5f297834134D7249c0e3d588869a1a94",
      iconUrl: "/metaverse_lot.gif",
      cate: "NFT",
    },
    {
      tokens: [BNB_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x32A06829c06D02ccd6bd75C77EF4E23e14C92891",
      iconUrl: "/TSABNBTSA.png",
      cate: "TSA",
    },

    {
      tokens: [MATIC_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x7D6ba4bd648C8067a4d84A79D7cd8D9d827C772F",
      iconUrl: "/shib_icon.webp",
      cate: "TSA",
    },

    {
      tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xa8e0A6e980ce25FADC2Dca703a71464Af9320E24",
      iconUrl: "/TSA-USDT-TSA.png",
      cate: "TSA",
    },
    // {
    //   tokens: [TSA_BUSD_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0x57C235425b6A352858cA44103EA685AB208120E4",
    //   iconUrl: "/TSA-BUSD-TSA.png",
    //   cate: "TSA",
    // },

    {
      tokens: [TSAMetaPlay, TSALOT],
      stakingRewardAddress: "0xB2413a4BE600394bD5a6F42E003117580b33bA32",
      iconUrl: "/TSALOT.png",
      cate: "NFT",
    },
    {
      tokens: [NorseMythology, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xe263E2f1C7CeF3D290fA3f29117130B9C2842fAC",
      iconUrl: "/NMTSA.png",
      cate: "NFT",
    },
    {
      tokens: [TSAMetaverseAvatar, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x7e175b82F67123454d4Cd5be860Ec0cB684cD92C",
      iconUrl: "/MATSA.png",
      cate: "NFT",
    },
    {
      tokens: [TSAMetaverse, ICASH],
      stakingRewardAddress: "0xD7204007C62Edb5E68ec180527092F345B6c2c3a",
      iconUrl: "/NFT22.png",
      cate: "NFT",
    },
    {
      tokens: [TSALOTNFT, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x69013dF3E6bf8eB4F19ed3b3DF54F24B951B5B10",
      iconUrl: "/NFT23.png",
      cate: "NFT",
    },
    {
      tokens: [TSA_SHIB_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x9dDD67dE8e42255Ab5547F55Ed0AD6832d5649EE",
      iconUrl: "/TSA-SHIB-TSA.png",
      cate: "TSA",
    },
    // {
    //   tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0xa8e0A6e980ce25FADC2Dca703a71464Af9320E24",
    //   iconUrl: "/TSA-USDT-TSA.png",
    //   cate: "TSA",
    // },
    // {
    //   tokens: [TSA_CAKE_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0x4f8659B91fD7A1f928E1F213E1015DCfFf447615",
    //   iconUrl: "/TSA-CAKE-TSA.png",
    //   cate: "TSA",
    // },
    {
      tokens: [TSA_DOGE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x1d02b6De10984b0503c805C483Fda63c3ef0cd10",
      iconUrl: "/TSA-DOGE-TSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_CAKE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x4f8659B91fD7A1f928E1F213E1015DCfFf447615",
      iconUrl: "/TSA-CAKE-TSA.png",
      cate: "TSA",
    },

    {
      tokens: [BNB_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xA1f2Bc4cBB56b02cB1329C8ca633155c02Fc6Cb8",
      iconUrl: "/bnbtsastaketsa.png",
      cate: "TSA",
    },

    //past here
    {
      tokens: [BNB_SHIH_LP, SHIH],
      stakingRewardAddress: "0x4395c1Dc164F3e1B5592D2735b54ef6041F4C64c",
      iconUrl: "/BNBSHIH.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_TSA_LP, CJAI],
      stakingRewardAddress: "0xd17F1294f49659f7E396972Af0065c35F0FB647d",
      iconUrl: "/BNBCJAI.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_TSA_LP, TSALOT],
      stakingRewardAddress: "0x2c9Ff22c9845050F7739CC030D45bd266EB74015",
      iconUrl: "/BNBLOT.png",
      cate: "TSA",
    },

    {
      tokens: [UNI[ChainId.BSC_MAINNET], CJAI],
      stakingRewardAddress: "0xBDa42D3D89fA802402f08e8e878AC43D320c03bb",
      iconUrl: "/TSACJAI.png",
      cate: "CJAI",
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], TSALOT],
      stakingRewardAddress: "0x2A7F95C8a708f88001b3e028310C1678ef5b95a7",
      iconUrl: "/TSA_LOT.png",
      cate: "TSA",
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], ICASH],
      stakingRewardAddress: "0x40A553dD94c3697BD8150f98B9aD8d6b78A02cC6",
      iconUrl: "/TSAICASH.png",
      cate: "ICASH",
    },

    // {
    //   tokens: [TSA_CAKE_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0x4f8659B91fD7A1f928E1F213E1015DCfFf447615",
    //   iconUrl: "/TSA-CAKE-TSA.png",
    //   cate: "TSA",
    // },
    // {
    //   tokens: [TSA_DOGE_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0x1d02b6De10984b0503c805C483Fda63c3ef0cd10",
    //   iconUrl: "/TSA-DOGE-TSA.png",
    //   cate: "TSA",
    // },

    // {
    //   tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0xa8e0A6e980ce25FADC2Dca703a71464Af9320E24",
    //   iconUrl: "/TSA-USDT-TSA.png",
    //   cate: "TSA",
    // },

    {
      tokens: [TSA_BUSD_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x57C235425b6A352858cA44103EA685AB208120E4",
      iconUrl: "/TSA-BUSD-TSA.png",
      cate: "TSA",
    },

    // {
    //   tokens: [TSA_SHIB_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0x9dDD67dE8e42255Ab5547F55Ed0AD6832d5649EE",
    //   iconUrl: "/TSA-SHIB-TSA.png",
    //   cate: "TSA",
    // },
    // {
    //   tokens: [TSA_FLOKI_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: "0xA9D4b720bD372fA4ea501CC034947791F2EE456D",
    //   iconUrl: "/TSA-FLOKI-TSA.png",
    //   cate: "TSA",
    // },

    {
      tokens: [ETH_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x226141bA188cbEd9C8D39c237F29eC3F5bA5A43B",
      iconUrl: "/ETH_TSA_TSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_BUSD_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x38c566a8ab2572f5dcb50699F330D3020ba0013c",
      iconUrl: "/TSA_BUSD_TSA.png",
      cate: "TSA",
    },
    {
      tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xE6307914A93541046be4dACB36E78B162E9d0428",
      iconUrl: "/USDT_TSA_TSA.png",
      cate: "TSA",
    },

    //0x761e061cdec33C7e0F7071854CF41caE718ECBc0
    //0x353E596DB5B84026ba7905D6461CF2fb0604E7AE

    {
      tokens: [BTC_TSA_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x00433e18DC3256d2Dd3702F703EA6355a098B571",
      iconUrl: "/BTCTSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_FLOKI_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xA9D4b720bD372fA4ea501CC034947791F2EE456D",
      iconUrl: "/TSA-FLOKI-TSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_RACA_LP, CAKE],
      stakingRewardAddress: "0x0f9e20D57Ea62Cde88e3076132B6d011eeAA4407",
      iconUrl: "/raca_ckae.png",
      cate: "TSA",
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], TSALOT],
      stakingRewardAddress: "0x00AFAd5f02Dd3F3093c392b6172E7b8109A6F6D8",
      iconUrl: "/TSALOT.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_SHIH_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xF197A37087780f912149bacbffD1E980972bA8c7",
      iconUrl: "/TSA_SHIH_TSA.png",
      cate: "TSA",
    },
    // {
    //   tokens: [TSA_SHIB_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0x8ceF0d0C8286efe7EbD2386031F56BE670178A16',
    //   iconUrl: "/TSA_SHIB_TSA.png",
    //   cate:"TSA"
    // },
    {
      tokens: [TSA_BAKE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x062BC25d301c33B5dEc9D83fa5B4Cc5519746DE8",
      iconUrl: "/TSA_BAKE_TSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_CAKE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xfE74D780C7F636fE6FEa515e8df1499aedf54a35",
      iconUrl: "/TSA_CAKE_TSA.png",
      cate: "TSA",
    },
    {
      tokens: [TSA_DOGE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xD405a51b8e3D77adBe3f4c4fE9104FEecC951B57",
      iconUrl: "/TSA_DOGE_TSA.png",
      cate: "TSA",
    },

    {
      tokens: [UNI[ChainId.BSC_MAINNET], ICASH],
      stakingRewardAddress: "0xaf5e13E7F1DC210EAAaD7C4B87Ea310c84899DAD",
      iconUrl: "/TSA_ICASH.png",
      cate: "ICASH",
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], ICASH],
      stakingRewardAddress: "0x26a346dDbb7ea083c85c696Cfa77F84C8bd4109d",
      iconUrl: "/TSA_ICASH.png",
      cate: "ICASH",
    },
    //   //0x26a346dDbb7ea083c85c696Cfa77F84C8bd4109d
    {
      tokens: [UNI[ChainId.BSC_MAINNET], CJAI],
      stakingRewardAddress: "0x1D4928Aa85e20F70BBc8E95E32F5eAcE1D96A01f",
      iconUrl: "/TSA_CJAI.png",
      cate: "CJAI",
    },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], CJAI],
      stakingRewardAddress: "0x261f94f98327b17649eda469c958deaac4c479d5",
      iconUrl: "/TSA_CJAI.png",
      cate: "CJAI",
    },
    //   //0x261f94f98327b17649eda469c958deaac4c479d5

    {
      tokens: [SHIH, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xB2919b8d401dEA262B1E62876Fa1B7aAc287B05E",
      iconUrl: "/shih_TSA_icon.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_BUSD_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x787B60d70b997Cdae2a4475aeCD4a94E3111c0F7",
      iconUrl: "/BNB_BUSD.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_ETH_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x870c010312AB1914eD3c21C3CdA51f7464f17c13",
      iconUrl: "/BNB_ETH.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_WBTC_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x72318628bBA4Bc395713eE9B0c96b19814d3AeC0",
      iconUrl: "/BNB_WBTC.png",
      cate: "TSA",
    },
    {
      tokens: [B_USDT, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x7964E3aAC5D7E0F4b6d70d9758365fC935EeD17f",
      iconUrl: "/USDT_TSA.png",
      cate: "TSA",
    },
    {
      tokens: [USDT_SHIH_LP, SHIH],
      stakingRewardAddress: "0x7FFCC2AeBE2AC2008D23B23A33A707038a9d0003",
      iconUrl: "/USDT_SHIH.png",
      cate: "TSA",
    },
    {
      tokens: [CJAI, SHIH],
      stakingRewardAddress: "0x46c292ae7946d730F76163DF633578E2dE13049c",
      iconUrl: "/CJAI_SHIH.png",
      cate: "SHIH",
    },
    {
      tokens: [BUSD_SHIH_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x1162f2D625Cb80f713e941d1aC3d7f0D34109aec",
      iconUrl: "/BUSD_shih.png",
      cate: "TSA",
    },
    {
      tokens: [BNB_SHIH_LP, SHIH],
      stakingRewardAddress: "0x5c26Af070A595d779aB14d2dA545409F9aDA598f",
      iconUrl: "/shihbnb_icon.jpeg",
      cate: "SHIH",
    },
    {
      tokens: [SHIH, CJAI],
      stakingRewardAddress: "0xA066432B6f34760b4420C0ff044e8e6D014bCa4b",
      iconUrl: "/shih_icon.jpeg",
      cate: "CJAI",
    },
    {
      tokens: [DOGGY, SHIH],
      stakingRewardAddress: "0xb15C94cb098864951538cDbAb648CaaDf535f899",
      iconUrl: "/doggy_icon.png",
      cate: "SHIH",
    },
    {
      tokens: [SAFEMOON, SHIH],
      stakingRewardAddress: "0x39BaBd84e5815bDEFC26294aDA42b19427083721",
      iconUrl: "/safemoon_icon.png",
      cate: "SHIH",
    },
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0xfE93a00Cf957ba4DC84dF48AC698505e7E17F631",
      iconUrl: "/bnb_icon.webp",
      cate: "TSA",
    },
    // 0xfE93a00Cf957ba4DC84dF48AC698505e7E17F631 stakeBNB()
    // 0xb71fa06476fC11dd160A2D6B06A5B5797C03a096 stake()
    // {
    //   tokens: [USDT_TSA_LP, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress: '0xbD1308B84f0648aa89B7AcB1039767d52CF4Dc17'
    // },

    {
      tokens: [BNB_BAKE_LP, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x7bA8Fd959814b0959573CB4830BF81dbf789396e",
      iconUrl: "/blp_icon.webp",
      cate: "TSA",
    },
    {
      tokens: [BUSD, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x7Cc95C5c821370960865aCf43DebbA42CeC22405",
      iconUrl: "/busd_icon.webp",
      cate: "TSA",
    },
    {
      tokens: [DOGE, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x96c51D3FAb14f27b5D9E45CDB43235d703B5e211",
      iconUrl: "/doge_icon.webp",
      cate: "TSA",
    },
    {
      tokens: [BAKE, UNI[ChainId.BSC_MAINNET]],
      stakingRewardAddress: "0x727408110931e052F112af167722b5f63a0a7E44",
      iconUrl: "/bake_icon.webp",
      cate: "TSA",
    },
    // {
    //   tokens: [SHIB, UNI[ChainId.BSC_MAINNET]],
    //   stakingRewardAddress:'0xF22AF684c4389c7899777660D3ec29b9745C6222',
    //   iconUrl: "/shib_icon.webp",
    //   cate:"TSA"
    //
    // },
    {
      tokens: [UNI[ChainId.BSC_MAINNET], SHIH],
      stakingRewardAddress: "0x667202a1Dc34EFA5f54580C8E69f8128573786f4",
      iconUrl: "/shih_icon.webp",
      cate: "SHIH",
    },
  ],
};

export const IFO_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token];
    idoAddress: string;
  }[];
} = {
  [ChainId.BSC_MAINNET]: [
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      idoAddress: "0x887Ed22FAF9C4B985ecB019eA54A5185350AE214",
    },
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], UNI[ChainId.BSC_MAINNET]],
      idoAddress: "0xF72ECaD992CebB0138aC13b616199f131F847b04",
    },
    {
      tokens: [PAYABLEETH[ChainId.BSC_MAINNET], TSALOT],
      idoAddress: "0x1Ef0d833Ad1b1D76da36bb28bEF37Ee86874571E",
    },
  ],
};

//0xb222571f700a9f0A86a4e70A5dA16d9Da8b9E042
//0x1Ef0d833Ad1b1D76da36bb28bEF37Ee86874571E
//0x171c28cB2E92FdD367d4Dbb46200D9Ad5953a04a
export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string;
  // the tokens involved in this pair
  tokens: [Token, Token];
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount;

  cate: string;
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount;
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount;
  unclaimAmount: TokenAmount;
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount;
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount;
  // when the period ends
  periodFinish: Date | undefined;
  rewardsDuration: number;
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount;
  iconUrl: string;
}

export interface IdoInfo {
  // the address of the reward contract
  idoAddress: string;
  // the tokens involved in this pair
  tokens: [Token, Token];
  // the amount of token currently staked, or undefined if no account
  makeAmount: TokenAmount;
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount;
  claimedAmount: TokenAmount;
  unclaimAmount: TokenAmount;
  // the total amount of token staked in the contract
  totalsupplayAmount: TokenAmount;
  // the amount of token distributed per second to all LPs, constant
  totalSoldAmount: TokenAmount;
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  price: TokenAmount;
  rate: TokenAmount;
  // when the period ends
  periodFinish: Date | undefined;
  rewardsDuration: number;
  // calculates a hypothetical amount of token distributed to the active account per second.
}

export function useStakingInfo(stakingRewardAddress: string): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React();

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(
            (stakingRewardInfo) =>
              stakingRewardInfo.stakingRewardAddress === stakingRewardAddress
          ) ?? []
        : [],
    [chainId, stakingRewardAddress]
  );

  const uni = chainId ? UNI[chainId] : undefined;

  const rewardsAddresses = useMemo(
    () => info.map(({ stakingRewardAddress }) => stakingRewardAddress),
    [info]
  );

  console.log("stakingRewardAddressout:" + stakingRewardAddress);
  console.log("infoout:" + JSON.stringify(info));
  console.log("rewardsAddressesout" + JSON.stringify(rewardsAddresses));

  const accountArg = useMemo(() => [account ?? undefined], [account]);

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(
    rewardsAddresses,
    NFTSTAKE_ABI_INTERFACE,
    "balanceOf",
    accountArg
  );
  const earnedAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    NFTSTAKE_ABI_INTERFACE,
    "earned",
    accountArg
  );
  const unClaimedAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewards",
    accountArg
  );
  const totalSupplies = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "totalSupply"
  );

  // const startTimes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'startTime')
  const rewardsDurations = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewardsDuration"
  );
  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewardRate"
  );
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "periodFinish"
  );

  return useMemo(() => {
    if (!chainId || !uni) return [];

    return rewardsAddresses.reduce<StakingInfo[]>(
      (memo, rewardsAddress, index) => {
        // these two are dependent on account
        const balanceState = balances[index];
        const earnedAmountState = earnedAmounts[index];
        const unclaimedAmountState = unClaimedAmounts[index];

        // these get fetched regardless of account
        const totalSupplyState = totalSupplies[index];
        const rewardRateState = rewardRates[index];
        const periodFinishState = periodFinishes[index];
        // const startTimeState = startTimes[index]
        const rewardsDurationState = rewardsDurations[index];

        if (
          // these may be undefined if not logged in
          !balanceState?.loading &&
          !earnedAmountState?.loading &&
          // always need these
          totalSupplyState &&
          !totalSupplyState.loading &&
          rewardRateState &&
          !rewardRateState.loading &&
          periodFinishState &&
          !periodFinishState.loading &&
          rewardsDurationState &&
          !rewardsDurationState.loading
        ) {
          if (
            balanceState?.error ||
            earnedAmountState?.error ||
            unclaimedAmountState.error ||
            totalSupplyState.error ||
            rewardRateState.error ||
            periodFinishState.error ||
            rewardsDurationState.error
          ) {
            // console.log(balanceState?.error)
            // console.log(earnedAmountState?.error)
            // console.log(unclaimedAmountState.error)
            // console.log(totalSupplyState.error)
            // console.log(rewardRateState.error)
            // console.log(periodFinishState.error)
            // console.log(rewardsDurationState.error)
            console.log("address:" + rewardsAddress);
            console.log("balances:" + JSON.stringify(balances));
            console.log("earnedAmounts:" + JSON.stringify(earnedAmounts));
            console.log("unClaimedAmounts:" + JSON.stringify(unClaimedAmounts));
            console.log("totalSupplies:" + JSON.stringify(totalSupplies));
            console.log("rewardRates:" + JSON.stringify(rewardRates));
            console.log("periodFinishs:" + JSON.stringify(periodFinishes));
            console.error("Failed to load staking rewards info");
            // memo.push({
            //   stakingRewardAddress: rewardsAddress,
            //   tokens: info[index].tokens,
            //   iconUrl: info[index].iconUrl,
            //   cate: info[index].cate,
            //   periodFinish: undefined,
            //   earnedAmount: new TokenAmount(info[index].tokens[1], JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
            //   unclaimAmount:new TokenAmount(info[index].tokens[1], JSBI.BigInt(0)),
            //   rewardRate: new TokenAmount(info[index].tokens[1], JSBI.BigInt(0)),
            //   totalRewardRate: new TokenAmount(info[index].tokens[1], JSBI.BigInt(0)),
            //   stakedAmount: new TokenAmount(info[index].tokens[0], JSBI.BigInt(0)),
            //   totalStakedAmount: new TokenAmount(info[index].tokens[0], JSBI.BigInt(0)),
            //   rewardsDuration: 0,
            //   getHypotheticalRewardRate:(stakedAmount,
            //                              totalStakedAmount,
            //                              totalRewardRate)=>{return new TokenAmount(info[index].tokens[1], JSBI.BigInt(0))}
            // })
            return memo;
          }

          // get the LP token
          const tokens = info[index].tokens;
          //
          // const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
          // //
          // // check for account, if no account set to 0
          //
          // const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
          // const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
          const stakedAmount = new TokenAmount(
            tokens[0],
            JSBI.BigInt(balanceState?.result?.[0] ?? 0)
          );
          const unClaimedAmount = new TokenAmount(
            tokens[1],
            JSBI.BigInt(unclaimedAmountState?.result?.[0] ?? 0)
          );
          const totalStakedAmount = new TokenAmount(
            tokens[0],
            JSBI.BigInt(totalSupplyState.result?.[0])
          );

          const totalRewardRate = new TokenAmount(
            tokens[1],
            JSBI.BigInt(rewardRateState.result?.[0])
          );

          const getHypotheticalRewardRate = (
            stakedAmount: TokenAmount,
            totalStakedAmount: TokenAmount,
            totalRewardRate: TokenAmount
          ): TokenAmount => {
            return new TokenAmount(
              totalRewardRate.token,
              JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
                ? JSBI.divide(
                    JSBI.multiply(totalRewardRate.raw, stakedAmount.raw),
                    totalStakedAmount.raw
                  )
                : JSBI.BigInt(0)
            );
          };

          const individualRewardRate = getHypotheticalRewardRate(
            stakedAmount,
            totalStakedAmount,
            totalRewardRate
          );

          const periodFinishMs = periodFinishState.result?.[0]
            ?.mul(1000)
            ?.toNumber();
          // const startTimeMs = startTimeState.result?.[0]?.mul(1000)?.toNumber()
          const rewardsDuration = rewardsDurationState.result?.[0]?.toNumber();

          memo.push({
            stakingRewardAddress: rewardsAddress,
            tokens: info[index].tokens,
            iconUrl: info[index].iconUrl,
            cate: info[index].cate,
            periodFinish:
              periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
            earnedAmount: new TokenAmount(
              info[index].tokens[1],
              JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)
            ),
            unclaimAmount: unClaimedAmount,
            rewardRate: individualRewardRate,
            totalRewardRate: totalRewardRate,
            stakedAmount: stakedAmount,
            totalStakedAmount: totalStakedAmount,
            rewardsDuration: rewardsDuration,
            getHypotheticalRewardRate,
          });
        }
        return memo;
      },
      []
    );
  }, [
    balances,
    chainId,
    earnedAmounts,
    info,
    periodFinishes,
    rewardRates,
    rewardsAddresses,
    totalSupplies,
    unClaimedAmounts,
    rewardsDurations,
    uni,
  ]);
}

// gets the staking info from the network for the active chain id
export function useAllStakingInfo(): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React();
  const stakingRewardAddress = undefined;
  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter((stakingRewardInfo) =>
            stakingRewardAddress === undefined
              ? true
              : stakingRewardAddress === null
              ? false
              : stakingRewardInfo.stakingRewardAddress === stakingRewardAddress
          ) ?? []
        : [],
    [chainId, stakingRewardAddress]
  );

  const uni = chainId ? UNI[chainId] : undefined;

  const rewardsAddresses = useMemo(
    () => info.map(({ stakingRewardAddress }) => stakingRewardAddress),
    [info]
  );

  // console.log("stakingRewardAddressout:"+stakingRewardAddress)
  // console.log("infoout:"+JSON.stringify(info))
  // console.log("rewardsAddressesout"+JSON.stringify(rewardsAddresses))

  const accountArg = useMemo(() => [account ?? undefined], [account]);

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(
    rewardsAddresses,
    NFTSTAKE_ABI_INTERFACE,
    "balanceOf",
    accountArg
  );
  // console.log(JSON.stringify(balances))
  const earnedAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    NFTSTAKE_ABI_INTERFACE,
    "earned",
    accountArg
  );
  // console.log(JSON.stringify(earnedAmounts))
  const unClaimedAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewards",
    accountArg
  );
  const totalSupplies = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "totalSupply"
  );

  // const startTimes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'startTime')
  const rewardsDurations = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewardsDuration"
  );
  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "rewardRate"
  );
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    "periodFinish"
  );

  return useMemo(() => {
    if (!chainId || !uni) return [];
    // console.log("balances:"+JSON.stringify(balances))
    // console.log("earnedAmounts:"+JSON.stringify(earnedAmounts))
    // console.log("unClaimedAmounts:"+JSON.stringify(unClaimedAmounts))

    return rewardsAddresses.reduce<StakingInfo[]>(
      (memo, rewardsAddress, index) => {
        // these two are dependent on account
        const balanceState = balances[index];
        const earnedAmountState = earnedAmounts[index];
        const unclaimedAmountState = unClaimedAmounts[index];

        // these get fetched regardless of account
        const totalSupplyState = totalSupplies[index];
        const rewardRateState = rewardRates[index];
        const periodFinishState = periodFinishes[index];
        // const startTimeState = startTimes[index]
        const rewardsDurationState = rewardsDurations[index];

        if (
          // these may be undefined if not logged in
          !balanceState?.loading &&
          !earnedAmountState?.loading &&
          // always need these
          totalSupplyState &&
          !totalSupplyState.loading &&
          rewardRateState &&
          !rewardRateState.loading &&
          periodFinishState &&
          !periodFinishState.loading &&
          rewardsDurationState &&
          !rewardsDurationState.loading
        ) {
          if (
            balanceState?.error ||
            earnedAmountState?.error ||
            unclaimedAmountState.error ||
            totalSupplyState.error ||
            rewardRateState.error ||
            periodFinishState.error ||
            rewardsDurationState.error
          ) {
            // console.log(balanceState?.error)
            // console.log(earnedAmountState?.error)
            // console.log(unclaimedAmountState.error)
            // console.log(totalSupplyState.error)
            // console.log(rewardRateState.error)
            // console.log(periodFinishState.error)
            // console.log(rewardsDurationState.error)
            console.log("index:" + index);
            console.log("address:" + rewardsAddress);
            console.log("balances:" + JSON.stringify(balances));
            console.log("earnedAmounts:" + JSON.stringify(earnedAmounts));
            console.log("unClaimedAmounts:" + JSON.stringify(unClaimedAmounts));
            console.log("totalSupplies:" + JSON.stringify(totalSupplies));
            console.log("rewardRates:" + JSON.stringify(rewardRates));
            console.log("periodFinishs:" + JSON.stringify(periodFinishes));
            console.error("Failed to load staking rewards info");

            return memo;
          }

          // get the LP token
          const tokens = info[index].tokens;
          //
          // const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
          // //
          // // check for account, if no account set to 0
          //
          // const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
          // const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
          const stakedAmount = new TokenAmount(
            tokens[0],
            JSBI.BigInt(balanceState?.result?.[0] ?? 0)
          );
          // const stakedAmount = new TokenAmount(tokens[0], JSBI.BigInt(0))

          const unClaimedAmount = new TokenAmount(
            tokens[1],
            JSBI.BigInt(unclaimedAmountState?.result?.[0] ?? 0)
          );
          // const unClaimedAmount = new TokenAmount(tokens[1],JSBI.BigInt( 0))

          const totalStakedAmount = new TokenAmount(
            tokens[0],
            JSBI.BigInt(totalSupplyState.result?.[0])
          );

          const totalRewardRate = new TokenAmount(
            tokens[1],
            JSBI.BigInt(rewardRateState.result?.[0])
          );

          const getHypotheticalRewardRate = (
            stakedAmount: TokenAmount,
            totalStakedAmount: TokenAmount,
            totalRewardRate: TokenAmount
          ): TokenAmount => {
            return new TokenAmount(
              totalRewardRate.token,
              JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
                ? JSBI.divide(
                    JSBI.multiply(totalRewardRate.raw, stakedAmount.raw),
                    totalStakedAmount.raw
                  )
                : JSBI.BigInt(0)
            );
          };

          const individualRewardRate = getHypotheticalRewardRate(
            stakedAmount,
            totalStakedAmount,
            totalRewardRate
          );

          const periodFinishMs = periodFinishState.result?.[0]
            ?.mul(1000)
            ?.toNumber();
          // const startTimeMs = startTimeState.result?.[0]?.mul(1000)?.toNumber()
          const rewardsDuration = rewardsDurationState.result?.[0]?.toNumber();

          memo.push({
            stakingRewardAddress: rewardsAddress,
            tokens: info[index].tokens,
            iconUrl: info[index].iconUrl,
            cate: info[index].cate,
            periodFinish:
              periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
            earnedAmount: new TokenAmount(
              info[index].tokens[1],
              JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)
            ),
            // earnedAmount: new TokenAmount(info[index].tokens[1], JSBI.BigInt(0)),
            unclaimAmount: unClaimedAmount,
            rewardRate: individualRewardRate,
            totalRewardRate: totalRewardRate,
            stakedAmount: stakedAmount,
            totalStakedAmount: totalStakedAmount,
            rewardsDuration: rewardsDuration,
            getHypotheticalRewardRate,
          });
        }
        return memo;
      },
      []
    );
  }, [
    chainId,
    unClaimedAmounts,
    balances,
    earnedAmounts,
    info,
    periodFinishes,
    rewardRates,
    rewardsAddresses,
    totalSupplies,
    uni,
  ]);
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React();
  const uni = chainId ? UNI[chainId] : undefined;
  const stakingInfos = useAllStakingInfo();

  return useMemo(() => {
    if (!uni) return undefined;
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => (accumulator = stakingInfo.earnedAmount),
        new TokenAmount(uni, "0")
      ) ?? new TokenAmount(uni, "0")
    );
  }, [stakingInfos, uni]);
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | CurrencyAmount | undefined,
  isNFT?: boolean
): {
  parsedAmount?: CurrencyAmount;
  error?: string;
} {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();
  console.log("typedValue:" + typedValue);

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    typedValue,
    stakingToken
  );

  const parsedAmount =
    parsedInput &&
    userLiquidityUnstaked &&
    (JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw) || isNFT)
      ? parsedInput
      : undefined;

  let error: string | undefined;
  if (!account) {
    error = t("connectWallet");
  }
  if (!parsedAmount) {
    error = error ?? t("enterAnAmount");
  }

  return {
    parsedAmount,
    error,
  };
}

export function useDerivedIdoInfo(
  typedValue: string,
  makeToken: Token,
  userLiquidityUnstaked: TokenAmount | CurrencyAmount | undefined
): {
  parsedAmount?: CurrencyAmount;
  error?: string;
} {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    typedValue,
    makeToken
  );

  const parsedAmount =
    parsedInput &&
    userLiquidityUnstaked &&
    JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined;

  let error: string | undefined;
  if (!account) {
    error = t("connectWallet");
  }
  if (!parsedAmount) {
    error = error ?? t("enterAnAmount");
  }

  return {
    parsedAmount,
    error,
  };
}

export function useDerivedBidInfo(
  typedValue: string,
  makeToken: Token,
  userLiquidityUnstaked: TokenAmount | CurrencyAmount | undefined
): {
  parsedAmount?: CurrencyAmount;
  error?: string;
} {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    typedValue,
    makeToken
  );

  const parsedAmount =
    parsedInput &&
    userLiquidityUnstaked &&
    JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined;

  console.log("typevalue:" + typedValue);
  console.log("makeToken" + JSON.stringify(makeToken));
  console.log("parsedAmount" + JSON.stringify(parsedAmount));

  let error: string | undefined;
  if (!account) {
    error = t("connectWallet");
  }
  if (!parsedAmount) {
    error = error ?? t("enterAnAmount");
  }

  return {
    parsedAmount,
    error,
  };
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount;
  error?: string;
} {
  const { account } = useActiveWeb3React();
  const { t } = useTranslation();

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    typedValue,
    stakingAmount.token
  );

  const parsedAmount =
    parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw)
      ? parsedInput
      : undefined;

  let error: string | undefined;
  if (!account) {
    error = t("connectWallet");
  }
  if (!parsedAmount) {
    error = error ?? t("enterAnAmount");
  }

  return {
    parsedAmount,
    error,
  };
}

export function useIdoInfo(idoAddress?: string | null): IdoInfo[] {
  const { chainId, account } = useActiveWeb3React();

  const info = useMemo(
    () =>
      chainId
        ? IFO_REWARDS_INFO[chainId]?.filter((idoInfo) =>
            idoAddress === undefined
              ? true
              : idoAddress === null
              ? false
              : idoInfo.idoAddress === idoAddress
          ) ?? []
        : [],
    [chainId, idoAddress]
  );

  const uni = chainId ? UNI[chainId] : undefined;

  const idoAddresses = useMemo(() => info.map(({ idoAddress }) => idoAddress), [
    info,
  ]);

  const accountArg = useMemo(() => [account ?? undefined], [account]);

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "balanceOf",
    accountArg
  );
  const earnedAmounts = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "earned",
    accountArg
  );
  const claimedAmounts = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "rewardPaid",
    accountArg
  );
  const unclaimAmounts = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "rewards",
    accountArg
  );
  const totalSupplies = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "totalSupply"
  );
  const totalMake = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "totalMake"
  );
  const rewardsDurations = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "rewardsDuration"
  );

  // tokens per second, constants
  const price = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "price"
  );

  const rate = useMultipleContractSingleData(
    idoAddresses,
    IDO_ABI_INTERFACE,
    "rewardRate"
  );

  const periodFinishes = useMultipleContractSingleData(
    idoAddresses,
    STAKING_REWARDS_INTERFACE,
    "periodFinish",
    undefined,
    NEVER_RELOAD
  );

  return useMemo(() => {
    if (!chainId || !uni) return [];

    return idoAddresses.reduce<IdoInfo[]>((memo, idoAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index];
      const earnedAmountState = earnedAmounts[index];
      const totalMakeState = totalMake[index];
      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index];
      const rewardRateState = rate[index];
      const priceState = price[index];
      const periodFinishState = periodFinishes[index];
      const claimedAmountState = claimedAmounts[index];
      const unclaimAmountState = unclaimAmounts[index];
      const rewardsDurationState = rewardsDurations[index];

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading &&
        priceState &&
        !priceState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        claimedAmountState &&
        !claimedAmountState.loading &&
        totalMakeState &&
        !totalMakeState.loading &&
        rewardsDurationState &&
        !rewardsDurationState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error ||
          rewardsDurationState.error
        ) {
          console.error("Failed to load staking rewards info");
          return memo;
        }

        // get the LP token
        const tokens = info[index].tokens;
        //
        // const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
        // //
        // // check for account, if no account set to 0
        //
        // const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        // const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const makeAmount = new TokenAmount(
          tokens[0],
          JSBI.BigInt(balanceState?.result?.[0] ?? 0)
        );
        const unclaimAmount = new TokenAmount(
          tokens[1],
          JSBI.BigInt(unclaimAmountState?.result?.[0])
        );
        const totalsupplayAmount = new TokenAmount(
          tokens[0],
          JSBI.BigInt(totalSupplyState.result?.[0])
        );

        const priceAmount = new TokenAmount(
          tokens[0],
          JSBI.BigInt(priceState.result?.[0])
        );
        const rateAmount = new TokenAmount(
          tokens[1],
          JSBI.BigInt(rewardRateState.result?.[0])
        );
        const rewardPaidAmount = new TokenAmount(
          tokens[1],
          JSBI.BigInt(claimedAmountState.result?.[0])
        );
        // const totalMakeAmout = new TokenAmount(tokens[0],JSBI.BigInt(totalMakeState.result?.[0]))
        const totalSoldAmount = new TokenAmount(
          tokens[1],
          JSBI.divide(
            JSBI.multiply(
              JSBI.BigInt(rewardRateState.result?.[0]),
              JSBI.BigInt(totalMakeState.result?.[0])
            ),
            JSBI.BigInt("1000000000000000000")
          )
        );

        //
        // const getHypotheticalRewardRate = (
        //   stakedAmount: TokenAmount,
        //   totalStakedAmount: TokenAmount,
        //   totalRewardRate: TokenAmount
        // ): TokenAmount => {
        //   return new TokenAmount(
        //     uni,
        //     JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
        //       ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
        //       : JSBI.BigInt(0)
        //   )
        // }

        // const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]
          ?.mul(1000)
          ?.toNumber();
        const rewardsDuration = rewardsDurationState.result?.[0].toNumber();

        memo.push({
          idoAddress: idoAddress,
          tokens: info[index].tokens,
          rewardsDuration: rewardsDuration,
          periodFinish:
            periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(
            info[index].tokens[1],
            JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)
          ),
          // rewardRate: individualRewardRate,
          // totalRewardRate: totalRewardRate,
          // stakedAmount: stakedAmount,
          // totalStakedAmount: totalStakedAmount,
          makeAmount: makeAmount,
          unclaimAmount: unclaimAmount,
          claimedAmount: rewardPaidAmount,
          totalsupplayAmount: totalsupplayAmount,
          totalSoldAmount: totalSoldAmount,
          // the current amount of token distributed to the active account per second.
          // equivalent to percent of total supply * reward rate
          price: priceAmount,
          rate: rateAmount,
        });
      }
      return memo;
    }, []);
  }, [
    balances,
    chainId,
    earnedAmounts,
    info,
    periodFinishes,
    price,
    idoAddresses,
    totalSupplies,
    uni,
  ]);
}
