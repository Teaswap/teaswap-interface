export const COLOR = {
  text_1: '#235474',
  text_2: '#929295',
 // text_2: '#474747',
  text_3: '#54aa98',
  text_alert: '#f44335',
  //hover: '#6dd0cd',
  hover: '#7F7F7F',
  black: '#333333',
  white: '#fff',
  dark_primary: '#00000033',
  light_primary: '#e0e9ef',
  bg_primary: '#fff',
  bg_secondary: '#f7f7f7',
  bg_mask: '#c7c1c178',
  //btn_primary: '#6dd0cd',
  btn_primary: '#7F7F7F',
  btn_secondary: '#dea8a8',
  btn_grey: '#7f7f7f',
  gray: '#7f7f7f',
  cccccc: '#cccccc',
  dark_gray: '#474747'
};

export const FONT = {
  logo: '30px',
  lg: '24px',
  md: '18px',
  sm: '16px',
  xs: '13px',
  xss: '12px',
};

export const DISTANCE = {
  xl: '80px',
  lg: '60px',
  md: '30px',
  sm: '20px',
  xs: '10px',
};

export const MEDIA_QUERY = {
  lg_1: '@media (max-width: 1140px)',
  lg: '@media (max-width: 1000px)',
  md: '@media (max-width: 768px)',
  sm: '@media (max-width: 500px)',
};

export const MEDIA_QUERY_MD = {
  md: '@media screen and (max-width: 768px)',
};

export const EFFECT = {
  shadowDark: `0px 2px 0.5px ${COLOR.dark_primary}`,
  shadowLight: `0px 1px 4px ${COLOR.light_primary}`,
  shadowHover: `0px 1.5px 0.3px ${COLOR.hover}`,
  shadowBoxHover: `2px 0.5px 0px 0px ${COLOR.hover}`,
  shadowInput: `0px 0px 2px 0.5px ${COLOR.dark_primary}`,
  block: `
    display: block;
    color: ${COLOR.dark_primary};
    width: 100%;
    padding: 10px;
    border: 3px solid ${COLOR.dark_primary};
    background: transparent;
    box-shadow: 0px 1px 4px ${COLOR.dark_primary}30;
  `,
};
