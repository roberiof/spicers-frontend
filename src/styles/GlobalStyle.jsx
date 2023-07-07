import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: ${({theme}) => theme.fonts.primary};
    font-weight: 400;
    outline-color: ${({theme}) => theme.colors.inputFocus};
  } 

  body{
    height: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    &::-webkit-scrollbar{
      width: 18px;
    }
    &::-webkit-scrollbar-track{
      background-color: ${({theme}) => theme.colors.secondaryDarker};
    }
    &::-webkit-scrollbar-thumb{
      background-color: ${({theme}) => theme.colors.primaryDarker};
      border: 4px solid ${({theme}) => theme.colors.secondaryDarker};
      border-radius: 20px;
    }
  }

  .light-text{
    color: ${({theme}) => theme.colors.lightText}
  }


`