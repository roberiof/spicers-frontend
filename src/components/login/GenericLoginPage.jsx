import React, { useState , useEffect , useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIdLSKey, getUserByEmailApi, setLocalStorage , errorMessageAnimation } from '../../utils/GeralFunctions';
import styled from "styled-components";
import { WrapperContent } from "../../styles/components/UtilsStyles";
import { PrimaryBtn, PrimaryInput, SubmitBtn } from '../../styles/components/UtilsStyles';
import { ViewIcon } from '../../styles/components/UtilsStyles';
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import AOS from 'aos';
import 'aos/dist/aos.css';

const WrapperLogin = styled(WrapperContent)`
  max-width: 800px;
  h1{
    padding-bottom:1rem;
  }
  p{
    text-align: center;
    margin-bottom: 2rem;
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

  button[type="submit"]{
    padding: .8rem 1rem;
    display:block;
    margin: 2rem auto 0;
    width: 10rem;
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
  const submitBtn = useRef()

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

    if (user == 'error'){
      alert('Try again later, some error occurred with our database.')
      return 
    }
    
    if(!user){
      errorMessageAnimation(submitBtn , 'This email is not registered. Please, create an account.')
      return  
    }else{
      if(user.password === formValues.password){
        redirectToUserLoginPage(user)
      }else{ 
        errorMessageAnimation(submitBtn , 'Your password is not correct!')
      }
    }
  }
  
  const redirectToUserLoginPage = (user) => {
    setIdUserLogged(user._id)
    setLocalStorage([user._id] , UserIdLSKey) 
  }

  const handlePasswordActive = () => {
    setIsShowPasswordActive(!isShowPasswordActive)
    passwordInput.current.focus()
  }

  useEffect(() => {
    const isAllInfoFilledUp = Object.values(formValues).every(item => item != '')
    setIsSubmitBtnDisabled(!isAllInfoFilledUp);
  }, [formValues]);

  useEffect(() =>{
    AOS.init()
  })
  return(
    <>
      <WrapperLogin h1PrimaryColor={true} isParagraphLight={true}>
        <h1> Registered Customers </h1>
        <p> If you have an account, sign in with your email address</p>
        <form>
          <div data-aos="fade-up" >
            <label htmlFor="email"> Email <span style={{color: 'red'}}> * </span> </label>
            <PrimaryInput type="email" id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e, 'email')}/>
          </div>
          <div data-aos="fade-up" >
            <label htmlFor="password"> Password <span style={{color: 'red'}}>*</span></label>
            <PrimaryInput type={isShowPasswordActive ? "text" : "password" } id="password" ref={passwordInput} placeholder="Password" required value={formValues.password} onChange={(e) => handleInputChange(e, 'password')}/>
            <ViewIcon type="button" style={{top: '44%'}} onClick={() => handlePasswordActive()}>  {isShowPasswordActive ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
          </div>
          <SubmitBtn  data-aos="fade-up" type="submit" ref={submitBtn} onClick={(e) => verifyUserValidity(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)
          }> LOG IN </SubmitBtn>
          <a href="#"> Forgot Your Password? </a>
        </form>
      </WrapperLogin>

      <WrapperLogin h1PrimaryColor={true} isParagraphLight={true}>
        <h1> New Customers </h1>
        <p> Creating an account has many benefits: check out faster, keep more than one address, track orders and more. </p>
        <PrimaryBtn style={{margin: 'auto', display: 'block'}} onClick={(() => navigate('create-account'))}> CREATE AN ACCOUNT </PrimaryBtn>
      </WrapperLogin>
    </>
  )
}