import React, { useEffect, useState } from 'react'

import UserLoginPage from '../components/login/UserLoginPage'
import GenericLoginPage from '../components/login/GenericLoginPage'

import { getLocalStorage , UserIdLSKey } from "../utils/GeralFunctions";

export default function Login(){
  const responseLS = getLocalStorage(UserIdLSKey)

  const [idUserLogged, setIdUserLogged] = useState(responseLS[0]) 

  useEffect( () => {
    window.scrollTo(0,0)
  }, [])

  return(
    <>
      { idUserLogged ? 
      <UserLoginPage idUserLogged={idUserLogged}/> 
      : 
      <GenericLoginPage setIdUserLogged={setIdUserLogged}/> }
    </>
  )
}