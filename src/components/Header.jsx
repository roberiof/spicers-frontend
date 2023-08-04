import React, { useEffect, useRef, useState , useContext } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti'
import { BiMedal } from 'react-icons/bi' 
import { MdOutlineForwardToInbox } from 'react-icons/md' 
import { PrimaryIcon , UserProfileImage } from '../styles/UtilsStyles';
import logo from '../assets/logo.png'
import randomUser from '../assets/random-user.png'
import { getLocalStorage, ProductsCartLSKey } from '../utils/GeralFunctions';
import { useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';
import { UserContext } from '../context/UserContext';
import styled, {css} from "styled-components";
import { LinkStyle } from "../styles/UtilsStyles";

export const Navigator = styled.nav`
  transition: all 300ms;
  background-color: ${({transparent, activeHiddenMenu, theme}) => {
    if(activeHiddenMenu){
      return theme.colors.secondaryDarker
    }
    if(transparent){
      return('transparent')
    }
    return theme.colors.secondaryDarker
  }};
  width: 100%;
  position: fixed;
  top: 0%;
  z-index: 1;
  padding-block: 2rem;  
  padding-inline: ${({ transparent }) => (transparent) ? '8%' : '6%'};
  .wrapper{
    position: relative;
    max-width: 400px;
    display: flex; 
    gap: 2rem;
    align-items: center;  
    justify-content: space-between;
  }
  img{
    width: 3rem;
    cursor: pointer;
    user-select: none;
  }      
  @media (max-width: ${({theme}) => theme.medias.m}){
    width: 100%;
    justify-content: center;
    padding-inline: ${({ transparent }) => (transparent) ? '12%' : '10%'};
  }
`

export const LinkStyleHeader = styled(LinkStyle)`
  ${({ itemBurgerMenu  }) => {
    if(itemBurgerMenu) {
      return css`
        font-size: 1.2rem;
        padding: 1.2rem 3rem;
        text-align: start;
      ` 
    } 
  }}

  svg{
    font-size: 1.5rem !important;
  }
  // makes icons a little smaller!
  background-image: ${({ theme }) => `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primary}, #fff)`};
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 5px 0;
  position: relative;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
  :before{
      content: '';
      background: ${({ theme }) => theme.colors.primary};
      display: block;
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 3px;
      transition: all 0.3s ease-in-out;
    }

  :hover {
  background-position: 0;
  }

  :hover::before{
    width: 100%;
  }
  @media (max-width: ${({theme}) => theme.medias.sm}) {
    display: ${({hideMobile}) => hideMobile ? 'none' : 'flex'};
    gap: 10px;
    align-items: center;

  }
`

export const AdvisorIcon = styled.span`
  display: ${({show}) => show ? 'static' : 'none'};;
  position: absolute; 
  right: -5px;
  font-size: 1px;
  z-index: 100;
  padding: 3px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.colors.success};
`

export const StyledBurgerIcon = styled.button`
  position: absolute;
  right: 0;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: ${({theme}) => theme.medias.sm}){
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ active }) => active ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ active }) => active ? '0' : '1'};
      transform: ${({ active }) => active ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ active }) => active ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

export const HiddenMenu = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display:flex;
  gap: 1rem;
  background-color: ${({theme}) => theme.colors.secondaryDarker};
  transform: ${({ active }) => active ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  height: 100vh;
  position: absolute;
  top: 100%;
  left: 0; 
  padding-top: 1rem;
  padding-right: 5rem;
  padding-left: 10%;
`

export default function Header(){
  const nav = useRef()
  const [transparent, setTransparent] = useState(true)
  const [activeHiddenMenu , setActiveHiddenMenu] = useState(false)
  const navigate = useNavigate() 
  const { prods } = useContext(ProductsContext)
  const { user } = useContext(UserContext)
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
              JSON.stringify(user) !== '{}' 
              ? (
                imageURL
                ? <UserProfileImage style={{height: '2.1rem', width: '2.1rem'}} src={imageURL}/> 
                : <UserProfileImage style={{height: '2.1rem', width: '2.1rem'}} src={randomUser}/> 
              ) 
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