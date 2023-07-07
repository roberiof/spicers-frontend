import { RiAccountCircleLine , RiAccountCircleFill} from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti'
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai'
import { Navigator , LinkStyleHeader, Icon, AdvisorIcon, HiddenMenu} from "../styles/components/HeaderStyle";

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
        <HiddenMenu active={activeHiddenMenu}>
          <LinkStyleHeader to='/aboutUs' itemBurgerMenu> About </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' itemBurgerMenu> Contact </LinkStyleHeader>            
          <LinkStyleHeader to='/cart' itemBurgerMenu> Cart </LinkStyleHeader>            
          <LinkStyleHeader to='/login' itemBurgerMenu> Login </LinkStyleHeader>            
        </HiddenMenu> 
        <div>
          <Icon showMobile type="hamburguer" onClick={() => setActiveHiddenMenu(!activeHiddenMenu)}> {activeHiddenMenu ? <AiOutlineClose/> : <AiOutlineMenu/>} </Icon>
          <img src={logo}  alt="Logo" onClick={ () => navigate('/')}/>
          <LinkStyleHeader to='/aboutUs' hideMobile> ABOUT </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' hideMobile> CONTACT </LinkStyleHeader>
          <LinkStyleHeader to='/cart'> <Icon> <TiShoppingCart/> <AdvisorIcon className='advisor' show={getLocalStorage(ProductsCartLSKey).length}> </AdvisorIcon></Icon> </LinkStyleHeader>
          <LinkStyleHeader to='/login'> <Icon><RiAccountCircleLine/></Icon> </LinkStyleHeader>
        </div>
      </Navigator>
    </>
  )
}