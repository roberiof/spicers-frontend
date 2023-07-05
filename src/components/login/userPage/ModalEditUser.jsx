import React , {useEffect, useState , useRef} from 'react'

import { getUserByIdApi, updateUserApi } from '../../../utils/GeralFunctions'

import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

import styled from 'styled-components'
import { Icon } from '../../../styles/components/HeaderStyle';
import  { ViewIcon } from '../../../styles/components/UtilsStyles'
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
  const hasEmailChanged = useRef(false)
  const [isSubmitBtnDisabled , setIsSubmitBtnDisabled] = useState(true)

  const handleInputChange = ({target}, objectKey) => {
    setFormValues(prev => {
      const newObj = {...prev}
      newObj[objectKey] = target.value
      return newObj 
    })
  }

  const handleShowPassword = (divKey) => {
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
    const user = await getUserByIdApi(formValues.email)

    if( user ) {
      alert('This email is already registered!')
      return true
    }

    return false
   }

  const verifyUserValidity = async(e) => {
    e.preventDefault()

    if( hasEmailChanged.current ){
      const response = await isUserExistent() 
      if(response){
        return
      }
    }

    if(formValues.password !== formValues.confirmationPassword){
      alert("The new passwords don't match!")
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
          <input type="text" placeholder='Name' value={formValues.name} onChange={(e) => handleInputChange(e , 'name')}/>
        </div>

        <div> 
          <label htmlFor="email"> Email </label>
          <input type="text"  placeholder='Email' value={formValues.email} onChange={(e) => handleInputChange(e , 'email')}/>
        </div>

        <div> 
          <label htmlFor="password"> Password </label>
          <input type={isShowPasswordActive.password ? 'text' : 'password' } placeholder='Password' value={formValues.password} onChange={(e) => handleInputChange(e , 'password')}/>
          <ViewIcon onClick={() => handleShowPassword('password')}>  {isShowPasswordActive.password ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
        </div>

        <div> 
          <label htmlFor="confirmationPassword"> Password Again </label>
          <input type={isShowPasswordActive.confirmationPassword ? 'text' : 'password'} placeholder='Password again' value={formValues.confirmationPassword} onChange={(e) => handleInputChange(e , 'confirmationPassword')}/>
          <ViewIcon onClick={() => handleShowPassword('confirmationPassword')}>  {isShowPasswordActive.confirmationPassword ? <AiFillEyeInvisible/> : <AiFillEye/> } </ViewIcon>
        </div>
        <SubmitBtn className="register-btn" type="submit" disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)} onClick={(e) => verifyUserValidity(e)}> Confirm </SubmitBtn>
  </StyledForm>
  )
}