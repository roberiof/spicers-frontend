import styled from 'styled-components'
import { PrimaryBtn } from './UtilsStyles'

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

export const FormStyled = styled.form`
  width: 95%;
  max-width: 488px;

  .wrapper-label-icon-input{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  }

  .input-icon{
    position: relative;
  }

  input{
    width:100%;
    padding: .8rem .5rem;
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline: none;
    border-radius: 5px;
    &:focus{
      box-shadow: 0px 0px 3px 0px #000000; 
      transform: scale(1.01)
    }
  }
`

export const SubmitBtn = styled(PrimaryBtn)`
  padding: .8rem 1rem;
  background-color: ${({theme , disabled_style}) => disabled_style === 'true' ? theme.colors.disabledButton : theme.colors.primary} !important;
  color: #fff;
  margin-top: 2rem;
  cursor: pointer;
`