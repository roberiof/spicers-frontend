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
    const amountWanted = parseFloat(select.current.options[select.current.selectedIndex].value)
    const productsCart = getLocalStorage()
    let prodInCart = productsCart.find(item => item.id === product.id)

    if(prodInCart){
      prodInCart.amountWanted += amountWanted
      
      updateApi(prodInCart)
      setLocalStorage([...productsCart])
    }else{
      product.amountWanted += amountWanted
      
      updateApi(product)
      setLocalStorage([...productsCart, product ])
    }
    setProds(prev => prev.map(item => item.id === product.id ? item = product : item))
    // this guy is just for re-render my home component, i didn't find a better way to do it
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
  <SoldOutBtn format='soldOut' onClick={() => navigate('/account')} > Notify me when available</SoldOutBtn>
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
            {product.amount !== 0 && <StockInfo inStock={true}> In Stock</StockInfo>}
            {product.amount === 0 && <StockInfo inStock={false}> Sold Out </StockInfo>}
          </div>
          <div className="add-div">
            {product.amount > 0 && inStockButton}
            {product.amount <= 0 && OutStockButton}
          </div>
        </div>      
      </CardStyle>
    </>
  )
}