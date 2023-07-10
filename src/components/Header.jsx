import { RiAccountCircleLine } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti'
import { BiMedal } from 'react-icons/bi' 
import { MdOutlineForwardToInbox } from 'react-icons/md' 
import { Navigator , LinkStyleHeader, Icon, AdvisorIcon, HiddenMenu , StyledBurgerIcon} from "../styles/components/HeaderStyle";

import logo from '../assets/logo.png'
import { getLocalStorage, ProductsCartLSKey } from '../utils/GeralFunctions';
import React, { useEffect, useRef, useState , useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';

export default function Header(){
  const nav = useRef()
  const [transparent, setTransparent] = useState(true)
  const [activeHiddenMenu , setActiveHiddenMenu] = useState(false)
  const navigate = useNavigate() 
  const { prods } = useContext(ProductsContext)

  const backHomeAndCloseMenu = () => {
    setActiveHiddenMenu(false)
    navigate('/')
  }

  useEffect(() => {    
    const verifyTransparency = () =>{
      if(nav.current){
        if(window.scrollY === 0){
          setTransparent(true)
        }else{
          setTransparent(false)
        }
      }
    }
    document.addEventListener('scroll', verifyTransparency)
    return () => {
      document.removeEventListener('scroll', verifyTransparency)
    } 
  } , [document])
  
  return (
    <>  
      <Navigator transparent={transparent} activeHiddenMenu={activeHiddenMenu} ref={nav}> 
        <div className='wrapper'>
          <img src={logo}  alt="Logo" onClick={() => backHomeAndCloseMenu()}/>

          <StyledBurgerIcon showMobile active={activeHiddenMenu} onClick={() => setActiveHiddenMenu(!activeHiddenMenu)}> 
            <div></div>
            <div></div>
            <div></div>
          </StyledBurgerIcon>

          <LinkStyleHeader to='/aboutUs' hideMobile> 
            ABOUT 
          </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' hideMobile>
            CONTACT 
          </LinkStyleHeader>
          <LinkStyleHeader to='/cart' hideMobile>
             <Icon> <TiShoppingCart/> <AdvisorIcon className='advisor' show={getLocalStorage(ProductsCartLSKey).length}> </AdvisorIcon></Icon> 
          </LinkStyleHeader>
          <LinkStyleHeader to='/login' hideMobile> 
            <Icon> <RiAccountCircleLine/> </Icon>
           </LinkStyleHeader>
        </div>

        <HiddenMenu active={activeHiddenMenu}>
          <LinkStyleHeader to='/aboutUs' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <Icon> <BiMedal/> </Icon> About </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <Icon> <MdOutlineForwardToInbox/> </Icon> Contact </LinkStyleHeader>            
          <LinkStyleHeader to='/cart' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <Icon> <TiShoppingCart/> <AdvisorIcon className='advisor' show={getLocalStorage(ProductsCartLSKey).length}> </AdvisorIcon> </Icon> Cart </LinkStyleHeader>            
          <LinkStyleHeader to='/login' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <Icon> <RiAccountCircleLine/> </Icon> Login </LinkStyleHeader>            
        </HiddenMenu> 
      </Navigator>
    </>
  )
}