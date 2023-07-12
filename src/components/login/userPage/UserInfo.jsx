import React, { useState, useRef, useContext, useEffect } from 'react'

import { updateUserApi , getUserByEmailApi , errorMessageAnimation, getLocalStorage, UserIdLSKey } from '../../../utils/GeralFunctions'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

import LabelHelpIcon from '../../createAccount/LabelHelpIcon'

import { MdKeyboardBackspace } from 'react-icons/md'
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai'
import { BackPageIcon, PrimaryInputRounded, WrapperContent } from '../../../styles/components/UtilsStyles'
import { PrimaryBtn } from '../../../styles/components/UtilsStyles'
import { ViewIcon } from '../../../styles/components/UtilsStyles'


import styled from 'styled-components'
const UserForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    div{
        position: relative;
    }  
`
const UserInfo = () => {    
    const navigate = useNavigate()
    const { user , setUser } = useContext(UserContext)
    const defaultFormValues = {
        name: user.name, 
        email: user.email,
        password: user.password,
    }
    const [ formValues, setFormValues ] = useState(defaultFormValues)
    const [isShowPasswordActive, setIsShowPasswordActive] = useState({
        password: false,
        confirmationPassword: false
      }) 
    const [ isEditActive, setIsEditActive ] = useState(false)
    const submitBtn = useRef()
    const passwordInput = useRef()
    const confirmationPasswordInput = useRef()
    const confirmationPasswordDiv = useRef()

    const areObjectsEqual = (obj1, obj2) => {
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

    const handleInputChange = (event , key) => {
        setFormValues( prev => {
          const newObj = {...prev}
          newObj[key] = event.target.value
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

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isEditActive){
            verifyUserValidity()
        }

        setIsEditActive(prev => !prev)
    }

    const isUserExistent = async() => {
        const user = await getUserByEmailApi(formValues.email)
        return user !== null
    }

    const resetValues = () => {
        setIsShowPasswordActive(prev => {
            const newObj = {...prev}
            newObj['password'] = false
            newObj['confirmationPassword'] = false
            return newObj 
        })
        const editedUser = {
            name: user.name, 
            email: user.email,
            password: user.password
        }            
        setFormValues(editedUser)
        confirmationPasswordInput.current.value = ''
    }

    const updateUser = () => {
        user.name = formValues.name
        user.email = formValues.email
        user.password = formValues.password
        updateUserApi(user)
        setUser(user)
        setTimeout(() => alert('User successful updated!'), [50])
    }

    const verifyUserValidity = async(e) => {
        const editedUser = {
            name: user.name,
            email: user.email,
            password: user.password,
        }

        if(!areObjectsEqual(formValues , editedUser)){
            if( user.email !== formValues.email ){
                if( await isUserExistent() ) {
                    errorMessageAnimation(submitBtn , 'This email is already registered!')
                    resetValues()
                    return 
                }
            }
    
            if(formValues.password !== formValues.confirmationPassword){
                errorMessageAnimation(submitBtn , "The passwords don't match!")
                resetValues()
                return
            }
            
            updateUser()
            resetValues()
        }
    }

    useEffect(() => {
        const editedUser = {
            name: user.name,
            email: user.email,
            password: user.password,
        }
          
        if(isEditActive){
            if(areObjectsEqual(formValues , editedUser)){
                confirmationPasswordDiv.current.style.display = 'none'
            }else{
                confirmationPasswordDiv.current.style.display = 'block'
            }
        }else{
            confirmationPasswordDiv.current.style.display = 'none'
        }

    } , [formValues])

    return (
        <WrapperContent style={{maxWidth: '680px'}}>
            <BackPageIcon page={"login"}  onClick={() => navigate('/login')}>
                <MdKeyboardBackspace/>
            </BackPageIcon> 
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}> Overview </h2>


            <UserForm>
                <div> 
                    <LabelHelpIcon 
                        labelName = { 'name'}
                        helpText = { 'Only letters, at least 3 of them.' }
                        hidden = {!isEditActive}
                    />
                    <PrimaryInputRounded type="text"  value={formValues.name} onChange={(e) => handleInputChange(e , 'name')} disabled={!isEditActive} editActive={JSON.stringify(isEditActive)}/>
                </div>

                <div> 
                    <LabelHelpIcon 
                        labelName = { 'email'}
                        helpText = { 'Use @.' }
                        hidden = {!isEditActive}
                    />
                    <PrimaryInputRounded type="text" value={formValues.email} onChange={(e) => handleInputChange(e , 'email')} disabled={!isEditActive} editActive={JSON.stringify(isEditActive)}/>
                </div>

                <div> 
                    <LabelHelpIcon 
                        labelName = { 'password'}
                        helpText = { 'Use at least 8 characters.' }
                        hidden = {!isEditActive}
                    />
                    <PrimaryInputRounded type={isShowPasswordActive.password ? 'text' : 'password' }  value={formValues.password} onChange={(e) => handleInputChange(e , 'password')} disabled={!isEditActive} editActive={JSON.stringify(isEditActive)}  ref={passwordInput}/>
                    <ViewIcon type="button" onClick={() => handleShowPassword('password')} style={{top: '45%'}} disabled={!isEditActive}>
                        {isShowPasswordActive.password? <AiFillEyeInvisible/> : <AiFillEye/> } 
                    </ViewIcon>
                </div>

                <div ref={confirmationPasswordDiv} style={{display: 'none'}}> 
                    <LabelHelpIcon 
                        labelName = { 'password again'}
                        helpText = { 'Write the same password again.' }
                        hidden = {!isEditActive}
                    />
                    <PrimaryInputRounded type={isShowPasswordActive.confirmationPassword ? 'text' : 'password'} value={formValues.confirmationPassword} onChange={(e) => handleInputChange(e , 'confirmationPassword')} disabled={!isEditActive} editActive={JSON.stringify(isEditActive)} ref={confirmationPasswordInput}/>
                    <ViewIcon type="button" onClick={() => handleShowPassword('confirmationPassword')} style={{top: '45%'}} disabled={!isEditActive}>  
                        {isShowPasswordActive.confirmationPassword ? <AiFillEyeInvisible/> : <AiFillEye/> } 
                    </ViewIcon>
                </div>

                <PrimaryBtn style={{marginTop: '1rem', marginInline: 'auto', display: 'block', width: '10rem', marginTop: '3rem'}} onClick={(e) => handleSubmit(e)} ref={submitBtn}> 
                    { isEditActive ? 'Confirm' : 'Edit'} 
                </PrimaryBtn>
            </UserForm>

        </WrapperContent>   
    )
}

export default UserInfo