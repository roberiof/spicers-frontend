import React, { useEffect, useState  } from 'react'
import { UserIdLSKey, clearLocalStorage, getUserByIdApi } from "../../utils/GeralFunctions";
import { useNavigate } from 'react-router-dom';

import ModalEditUser from './userPage/ModalEditUser';

import styled from "styled-components";
import { WrapperContent } from "../../styles/components/UtilsStyles";
import { LinkStyle } from '../../styles/components/UtilsStyles';
import { PrimaryBtn } from '../../styles/components/UtilsStyles';

const UserTable = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  .column{
    background-color: ${({theme}) => theme.colors.summaryLight};
    p , input{
      display: block;
      outline: 0;
      border: 0;
      border-bottom: 1px solid ${({theme}) => theme.colors.tableBorder};
      padding: 1rem 3rem;
      font-size: 1rem;
      text-align: center;
      line-height: 2rem; 
      @media(max-width: ${({theme}) => theme.medias.m}){
        padding: 1rem;
      }
      &:last-child{
        border: 0
      }
    }
  }
  
  input{
    background-color: transparent;
  }
  
`

const LeaveButton = styled(PrimaryBtn)`
  display: block;
  margin: 3rem auto 0;  
  background-color: ${({theme}) => theme.colors.leaveButton};
`

const StyledModalBg = styled.div`
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: black;
  width: 100%;
  height: 100%;
`

export default function UserLoginPage({idUserLogged}){
  const [user, setUser] = useState('')
  const [isModalOpen , setIsModalOpen] = useState(false)
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

      <section>
        <h2> Overview </h2>

        <UserTable>
          <div className='column'>
            <p className='light-text'> Name </p>
            <p className='light-text'> Email </p>
            <p className='light-text'> Password </p>
          </div>
          <div className='column'>
            <input type="text" value={user && user.name} />
            <input type="text" value={user && user.email} />
            <input type="password" value={user && user.password} />
          </div>
          <div className="column">
        
          </div>
        </UserTable>

        <PrimaryBtn style={{marginTop: '1rem'}} onClick={() => setIsModalOpen(prev => !prev)}> Edit </PrimaryBtn>

        { isModalOpen && 
          <>
            <StyledModalBg style={{display: isModalOpen ? 'flex' : 'none'}}></StyledModalBg>
            <ModalEditUser
              setIsModalOpen={setIsModalOpen}
              user={user}
              setUser={setUser}
            />
          </>
        }
      </section>

      <section>
        <h2 style={{marginTop: "3rem"}}> Last Orders </h2>
        <div>
          {user && user.orders.length == 0 && <p>There is no last orders! Make your first one, go to our <LinkStyle to="/"> Home Page </LinkStyle>  and see our products.</p>}
          {/* {user && user.orders.length > 0} */}
        </div>
      </section>


      <LeaveButton onClick={() => handleUserLogOut()}> Leave </LeaveButton>
    </WrapperContent>
  )
}