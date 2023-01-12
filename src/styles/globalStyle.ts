import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

ul, li {
    list-style: none;
    border: 0;
}

body{
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.5;
}

`;

export default GlobalStyle;
