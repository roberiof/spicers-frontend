import React from "react";

import Header from './components/Header'
import { Outlet } from "react-router-dom";

// CONTEXT API 
import { UserProvider } from './context/UserContext'
import { ProductsProvider } from "./context/ProductsContext";

export default function App(){
  return(
    <UserProvider>
      <ProductsProvider>
        <Header/>
        <Outlet/>
      </ProductsProvider>
    </UserProvider>
  )

}