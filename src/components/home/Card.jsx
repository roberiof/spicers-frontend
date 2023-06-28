import React, { useRef } from "react"
import { CardStyle , StockInfo, AddCartBtn, SoldOutBtn } from "../../styles/components/HomeStyle"
import {formatToCurrency, updateProductApi, getLocalStorage, setLocalStorage} from '../../GeralFunctions'
import { useNavigate } from "react-router-dom"

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
    const productsCart = getLocalStorage()
    let prodInCart = productsCart.find(item => item._id === product._id)

    if ( product.amountWanted < product.amount ){
      product.amountWanted += amountWanted
      updateProductApi(product)
      if (prodInCart){
        productsCart.map(item => item._id === product._id ? item.amountWanted = product.amountWanted : item )
        setLocalStorage([...productsCart])
      }else{
        setLocalStorage([...productsCart, product ])
      }
      setProds(prev => prev.map(item => item._id === product._id ? item = product : item))
      // this guy is just for re-render my home component, i didn't find a better way to do it
    }
  }

  const inStockButton = ( 
    <>
      <select name="quantity" id="prodCount" ref={select}>
          {quantOptionsSelect}      
      </select>
      <AddCartBtn onClick={() => addToCart(product)}> ADD </AddCartBtn>
    </>
  )

  const OutStockButton =(
    <SoldOutBtn format='soldOut' onClick={() => navigate('/account')} > Notify me when available </SoldOutBtn>
  )

  return(
    <> 
      <CardStyle>
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