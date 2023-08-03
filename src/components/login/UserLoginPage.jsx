import React, { useEffect, useContext } from 'react'
import { UserIdLSKey, clearLocalStorage, getUserByIdApi, UserImageLSKey } from "../../utils/GeralFunctions";
import { useNavigate } from 'react-router-dom';

import randomUserImg from '../../assets/random-user.png'

import styled from "styled-components";
import { UserProfileImage } from '../../styles/components/UtilsStyles';
import { WrapperContent } from "../../styles/components/UtilsStyles";
import { PrimaryBtn } from '../../styles/components/UtilsStyles';
import { UserContext } from '../../context/UserContext';

const UserButton = styled(PrimaryBtn)`
  display: block; 
  margin: auto;
  max-width: 25rem;
  width: 90%;
  border: 1px solid transparent;
  &:hover{
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.colors.primary};
    color: black;
    text-shadow: ${({theme}) => theme.colors.primaryDarker} -1px 0px 1px;
  }
`

const LeaveButton = styled(PrimaryBtn)`
  display: block;
  margin: 10% auto 0;  
  background-color: ${({theme}) => theme.colors.leaveButton};
`

export default function UserLoginPage({idUserLogged}){
  const { user , setUser , imageURL , setImageURL} = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect( () => {
   getUserByIdApi(idUserLogged).then(data => setUser(data)) 
  }, [])  

  const handleUserLogOut = () => {
   const confirmation = confirm('Are you sure you want to log out?')
   if (confirmation){
    clearLocalStorage(UserIdLSKey)
    clearLocalStorage(UserImageLSKey)
    setUser({})
    setImageURL(null)
    navigate('/')
   }
  }

  return(
    <WrapperContent h1PrimaryColor={true} style={{maxWidth: "800px"}}>
      <h1 style={{marginTop: '1rem'}}> Welcome </h1>

      <UserProfileImage src={imageURL ? imageURL : randomUserImg} disabled_border={imageURL === null} alt=""/>
      <p style={{textAlign: 'center'}}> {user.name} </p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop:'3%'}}>
          <UserButton onClick={() => navigate(user.email)}> Your Info </UserButton>
          <UserButton onClick={() => navigate(`orders/${user.email}`)}> Last Orders </UserButton>
      </div>

      <LeaveButton onClick={() => handleUserLogOut()}> Leave </LeaveButton>
    </WrapperContent>
  )
}