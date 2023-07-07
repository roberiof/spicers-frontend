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

  @keyframes vibrate {
      0% { transform: translateX(0); }
      20% { transform: translateX(-5px) rotate(-2deg); }
      40% { transform: translateX(5px) rotate(2deg); }
      60% { transform: translateX(-3px) rotate(-1deg); }
      80% { transform: translateX(3px) rotate(1deg); }
      100% { transform: translateX(0); }
    }
`