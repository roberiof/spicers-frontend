import React, { useEffect, useContext } from 'react'
import { UserIdLSKey, clearLocalStorage, getUserByIdApi, UserImageLSKey } from "../../utils/GeralFunctions";
import { useNavigate } from 'react-router-dom';
import randomUserImg from '../../assets/random-user.png'
import styled from "styled-components";
import { UserProfileImage } from '../../styles/components/UtilsStyles';
import { WrapperContent } from "../../styles/components/UtilsStyles";
import { PrimaryBtn } from '../../styles/components/UtilsStyles';
import { UserContext } from '../../context/UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LeaveButton = styled(PrimaryBtn)`
  display: block;
  margin: 10% auto 0;  
  background-color: ${({theme}) => theme.colors.leaveButton};
`

const WrapperButtons = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .post {
    display: flex;
    text-decoration: none;
    color: inherit;
    max-width: 400px;
    width: 100%;
    position: relative;
    padding: 1.5rem;
    box-shadow: ${( {theme} ) => `inset 0 0 0 4px ${theme.colors.primary}, inset -4px -4px 0 4px #CCC;`} 
    background-color: #FFF;
    cursor: pointer; 
  &:before {
    position: absolute; 
    left: 0;
    bottom: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${( {theme} ) => theme.colors.primary };
    transform-origin: 0 bottom 0;
    transform: scaleY(0);
    transition: .4s ease-out;
  }

  &:hover {
    .post-title {
      color: #FFF;
    }
    &:before {
      transform: scaleY(1);
    }
  }
}

.post-title {
	position: relative;
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.333;
	transition: .4s ease-out;
}

`

export default function UserLoginPage({idUserLogged}){
  const { user , setUser , imageURL , setImageURL} = useContext(UserContext)
  const navigate = useNavigate()
  
  const getLoggedUser = async() =>{
    const response = await getUserByIdApi(idUserLogged)
    if (response === 'error'){
      return 
     }
     setUser(response )
  }

  useEffect( () => {
    getLoggedUser() 
    AOS.init()
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
      
      <WrapperButtons>
          <p class="post" onClick={() => navigate(user.email)} data-aos="fade-right">
              <p class="post-title"> Your Info </p>
          </p>
          <p class="post" onClick={() => navigate(`orders/${user.email}`)} data-aos="fade-right">
              <p class="post-title"> Last Orders</p>
          </p>
      </WrapperButtons>

      <LeaveButton onClick={() => handleUserLogOut()} data-aos="fade-up"> Leave </LeaveButton>
    </WrapperContent>
  )
}