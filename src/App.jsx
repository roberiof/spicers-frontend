import React from "react";

import Header from './components/Header'
import { Outlet } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";

export default function App(){
  return(
    <ProductsProvider>
      <Header/>
      <Outlet/>
    </ProductsProvider>
  )

}