import React from 'react';
import { SummaryStyle } from '../../styles/components/CartStyle'
import {formatToCurrency, updateProductApi, clearLocalStorage} from '../../GeralFunctions'

export default function Summary({ setProdsCart, prodsCart }){
  let subtotal = 0
  let biggerFreight = 0

  prodsCart.forEach( product => {
    biggerFreight = biggerFreight < product.freight ? product.freight : biggerFreight
    subtotal += product.price * product.amountWanted
  })

  const confirmShop = () =>{
    if(prodsCart.length === 0){
      alert('The cart is empty!')
      return 
    }
    
    const confirmation = confirm('Do you really want to finish?')
    if(confirmation){
      setProdsCart([])
      for(let product of prodsCart){
        product.amount -= product.amountWanted
        product.amountWanted = 0 
        updateProductApi(product)
        clearLocalStorage()
      }
      setTimeout(() =>{
        alert('Thank you! Enjoy your new shoppings!')
      }, 400)
    }
  }

  return(
    <SummaryStyle>
        <p className="title-summary-text-div"> Shop Summary </p>
        <hr/>
        <div className="inline-div">
          <p className="light-text"> Sub-Total </p>
          <p> {formatToCurrency(subtotal)} </p>
        </div>
        <div className="inline-div">
          <p className="light-text"> Freight </p>
          <p> {biggerFreight === 0 ? "Free" : formatToCurrency(biggerFreight)} </p>
        </div>
        <div className="inline-div total-div">
          <p> Total </p>
          <p> {formatToCurrency(subtotal + biggerFreight)} </p>
        </div>
        <button onClick={() => confirmShop()}> SHOP </button>
    </SummaryStyle>
  )
}