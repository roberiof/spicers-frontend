import React , { useEffect, useState } from 'react'
import  { getProductsApi } from '../utils/GeralFunctions'
import Card from '../components/home/Card'
import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from "styled-components";
import bgHome from '../assets/bgHome.jpg'

export const WrapperHome = styled.div`
  background-color: #ffffff;
  .presentation{
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${bgHome});
    background-size: cover;
    .text{
      color: #ffffff;
      max-width: 700px;
      position: absolute;
      left: 8%;
      top:50%;
      transform: translateY(-50%);
      
      h1{
        text-shadow: 1px 1px 10px black;
        margin-bottom: 1rem;
        font-size: 3rem;
        font-weight: 800;
        .colored-h1{
          font-weight: inherit;
          color: ${ ({theme}) => theme.colors.primary};
        }
        @media (max-width: ${({theme}) => theme.medias.m}) {
          font-size: 2rem;
        }
      }
      p{  
        font-weight: bold;
        @media (max-width: ${({theme}) => theme.medias.sm}){
          font-size: 1rem;
        }
      }
      @media (max-width: ${({theme}) => theme.medias.sm}){
        text-align: center;
        width: 100%;
        padding-inline: 1.5rem;
        left: 0;
      }
    }
  }
`

export const WrapperCards = styled.div`
  width: 90%;
  max-width: 1500px;
  margin: auto;
  padding-block: 5rem;
  display: flex;
  row-gap: 4rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

export default function Home(){
  const { prods , setProds } = useContext(ProductsContext)

  const getAllProducts = async() =>{
    const response = await getProductsApi()
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