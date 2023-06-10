import React from 'react'

import styled from 'styled-components'

const StyledForm = styled.form`
  margin-top:1rem;
  width: 95%;
  max-width: 688px;

  .name-email-phone-div{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    div{
      display: flex;
      flex-direction: column;
    }
    input{
      padding: .8rem .5rem;
    }
      
    @media (max-width: 700px){
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  .message-div{
    margin-top: 1rem;
    display: flex !important;
    flex-direction: column;
    textarea{
      padding:.8rem .5rem;
      height: 5rem;
    }
  }
   
  textarea, input{
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline: none;
    border-radius: 5px;
    &:focus{
      box-shadow: 0px 0px 3px 0px #000000; 
      transform: scale(1.01)
    }
  }

  button{
    padding: .8rem 1rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    margin-top: 1rem;
  }
`
export default function FormContactUs({text}){
  
  return(
    <StyledForm>
        <div className="name-email-phone-div">
          <div>
            <label htmlFor="name"> Name<span style={{color: 'red'}}>*</span></label>
            <input type='name' id="name" placeholder="Name" required/>
          </div>

          <div>
            <label htmlFor="email"> Email<span style={{color: 'red'}}>*</span></label>
            <input type='email' id="email" placeholder="Email" required/>
          </div>

          <div>
            <label htmlFor="phone"> Phone <span style={{color: 'red'}}>*</span></label>
            <input type='tel' pattern="[0-9]{3}.[0-9]{3}.[0-9]{4}" placeholder="Phone (xxx.xxx.xxxx)" id="phone" required/>
          </div>
        </div>
        <div className="message-div">
          <label htmlFor="message"> Message <span style={{color: 'red'}}>*</span></label>
          <textarea placeholder="Message" id="message" required></textarea>
        </div>
        <button type="submit" onClick={(e) => unavailableFeature(e)}> Submit </button>
    </StyledForm>
  )
}