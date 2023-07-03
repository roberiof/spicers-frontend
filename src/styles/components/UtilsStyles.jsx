import styled from 'styled-components'
import { Link } from "react-router-dom";

export const PrimaryBtn = styled.button`
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
        transition: all 200ms;
    }
`

export const SubmitBtn = styled(PrimaryBtn)`
  background-color: ${({theme , disabled_style}) => disabled_style === 'true' ? theme.colors.disabledButton : theme.colors.primary} !important;
`

export const LinkStyle = styled(Link)`
  color: ${({theme}) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  
  &:hover{
    text-decoration: underline
  }
`

export const ViewIcon = styled.span`
  cursor: pointer;
  position: absolute;
  padding-top: .5rem;
  right: 3%;
  z-index: 1;
  color: ${({theme}) => theme.colors.lightText}; 
  *{
    pointer-events: none ;
  }
`