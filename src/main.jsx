import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// STYLE COMPONENTS 
import { ThemeProvider } from 'styled-components'
import theme from './styles/Theme'
import { GlobalStyle } from './styles/GlobalStyle'

// PAGES
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import CreateAccount from './pages/CreateAccount'
import UserInfo from './components/login/userPage/UserInfo'
import UserLastOrders from './components/login/userPage/UserLastOrders'

// RENDER
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

    <ThemeProvider theme={theme}>
      <GlobalStyle/>

      <BrowserRouter>
        <Routes>

          <Route element={<App/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/aboutUs' element={<AboutUs/>}></Route>
            <Route path='/contactUs' element={<ContactUs/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/login/create-account' element={<CreateAccount/>}></Route>
            <Route path='/login/:email' element={<UserInfo/>}></Route>
            <Route path='/login/orders/:email' element={<UserLastOrders/>}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter> 
    </ThemeProvider>

  // </React.StrictMode>
)
