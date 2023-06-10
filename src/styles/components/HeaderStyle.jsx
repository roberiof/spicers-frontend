import styled, {css} from "styled-components";
import { Link } from "react-router-dom";

export const Navigator = styled.nav`
  transition: all 300ms;
  background-color: ${({transparent, activeHiddenMenu, theme}) => {
    if(activeHiddenMenu){
      return theme.colors.secondaryDarker
    }
    if(transparent){
      return('transparent')
    }
    return theme.colors.secondaryDarker
  }};
  width: 100%;
  position: fixed;
  top: 0%;
  z-index: 1;
  padding: 1.5rem 3rem;
  div{
    max-width: 400px;
    display: flex; 
    gap: 2rem;
    align-items: center;  
    justify-content: space-between;
  }
  img{
    width: 3rem;
    cursor: pointer;
    user-select: none;
  }      
  @media (max-width: ${({theme}) => theme.medias.m}){
    width: 100%;
    justify-content: center;
  }
`

export const LinkStyle = styled(Link)`
  color: ${({theme}) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  
  ${({ itemBurgerMenu  }) => {
    if(itemBurgerMenu) {
      return css`
        padding: 1rem 2rem;
        text-align: center;
      ` 
    } 
  }}
  
  &:hover{
    text-decoration: underline
  }
  @media (max-width: ${({theme}) => theme.medias.sm}) {
    display: ${({hideMobile}) => hideMobile ? 'none' : 'block'};
  }
`

export const Icon = styled.span`
  display: ${({showMobile}) => showMobile ? 'none' : 'block'};
  position: relative !important;
  svg{
    cursor: pointer;
    font-size: 1.8rem;
    color: ${({theme}) => theme.colors.primary};
    &:hover{
      transition: all 100ms; 
      transform: scale(1.125);
    }
    *{
      pointer-events: none;
    }
  } 

  @media (max-width: ${({theme}) => theme.medias.sm}){
    display: block;
  }
`

export const AdvisorIcon = styled.span`
  display: ${({show}) => show ? 'static' : 'none'};;
  position: absolute; 
  font-size: 1px;
  z-index: 100;
  padding: 3px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.colors.success};
`

export const HiddenMenu = styled.div`
  transition: all 300ms;
  display: ${({active}) => active ? 'block' : 'none'} !important;
  position: absolute;
  top: 100%;
  margin-left: -3rem;
  color: #ffffff;
  background-color: ${({theme}) => theme.colors.secondaryDarker};
`