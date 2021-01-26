import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    font-size: 14px;
    background: #FFF;
    color: #686868;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  }

  button{
    cursor: pointer;
  }
`;
