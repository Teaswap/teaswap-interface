import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }
  
  a {
    text-decoration: none;
    display: flex;
  
    &:hover {
      text-decoration: none;
    }
  }
  
  a:hover {
    cursor: pointer;
  }

  input {
    outline: none;
    border: none;
  }

  i {
    width: 18px;
    height: 18px;
    cursor: pointer;
    filter: opacity(0.8);
  }

  textarea {
    border: none;
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    background-color: #fff;
    cursor: pointer;
  }

  button:hover, button:focus {
    outline: none;
  }

  body {
    font:  14px 'Noto Sans TC',  "sans-serif normal",'Helvetica Neue', 'Adobe Garamond W08','adobe-garamond-pro','AGaramondPro-Regular','Times New Roman','Times','serif';
    line-height: 1.4em;
  }
`;
export default GlobalStyle;
