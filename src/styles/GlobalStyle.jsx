import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: ${({theme}) => theme.fonts.primary};
    font-weight: 400;
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

  button{
    margin-top: 1rem;
    border-radius: 5px;
    padding: .5rem 2rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    font-size: 1rem;
    border-radius: 5px;
    outline: none;
    border: 0;
    font-weight: 600;
    cursor: pointer;
    &:hover{
      opacity: .9;
      box-shadow: 1px 1px 5px 0px #000000;
      transition: all 100ms;
    }
  }
`