import React, { useContext , useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { WrapperContent , BackPageIcon} from '../../../styles/components/UtilsStyles'
import { LinkStyle } from '../../../styles/components/UtilsStyles'
import { getLocalStorage, getUserByIdApi, UserIdLSKey } from '../../../utils/GeralFunctions'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const UserLastOrders = () => {
  const navigate = useNavigate()
  const { user , setUser } = useContext(UserContext)

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

  return (
    <WrapperContent style={{maxWidth: '800px'}}>
      <BackPageIcon page={"login"}  onClick={() => navigate('/login')}>
          <IoMdArrowRoundBack/>
      </BackPageIcon> 
      <h2 style={{textAlign: 'center', marginBlock: '1rem 2rem'}}> Last Orders </h2>
      {user.orders && user.orders.length == 0 ? 
        <p data-aos="fade-left" style={{textAlign: 'center'}}>There is no last orders! Make your first one, go to our <LinkStyle to="/"> Home Page </LinkStyle>  and see our products.</p>
        :
        <></>
    }
  </WrapperContent>   
  )
}

export default UserLastOrders