import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";

import LabelHelpIcon from '../components/createAccount/LabelHelpIcon'
import { WrapperContent } from '../styles/components/UtilsStyles'
import { BackPageIcon, PrimaryInput } from '../styles/components/UtilsStyles'
import { MdKeyboardBackspace } from 'react-icons/md'
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import { postUserApi , getUserByEmailApi, errorMessageAnimation } from '../utils/GeralFunctions'

import styled from 'styled-components'
import { ViewIcon , SubmitBtn} from '../styles/components/UtilsStyles';

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
  const submitBtn = useRef()
  const passwordInput = useRef() 
  const confirmationPasswordInput = useRef()

  const handleShowPassword = (divKey) => {
    if(divKey === 'password'){
      passwordInput.current.focus()
    }
    if(divKey === 'confirmationPassword'){
      confirmationPasswordInput.current.focus()
    }
    
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

  const  verifyUserValidity = async(e) => {
    e.preventDefault()

    const isEveryNameCharacterStr = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(formValues.name)
    if (formValues.name.length < 3 || !isEveryNameCharacterStr){
      errorMessageAnimation(submitBtn , 'The name must be only letters and at least 3 of them.')
      return 
    }

    const user = await getUserByEmailApi(formValues.email)
    if( user ) {
      alert('This email is already registered!')
      return
    }

    if(formValues.password.length < 8){
      errorMessageAnimation(submitBtn , 'The password must have at least 8 characters.')
      return
    }

    if(formValues.confirmationPassword !== formValues.password){
      errorMessageAnimation(submitBtn , "The passwords don't match!")
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
  
  useEffect(() => {  
    const areAllInputsFilled = Object.values(formValues).every(item => item)
    setIsSubmitBtnDisabled(! areAllInputsFilled)
  })

  return(
    <WrapperContent style={{maxWidth: '580px'}}>

      <BackPageIcon page={"account"} onClick={() => navigate('/login')}>
        <MdKeyboardBackspace/>
      </BackPageIcon>

      <h2 style={{marginTop: "2rem"}}> Fill all information below to able the button: </h2>

      <FormStyled>
        <div className='wrapper-label-icon-input'>
          <LabelHelpIcon 
              labelName = { 'name'}
              helpText = { 'Only letters, at least 3 of them.' }
          />
          <PrimaryInput type='name' id="name" placeholder="Name" required value={formValues.name}
          onChange={(e) => handleInputChange(e, 'name')}
          />
        </div>

        <div className='wrapper-label-icon-input'>
          <LabelHelpIcon 
            labelName = { 'email'}
            helpText = { 'Use @.' }
          />
          <PrimaryInput type='email' id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e, 'email')}/>
        </div>

        <div className='wrapper-label-icon-input'>
          <LabelHelpIcon 
            labelName = { 'password'}
            helpText = { 'Use at least 8 characters.' }
          />
          <div className='input-icon'>
            <PrimaryInput type={isShowPasswordActive.password ? 'text' : 'password' } ref={passwordInput} id="password" placeholder="Password" required  value={formValues.password} onChange={(e) => handleInputChange(e, 'password')}/>
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
            <PrimaryInput type={isShowPasswordActive.confirmationPassword ? 'text' : 'password' } ref={confirmationPasswordInput} id="password again" placeholder="Password again" required value={formValues.confirmationPassword}
            onChange={(e) => handleInputChange(e, 'confirmationPassword')}/>
            <ViewIcon onClick={() => handleShowPassword('confirmationPassword')}>  
              {isShowPasswordActive.confirmationPassword ? <AiFillEyeInvisible/> : <AiFillEye/> } 
            </ViewIcon>
          </div>
        </div>

        <SubmitBtn ref={submitBtn} style={{marginTop: "2rem"}} type="submit" onClick={(e) => verifyUserValidity(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)}> Create User </SubmitBtn>
      </FormStyled>

    </WrapperContent>
  )
}

