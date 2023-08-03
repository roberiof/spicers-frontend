import React, { useEffect, useRef, useState , useContext } from 'react';

import { RiAccountCircleLine } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti'
import { BiMedal } from 'react-icons/bi' 
import { MdOutlineForwardToInbox } from 'react-icons/md' 

import { Navigator , LinkStyleHeader, AdvisorIcon, HiddenMenu , StyledBurgerIcon} from "../styles/components/HeaderStyle";
import { PrimaryIcon , UserProfileImage } from '../styles/components/UtilsStyles';

import logo from '../assets/logo.png'
import { getLocalStorage, ProductsCartLSKey } from '../utils/GeralFunctions';
import { useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';
import { UserContext } from '../context/UserContext';

export default function Header(){
  const nav = useRef()
  const [transparent, setTransparent] = useState(true)
  const [activeHiddenMenu , setActiveHiddenMenu] = useState(false)
  const navigate = useNavigate() 
  const { prods } = useContext(ProductsContext)
  const { imageURL } = useContext(UserContext)

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
            <AdvisorIcon show={getLocalStorage(ProductsCartLSKey)?.length} style={{marginTop: '-2rem'}}/>
          </StyledBurgerIcon>

          <LinkStyleHeader to='/aboutUs' hideMobile> 
            ABOUT 
          </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' hideMobile>
            CONTACT 
          </LinkStyleHeader>
          <LinkStyleHeader to='/cart' hideMobile>
             <PrimaryIcon> <TiShoppingCart/> <AdvisorIcon className='advisor' show={getLocalStorage(ProductsCartLSKey)?.length}> </AdvisorIcon></PrimaryIcon> 
          </LinkStyleHeader>
          <LinkStyleHeader to='/login' hideMobile>
            {
              imageURL
              ? <UserProfileImage style={{height: '2.1rem', width: '2.1rem'}} src={imageURL}/>
              : <PrimaryIcon> <RiAccountCircleLine/> </PrimaryIcon> 
            }
           </LinkStyleHeader>
        </div>

        <HiddenMenu active={activeHiddenMenu}>
          <LinkStyleHeader to='/aboutUs' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <PrimaryIcon> <BiMedal/> </PrimaryIcon> About </LinkStyleHeader>
          <LinkStyleHeader to='/contactUs' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <PrimaryIcon> <MdOutlineForwardToInbox/> </PrimaryIcon> Contact </LinkStyleHeader>            
          <LinkStyleHeader to='/cart' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <PrimaryIcon> <TiShoppingCart/> <AdvisorIcon className='advisor' show={getLocalStorage(ProductsCartLSKey)?.length}> </AdvisorIcon> </PrimaryIcon> Cart </LinkStyleHeader>            
          <LinkStyleHeader to='/login' onClick={() => setActiveHiddenMenu(!activeHiddenMenu)} itemBurgerMenu> <PrimaryIcon> <RiAccountCircleLine/> </PrimaryIcon> Login </LinkStyleHeader>            
        </HiddenMenu> 
      </Navigator>
    </>
  )
}