import { createContext , useState } from "react";

export const ProductsContext = createContext()

export const ProductsProvider = ({children}) => {
    const [prods, setProds] =  useState([])

    return (
    <ProductsContext.Provider value={{ prods , setProds }}> 
        {children} 
    </ProductsContext.Provider>
    )
}