import { useEffect } from "react";
import { createContext , useState } from "react";
import { getLocalStorage, getUserByEmailApi, getUserByIdApi, UserImageLSKey } from "../utils/GeralFunctions";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] =  useState({})
    const [imageURL , setImageURL] = useState('')

    useEffect( () => {
        console.log('atualizei a img')
        console.log(getLocalStorage(UserImageLSKey))
        setImageURL(getLocalStorage(UserImageLSKey))
      } , [])

    return (
    <UserContext.Provider value={{ user , setUser , imageURL , setImageURL }}>
        {children} 
    </UserContext.Provider>
    )
}