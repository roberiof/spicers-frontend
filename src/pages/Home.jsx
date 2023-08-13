import React , { useEffect, useState } from 'react'
import  { getProductsApi } from '../utils/GeralFunctions'
import Card from '../components/home/Card'

import { WrapperHome, WrapperCards } from '../styles/components/HomeStyle'
import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home(){
  const { prods , setProds } = useContext(ProductsContext)


  const getAllProducts = async() =>{
    const response = await getProductsApi()
    console.log(response)
    if (response == 'error'){
      return
    }
    setProds(response)
  }


  useEffect( () => {
    getAllProducts()
    window.scroll(0,0)
    AOS.init();    
  }, [])

  return(
    <WrapperHome>
      <div className='presentation'>
        <div className="text" data-aos="fade-left">
          <h1> A new way to consume <span className='colored-h1'>Spicyries</span> for real <span className="colored-h1">Spicers</span></h1>
          <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <WrapperCards>
        {prods && prods.map( (item, index) => {
          if(item.amount !== 0){
            return <Card key={index} product={item} setProds={setProds}/>
          }
        })}
        {prods && prods.map( (item, index) => {
          if(item.amount === 0){
            return <Card key={index} product={item} setProds={setProds}/>
          }
        })}
      </WrapperCards>
    </WrapperHome>
  )
}