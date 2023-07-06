import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserIdLSKey, getUserByEmailApi, setLocalStorage } from '../../utils/GeralFunctions';

import styled from "styled-components";
import {WrapperContent} from "../../styles/components/WrapperContent";
import { PrimaryBtn } from '../../styles/components/UtilsStyles';

const WrapperLogin = styled(WrapperContent)`
  p{
    text-align: center;
  }
  form{
    margin: auto;
    margin-top:1rem;
    width: 100%;
    max-width: 500px;
    gap: 1rem;
    div{
      display: flex;
      flex-direction: column;
    }
    input{
      padding: .8rem .5rem;
    }
    a{
      display: block;
      margin-top: .5rem;
      text-align:center;
      text-decoration: none ;
      color: #000000;
      &:hover{
        text-decoration: underline;
      }
    }
  }

  button{
      margin: auto;
      padding: .8rem 1rem;
      width: 10rem;
      display:block;
      background-color: ${({theme}) => theme.colors.primary};
      color: #ffffff;
      margin-top: 2rem;
    }

  input{
    background-color: ${({theme}) => theme.colors.input};
    display:block;
    border: 0;
    outline: none;
    border-radius: 5px;
    transition: 200ms all;
    &:focus{
      box-shadow: 0px 0px 3px 0px #000000; 
      transform: scale(1.01)
    }
  }
`

export default function GenericLoginPage({setIdUserLogged}){
  const navigate = useNavigate()
  const defaultFormValues = {
    email: '',
    password: ''
  }
  const [ formValues , setFormValues ] = useState(defaultFormValues)

  const handleInputChange = (event , key) =>{
    setFormValues( prev => {
      const newObj = {...prev}
      newObj[key] = event.target.value
      return newObj
    })
  }

  const verifyUserValidity = async(e) =>{  
    e.preventDefault()

    if(!formValues.email || !formValues.password){
      alert('Please, fill all info before log in.')
      return
    }

    const user = await getUserByEmailApi(formValues.email)

    if(!user){
      alert('This email is not registered. Please, create an account.')
      return
    }else{
      if(user.password === formValues.password){
        redirectToUserLoginPage(user)
      }else{ 
        alert('Your password is not correct!')
      }
    }
  }
  
  const redirectToUserLoginPage = (user) => {
    setIdUserLogged(user._id)
    setLocalStorage(user._id , UserIdLSKey) 
  }

  return(
    <>
      <WrapperLogin h1PrimaryColor={true} isParagraphLight={true}>
        <h1> Registered Customers </h1>
        <p> If you have an account, sign in with your email address</p>
        <form>
          <div>
            <label htmlFor="email"> Email <span style={{color: 'red'}}> * </span> </label>
            <input type="email" id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e, 'email')}/>
          </div>
          <div>
            <label htmlFor="password"> Password <span style={{color: 'red'}}>*</span></label>
            <input type="password" id="password" placeholder="Password" required value={formValues.password} onChange={(e) => handleInputChange(e, 'password')}/>
          </div>
          <PrimaryBtn type="submit" onClick={(e) => verifyUserValidity(e)}> LOG IN </PrimaryBtn>
          <a href="#"> Forgot Your Password? </a>
        </form>
      </WrapperLogin>

      <WrapperLogin h1PrimaryColor={true} isParagraphLight={true}>
        <h1> New Customers </h1>
        <p> Creating an account has many benefits: check out faster, keep more than one address, track orders and more. </p>
        <PrimaryBtn onClick={(() => navigate('/create-account'))}> CREATE AN ACCOUNT </PrimaryBtn>
      </WrapperLogin>
    </>
  )
}