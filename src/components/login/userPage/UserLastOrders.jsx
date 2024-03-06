import React, { useContext , useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
// import { CardOrder } from './CardOrder'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { WrapperContent , BackPageIcon, LinkStyle} from '../../../styles/UtilsStyles'
import { getLocalStorage, getUserByIdApi, UserIdLSKey } from '../../../utils/GeralFunctions'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
// import OrderModal from './OrderModal'

const UserLastOrders = () => {
  const navigate = useNavigate()
  const { user , setUser } = useContext(UserContext)

  useEffect( () => {
    getUserByIdApi(getLocalStorage(UserIdLSKey)).then(data => setUser(data))
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
        user.orders && Object.values(user.orders)[0].map( item => <OrderModal key={Object.keys(user.orders)[0]} orderNumber={Object.keys(user.orders)[0]} order={item}/>)
      }
    </WrapperContent>   
  )
}

export default UserLastOrders