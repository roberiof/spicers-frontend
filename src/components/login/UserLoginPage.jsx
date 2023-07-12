import React, { useEffect, useState, useContext } from 'react'
import { UserIdLSKey, clearLocalStorage, getUserByIdApi } from "../../utils/GeralFunctions";
import { useNavigate } from 'react-router-dom';

import randomUserImage  from '../../assets/random-user.png'

import styled from "styled-components";
import { WrapperContent } from "../../styles/components/UtilsStyles";
import { LinkStyle } from '../../styles/components/UtilsStyles';
import { PrimaryBtn } from '../../styles/components/UtilsStyles';
import { UserContext } from '../../context/UserContext';

const UserProfileImage = styled.img`
  width: 6rem;
  border-radius: 100%;
  margin: auto;
  display: block; 
  cursor: pointer;
`

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
  const { user , setUser } = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect( () => {
   getUserByIdApi(idUserLogged).then(data => setUser(data)) 
  }, [])  

  const handleUserLogOut = () => {
   const confirmation = confirm('Are you sure you want to log out?')
   if (confirmation){
    clearLocalStorage(UserIdLSKey)
    navigate('/')
   }
  }

  return(
    <WrapperContent h1PrimaryColor={true} style={{maxWidth: "800px"}}>
      <h1> Welcome </h1>

      <UserProfileImage src={randomUserImage} alt=""/>
      <p style={{textAlign: 'center'}}> {user.name} </p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop:'3%'}}>
          <UserButton onClick={() => navigate(user.email)}> Your Info </UserButton>
          <UserButton onClick={() => navigate(`orders/${user.email}`)}> Last Orders </UserButton>
      </div>

      <LeaveButton onClick={() => handleUserLogOut()}> Leave </LeaveButton>
    </WrapperContent>
  )
}