// import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'
// import BestswapBackground from '../assets/images/bestswap-bg.png'
// import yun from '../assets/images/yun.png'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#000000' : '#000000',
    text2: darkMode ? '#565A69' : '#565A69',
    text3: darkMode ? '#474747' : '#474747',
    text4: darkMode ? '#C3C5CB' : '#C3C5CB',
    text5: darkMode ? '#7f7f7f' : '#7f7f7f',

    // backgrounds / greys
    bg1: darkMode ? '#FFFFFF' : '#FFFFFF',
    bg2: darkMode ? '#F7F8FA' : '#F7F8FA',
    bg3: darkMode ? '#EDEEF2' : '#EDEEF2',
    bg4: darkMode ? '#CED0D9' : '#CED0D9',
    bg5: darkMode ? '#888D9B' : '#888D9B',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#949494' : '#949494',
    primary2: darkMode ? '#FFE08C' : '#FFE08C',
    primary3: darkMode ? '#F2CB61' : '#F2CB61',
    primary4: darkMode ? '#FFE08C' : '#FFE08C',
    primary5: darkMode ? '#FAECC5' : '#FAECC5',

    // color text
    primaryText1: darkMode ? '#949494' : '#949494',

    // secondary colors
    secondary1: darkMode ? '#FFBB00' : '#FFBB00',
    secondary2: darkMode ? '#FFE08C' : '#FFE08C',
    secondary3: darkMode ? '#FAECC5' : '#FAECC5',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green: '#60a7ac',
    green1: '#fe4000',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5',
    subtitle: '#474747',
    lightGray: '#cccccc',
    gray: '#7f7f7f',
    darkGray: '#474747'

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
    primaryBtn: css`
      width: 120px;
      height: 40px;
      color: #474747;
      border: 1px solid #474747;
      text-align: center;
      line-height: 40px;
      display: block;
      font-size: 16px;
      :hover{
        background: #7f7f7f;
        color: #ffffff;
      }
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'gray'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  green(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'#60a7ac'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Noto Sans TC', "sans-serif normal", 'Helvetica Neue', 'Adobe Garamond W08','adobe-garamond-pro','AGaramondPro-Regular','Times New Roman','Times','serif' ;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Noto Sans TC', "sans-serif normal", 'Helvetica Neue', 'Adobe Garamond W08','adobe-garamond-pro','AGaramondPro-Regular','Times New Roman','Times','serif' ;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  // box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  background-color: #5E5E5E;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
import './font-family.css'
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}
body {
  min-height: 100vh;
  background-color: #FFFFFF;
  background-size: 
  auto 20px,
  auto 20px,
  auto 38px,
  auto 42px,
  auto 20px,
  auto 20px,
  auto 20px,
  auto 42px;
  background-position: 
  20px 200px,
  200px 360px,
  0 600px,
  140px 900px,
  100% 100px,
  calc(100% - 60px) 300px,
  calc(100% - 170px) 470px,
  calc(100% - 40px) 700px;
  background-repeat: no-repeat;
 
}
`
