import React , {useEffect, useState , useRef} from 'react'

import { errorMessageAnimation, getUserByEmailApi, getUserByIdApi, updateUserApi } from '../../../utils/GeralFunctions'

import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

import styled from 'styled-components'
import { Icon } from '../../../styles/components/HeaderStyle';
import  { PrimaryInput, ViewIcon } from '../../../styles/components/UtilsStyles'
import { SubmitBtn } from '../../../styles/components/UtilsStyles'

const StyledForm = styled.form`
  border-radius: 5px;
  padding: 2rem ;
  width: 95%;
  max-width: 500px;
  background-color: white;
  position: fixed;
  top:15%;
  right: 50%;
  transform: translate(50%);
  z-index: 3;

  div{
    position: relative;
    margin-top: 1rem;
  }

  button{
    display: block;
    margin: 2rem auto 0rem;
  }
`

export default function ModalEditUser({setIsModalOpen, user ,setUser}){
  const defaultFormValues = {
    name: user.name, 
    email: user.email,
    password: user.password,
    confirmationPassword: user.password
  }
  const [ formValues , setFormValues ] = useState({...defaultFormValues})
  const [isShowPasswordActive, setIsShowPasswordActive] = useState({
    password: false,
    confirmationPassword: false
  }) 
  const [isSubmitBtnDisabled , setIsSubmitBtnDisabled] = useState(true)
  const hasEmailChanged = useRef(false)
  const submitBtn = useRef()
  const passwordInput = useRef() 
  const confirmationPasswordInput = useRef()

  const handleInputChange = ({target}, objectKey) => {
    setFormValues(prev => {
      const newObj = {...prev}
      newObj[objectKey] = target.value
      return newObj 
    })
  }

  const handleShowPassword = (divKey) => {
    if(divKey === 'password'){
      passwordInput.current.focus()
    }
    if(divKey === 'confirmationPassword'){
      confirmationPasswordInput.current.focus()
    }

    setIsShowPasswordActive(prev => {
      const newObj = {...prev}
      newObj[divKey] = !newObj[divKey]
      return newObj 
    })
  }

  const areObjectsEqual = (obj1, obj2) =>{
    const keys1 =  Object.keys(obj1)
    const keys2 =  Object.keys(obj2)

    if(keys1.length !== keys2.length){
      return false
    }

    for(let key of keys1){
      if(obj1[key] !== obj2[key]){
        return false
      }
    }

    return true 
  } 
  
  const updateUser = () => {
    user.name = formValues.name
    user.email = formValues.email
    user.password = formValues.password
    setUser(user)
    updateUserApi(user)
    setIsModalOpen(false)
  }

  const isUserExistent = async() => {
    const user = await getUserByEmailApi(formValues.email)
    return user !== null
   }

  const verifyUserValidity = async(e) => {
    e.preventDefault()

    if( hasEmailChanged.current ){
      if( await isUserExistent() ) {
        errorMessageAnimation(submitBtn , 'This email is already registered!')
        return 
      }
    }

    if(formValues.password !== formValues.confirmationPassword){
      errorMessageAnimation(submitBtn , "The passwords don't match!")
      return
    }

    updateUser()
  }

  const handleSubmitBtnAble = () => {
    if(! areObjectsEqual(defaultFormValues, formValues)){
      if(defaultFormValues.email !== formValues.email){
        hasEmailChanged.current = true
      }
      setIsSubmitBtnDisabled(false)
      return
    }

    hasEmailChanged.current = false
    setIsSubmitBtnDisabled(true)
  }
  
  useEffect( () => {
    handleSubmitBtnAble()
  }, [formValues])


  return(
  <StyledForm>
        <Icon style={{marginLeft: '95%'}} onClick={() => setIsModalOpen(prev => !prev)}> <MdOutlineCancel/></Icon>

        <hr/>
        
        <div> 
          <label htmlFor="name"> Name </label>
          <PrimaryInput type="text" placeholder='Name' value={formValues.name} onChange={(e) => handleInputChange(e , 'name')}/>
        </div>

        <div> 
          <label htmlFor="email"> Email </label>
          <PrimaryInput type="text"  placeholder='Email' value={formValues.email} onChange={(e) => handleInputChange(e , 'email')}/>
        </div>

        <div> 
          <label htmlFor="password"> Password </label>
          <PrimaryInput type={isShowPasswordActive.password ? 'text' : 'password' } ref={passwordInput} placeholder='Password' value={formValues.password} onChange={(e) => handleInputChange(e , 'password')}/>
          <ViewIcon onClick={() => handleShowPassword('password')}>  {isShowPasswordActive.password ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
        </div>

        <div> 
          <label htmlFor="confirmationPassword"> Password Again </label>
          <PrimaryInput type={isShowPasswordActive.confirmationPassword ? 'text' : 'password'} ref={confirmationPasswordInput} placeholder='Password again' value={formValues.confirmationPassword} onChange={(e) => handleInputChange(e , 'confirmationPassword')}/>
          <ViewIcon onClick={() => handleShowPassword('confirmationPassword')}>  {isShowPasswordActive.confirmationPassword ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
        </div>
        <SubmitBtn ref={submitBtn} className="register-btn" type="submit" disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)} onClick={(e) => verifyUserValidity(e)}> Confirm </SubmitBtn>
  </StyledForm>
  )
}