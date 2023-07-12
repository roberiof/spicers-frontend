import styled , {css} from 'styled-components'
import { Link } from "react-router-dom";

export const PrimaryBtn = styled.button`
    padding: .8rem 1.3rem;
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
        transition: all 300ms;
    }
`

export const SubmitBtn = styled(PrimaryBtn)`
  background-color: ${({theme , disabled_style}) => disabled_style === 'true' ? theme.colors.disabledButton : theme.colors.primary} !important;
  ${
      (props) => 
      props.disabled_style === 'true' && css`
        &:hover{
          cursor: default;
          opacity: 1;
          box-shadow: None;
        }
      ` 
  }
`

export const PrimaryInput = styled.input`
    width:100%;
    padding: .8rem .5rem; 
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline-width: 1px;
    border-radius: 5px;
    transition: 200ms all;
    &:focus{
      background-color: #f7d8d8;
      box-shadow: 0px 0px 3px 0px #D80A30; 
      transform: scale(1.01)
    }
`

export const PrimaryInputRounded = styled(PrimaryInput)`  
  border-radius: 40px;
  padding-left: 1rem; 
  padding-block: 0.6rem;
  outline: 0;
  border: 1px solid transparent;
  ${({theme , editActive}) => {
      if(editActive === 'false'){
          return css`
              background-color: transparent;
              border-color: ${theme.colors.inputFocus};
              color: ${theme.colors.lightText};
          `
  }}}
`

export const LinkStyle = styled(Link)`
  color: ${({theme}) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  
  &:hover{
    text-decoration: underline
  }
`

export const PrimaryIcon = styled.span`
  display: ${({showMobile}) => showMobile ? 'none' : 'flex'};
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
    display: flex;
  }
`

export const ViewIcon = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  position: absolute;
  margin-top: .9rem;
  right: 5%;
  z-index: 1;
  color: ${({theme}) => theme.colors.lightText}; 
  *{
    pointer-events: none ;
  }
`

export const BackPageIcon = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  top: .5rem;
  left: 1rem ;
  display: flex;
  align-items: center;  
  gap: .5rem;
  &:hover{
    transform: translateY(-4px);
    ::after{
        content:'Go back to ${({page}) => page} page';
        font-size: .8rem;
      }
  }
`

export const WrapperContent = styled.div`
  background-color: #ffffff;
  max-width: 1200px;
  width: 95%;
  margin: 8rem auto;
  padding: 2rem;
  border-radius: 10px;
  line-height: 2rem;
  position: relative;
  h1{
    text-align: center;
    padding-bottom: 3rem;
    font-weight: 500;
    color: ${({h1PrimaryColor, theme}) => { 
      return h1PrimaryColor ? theme.colors.primaryDark : '#000'
    }}
  }
  h2{
    color: ${({theme}) => theme.colors.primary};
    font-style: italic;
    margin-bottom: 1rem 
  }

  h3{
    text-decoration: underline;
    margin-bottom: .4rem;
  }  

  p{
    color: ${({theme, isParagraphLight}) => {
      if(isParagraphLight)
        return theme.colors.lightText
      }
    };
  }

  // strong texts inside "contact us" page
  .strong-text{
    font-weight: bold;
    color: #000000;
  }

  .strong-email{
    font-weight: bold;
    color: ${({theme}) => theme.colors.primaryDark};
  }

  @media(max-width: ${({theme}) => theme.medias.sm}){
    padding-inline: 1rem;
    h1{
      font-size: 1.8rem;
    }
    h2{
      font-size: 1.2rem
    }
  }
`