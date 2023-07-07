import React, { useState , useEffect , useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserIdLSKey, getUserByEmailApi, setLocalStorage } from '../../utils/GeralFunctions';

import styled from "styled-components";
import {WrapperContent} from "../../styles/components/WrapperContent";
import { PrimaryBtn, SubmitBtn } from '../../styles/components/UtilsStyles';
import { ViewIcon } from '../../styles/components/UtilsStyles';
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'


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
      position: relative;
      span{
        margin-top: 2rem;
        // little change to make the viewIcon enter inside the input!
      }
    }
    input{
      padding: .8rem .5rem;
    }
    a{  
      display: block;
      width: 200px;
      margin-inline: auto;
      padding: 5px 10px;
      margin-top: 1rem;
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
    outline-width: 1px;
    border-radius: 5px;
    transition: 200ms all;
    &:focus{
      background-color: #f7d8d8;
      box-shadow: 0px 0px 3px 0px #D80A30; 
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
  const [isSubmitBtnDisabled , setIsSubmitBtnDisabled] = useState(true)
  const [isShowPasswordActive , setIsShowPasswordActive] = useState(false)
  const passwordInput = useRef()

  const handleInputChange = (event , key) =>{
    setFormValues( prev => {
      const newObj = {...prev}
      newObj[key] = event.target.value
      return newObj
    })
  }

  const verifyUserValidity = async(e) =>{  
    e.preventDefault()

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
    setLocalStorage([user._id] , UserIdLSKey) 
  }

  const handlePasswordActive = () =>{
    setIsShowPasswordActive(!isShowPasswordActive)
    passwordInput.current.focus()
  }
  const IsValidSubmitBtn = () => {
    const isAllInfoFilledUp = Object.values(formValues).every(item => item != '')
    return (
      isAllInfoFilledUp
    )
  }

  useEffect(() => {
    const response = IsValidSubmitBtn()
    setIsSubmitBtnDisabled(!response);
  }, [formValues]);

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
            <input type={isShowPasswordActive ? "text" : "password" } id="password" ref={passwordInput} placeholder="Password" required value={formValues.password} onChange={(e) => handleInputChange(e, 'password')}/>
            <ViewIcon tabIndex="0" onClick={() => handlePasswordActive()}>  {isShowPasswordActive ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
          </div>
          <SubmitBtn type="submit" onClick={(e) => verifyUserValidity(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)
          }> LOG IN </SubmitBtn>
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