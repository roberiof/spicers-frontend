import { useEffect } from "react";
import { createContext , useState } from "react";
import { getLocalStorage, UserImageLSKey } from "../utils/GeralFunctions";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] =  useState({})
    const [imageURL , setImageURL] = useState('')

    useEffect( () => {
        setImageURL(getLocalStorage(UserImageLSKey))
      } , [])

    return (
    <UserContext.Provider value={{ user , setUser , imageURL , setImageURL }}>
        {children} 
    </UserContext.Provider>
    )
}