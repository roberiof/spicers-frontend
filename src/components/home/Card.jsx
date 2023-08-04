import React, { useEffect, useRef } from "react"
import {formatToCurrency, updateProductApi, getLocalStorage, setLocalStorage, ProductsCartLSKey} from '../../utils/GeralFunctions'
import { useNavigate } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from "styled-components";
import bgHome from '../../assets/bgHome.jpg'
import { PrimaryBtn } from "../../styles/UtilsStyles";

export const CardStyle = styled.div`
  width: 20rem;
  height: 31rem;
  box-shadow: 0px 0px 5px 0px black;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  img{
    object-fit: contain;
    width: 100%;
    height: 20rem;
  }
  .card-text{
    padding: 1rem;
    .product-name{
      font-weight: bolder;
    }
    .product-category{
      color: ${({theme}) => theme.colors.lightText}
    }
    .card-price-text{
      .price{
        font-size: 1.2rem;
      }
      margin-block: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
    }
  }
  .add-div{
    display: flex;
    select{
      border-width: 0px 1px 0px 0px;
      text-align: center;
      width: 30%;
      color: #ffffff;
      background-color: ${({theme}) => theme.colors.primary};
      border-radius: 10px 0px 0px 10px;
      cursor: pointer;
      option{
        text-align: center
      }
      &::-webkit-scrollbar{
        width: 8px;
      }
      &::-webkit-scrollbar-thumb{
        background-color: ${({theme}) => theme.colors.secondaryDark};
        border-radius: 20px;
      }
    }
  }

  @media (max-width: ${({theme}) => theme.medias.m}){
    width: 10rem;
    height: 21rem;
    font-size: .8rem;
    img{
      width: 100%;
      height: 10rem;
    }
    .add-div *{
      font-size: 0.7rem;
    }
 
    .price{
      font-size: 1rem !important;
    }
    }
    
  }
`

export const StockInfo = styled.div`
  background-color:${({inStock,theme}) => inStock ? theme.colors.success : theme.colors.fail};
  width: fit-content;
  padding: .15rem .75rem ;
  border-radius: 50px;
  color: #ffffff;
  font-weight: 500;
  font-size: .9rem;
  @media (max-width: ${({theme}) => theme.medias.m}){
    font-size: .65rem;
    padding-inline: .5rem;
  }
` 
  
export const AddCartBtn = styled(PrimaryBtn)`   
  background-color: ${({theme}) => theme.colors.primary};
  color: #ffffff;
  width: 70%;
  padding: 0.5rem 1rem;
  border-radius: 0px 10px 10px 0px;
`

export const SoldOutBtn = styled(PrimaryBtn)`   
  background-color: ${({theme}) => theme.colors.soldOutBtn};
  color: #000000;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`

export default function Card({product, setProds}){
  const navigate = useNavigate()
  const select = useRef()
  const quantProdsApi = product.amount - product.amountWanted
  const exhibitedQuantProd = quantProdsApi < 10 ? quantProdsApi : 10; 
  const quantOptionsSelect = []
  
  for(let i=1; i<=exhibitedQuantProd; i++){
    quantOptionsSelect.push(<option key={i} value={i}> {i}</option>)
  }

  const addToCart = async(product) =>{  
    if(product.amountWanted == product.amount){
      alert('You already added all units you can of this product!')
      return 
    }

    const amountWanted = parseFloat(select.current.options[select.current.selectedIndex].value)
    const productsCart = getLocalStorage(ProductsCartLSKey) || [  ]
    let prodInCart = productsCart.find(item => item._id === product._id)

    if ( product.amountWanted < product.amount ){
      product.amountWanted += amountWanted
      updateProductApi(product)
      if (prodInCart){
        productsCart.map(item => item._id === product._id ? item.amountWanted = product.amountWanted : item )
        setLocalStorage([...productsCart] , ProductsCartLSKey)
      }else{
        setLocalStorage([...productsCart, product ] , ProductsCartLSKey)
      }
      setProds(prev => prev.map(item => item._id === product._id ? item = product : item))
      // this guy is just for re-render my home component so the quantities be reorganized at home component, i didn't find a better way to do it
    }
  }

  const inStockButton = ( 
    <>
      <select name="quantity" id="prodCount" ref={select}>
          {quantOptionsSelect}      
      </select>
      <AddCartBtn id="addBtn" onClick={() => addToCart(product)}> ADD </AddCartBtn>
    </>
  )

  const OutStockButton =(
    <SoldOutBtn id="outStockBtn" format='soldOut' onClick={() => navigate('/login')} > Notify me when available </SoldOutBtn>
  )

  useEffect(() =>{
    AOS.init();    
  }, [])
  
  return(
    <> 
      <CardStyle data-aos="flip-left"> 
        <img src={product.image} alt="Product" />
        <div className="card-text">
          <p className="product-name"> {product.name} </p>
          <p className="product-category"> {product.category} </p>
          <div className="card-price-text">
            <p className="price"> {formatToCurrency(product.price)}</p>
            {product.amount !== 0 
            ? <StockInfo inStock={true}> In Stock</StockInfo> 
            : <StockInfo inStock={false}> Sold Out </StockInfo>}
          </div>
          <div className="add-div">
            {product.amount > 0 
            ? inStockButton 
            : OutStockButton}
          </div>
        </div>      
      </CardStyle>
    </>
  )
}