import styled from 'styled-components'

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