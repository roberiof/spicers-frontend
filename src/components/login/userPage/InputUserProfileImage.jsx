import React , { useRef , useContext } from 'react'

import { UserContext } from '../../../context/UserContext'

import randomUserImg from '../../../assets/random-user.png'

import { PrimaryIcon , UserProfileImage } from '../../../styles/UtilsStyles'
import { MdEditDocument } from 'react-icons/md'

import styled from 'styled-components'
import { getLocalStorage, setLocalStorage, UserImageLSKey } from '../../../utils/GeralFunctions'
import { useEffect } from 'react'

const WrapperInput = styled.div`
    input{
        display: none;
    }

    span * {
        pointer-events: none;
        font-size: 1.5rem;
        margin-top: -1.5rem;
        margin-left: 54%;
        color: gray;
    }
`

const InputUserProfileImage = ({ isEditActive }) => {
    const { imageURL , setImageURL } = useContext(UserContext)
    const inputFile = useRef()

    const handleImageChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          setImageURL(reader.result)
          setLocalStorage(reader.result , UserImageLSKey) 
        };
  
        reader.readAsDataURL(file);
      }
    }

    return (
        <WrapperInput> 
          <input type="file" ref={inputFile} onChange={(e) => handleImageChange(e)} disabled={!isEditActive}/>
          <UserProfileImage src={imageURL ? imageURL : randomUserImg } onClick={() => inputFile.current.click()}></UserProfileImage>
          <PrimaryIcon style={{display: `${isEditActive ? 'flex' : 'none'}`}}> <MdEditDocument/> </PrimaryIcon>
        </WrapperInput>
    )
}

export default InputUserProfileImage