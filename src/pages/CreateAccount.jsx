import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";

import Header from '../components/Header'
import LabelHelpIcon from '../components/createAccount/LabelHelpIcon'
import { WrapperContent } from '../styles/components/WrapperContent'
import { BackPageIcon } from '../styles/components/BackPageIcon'
import { MdKeyboardBackspace } from 'react-icons/md'
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import { postUserApi , getUserByEmailApi } from '../GeralFunctions'

import styled from 'styled-components'
import { ViewIcon } from '../styles/components/ViewIcon'

const FormStyled = styled.form`
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

const SubmitBtn = styled.button`
  padding: .8rem 1rem;
  background-color: ${({theme , disabled_style}) => disabled_style === 'true' ? theme.colors.disabledButton : theme.colors.primary} !important;
  color: #fff;
  margin-top: 2rem;
  cursor: pointer;
`

export default function CreateAccount(){
  const defaultFormValues = {name: '', email: '', password:'', confirmationPassword:''}
  const [formValues, setFormValues] = useState(defaultFormValues)
  const [isShowPasswordActive, setIsShowPassowordActive] = useState({
    password: false,
    confirmationPassword: false
  }) 
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true)
  const navigate = useNavigate()

  const handleShowPassword = (divKey) => {
    setIsShowPassowordActive(prev => {
      const newObj = {...prev}
      newObj[divKey] = !newObj[divKey]
      return newObj 
    })
  }

  const clearInputs = () => {
    setFormValues(defaultFormValues)
  }
  
  const createUser = () => {
    const user = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      "orders": []
    }
    postUserApi(user)
    clearInputs()
    alert('User registered successfully!')
  }

  const verifyUserExistence = async(e) => {
    e.preventDefault()

    const user = await getUserByEmailApi(formValues.email)

    if( user ) {
      alert('This email is already registered!')
      return
    }

    createUser()
  }
  
  const handleInputChange = ({target}, objectKey) => {
    setFormValues(prev => {
      const newObj = {...prev}
      newObj[objectKey] = target.value
      return newObj 
    })
  }
  
  const isUserValid = () => {
    const areAllInputsFilled = Object.values(formValues).every(item => item)
    const isEveryNameCharacterStr = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(formValues.name)
    
    if(
      !areAllInputsFilled || 
      formValues.confirmationPassword !== formValues.password ||
      formValues.name.length < 3 || 
      !isEveryNameCharacterStr ||
      formValues.password.length < 8 ||
      formValues.confirmationPassword < 8
    ){
      return false
    }

    return true
  }
  
  useEffect(() => {  
    setIsSubmitBtnDisabled(isUserValid() ? false : true)
  })

  return(
    <>
      <Header />
      <WrapperContent>
        <BackPageIcon page={"account"} onClick={() => navigate('/account')}>
          <MdKeyboardBackspace/>
        </BackPageIcon>
        <h2 style={{marginTop: "2rem"}}> Fill all information below to able the button: </h2>
        <FormStyled>
          <div className='wrapper-label-icon-input'>
            <LabelHelpIcon 
                labelName = { 'name'}
                helpText = { 'Only letters, at least 3 of them.' }
            />
            <input type='name' id="name" placeholder="Name" required value={formValues.name}
            onChange={(e) => handleInputChange(e, 'name')}
            />
          </div>

          <div className='wrapper-label-icon-input'>
            <LabelHelpIcon 
              labelName = { 'email'}
              helpText = { 'Use @.' }
            />
            <input type='email' id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e, 'email')}/>
          </div>

          <div className='wrapper-label-icon-input'>
            <LabelHelpIcon 
              labelName = { 'password'}
              helpText = { 'Use at least 8 characters.' }
            />
            <div className='input-icon'>
              <input type={isShowPasswordActive.password ? 'text' : 'password' } id="password" placeholder="Password" required  value={formValues.password} onChange={(e) => handleInputChange(e, 'password')}/>
              <ViewIcon onClick={() => handleShowPassword('password')}> 
               {isShowPasswordActive.password ? <AiFillEyeInvisible/> : <AiFillEye/> } 
               </ViewIcon>
            </div>
          </div>

          <div className='wrapper-label-icon-input'>
            <LabelHelpIcon 
              labelName = { 'password again'}
              helpText = { 'Write the same password again.' }
            />

            <div className='input-icon'>
              <input type={isShowPasswordActive.confirmationPassword ? 'text' : 'password' }id="password again" placeholder="Password again" required value={formValues.confirmationPassword}
              onChange={(e) => handleInputChange(e, 'confirmationPassword')}/>
              <ViewIcon onClick={() => handleShowPassword('confirmationPassword')}>  {isShowPasswordActive.confirmationPassword ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
            </div>
          </div>

          <SubmitBtn type="submit" onClick={(e) => verifyUserExistence(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)}> Create User </SubmitBtn>

        </FormStyled>
      </WrapperContent>
    </>
  )
}

