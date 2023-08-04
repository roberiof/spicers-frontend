import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { formatToCurrency, updateProductApi, clearLocalStorage, ProductsCartLSKey } from '../../utils/GeralFunctions'
import styled from "styled-components";
import { PrimaryBtn } from "../../styles/UtilsStyles";

export const SummaryStyle = styled.div`
  padding-inline: .5rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.summaryLight};
  margin: .5rem;

  hr{
    margin-bottom: .5rem;
    border-color: ${({theme}) => theme.colors.summaryDark};
    opacity: .2;
  }

  .title-summary-text-div{
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-weight: bold;
  }

  .inline-div{
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .total-div{
    background-color: ${({theme}) => theme.colors.summaryDark};
    border-radius: 5px;
    *{
      font-weight: bold;
    }
  }
`

export const ShopBtn = styled(PrimaryBtn)`
    margin-block: 1rem;
    padding: .3rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
`

export default function Summary({ setProdsCart, prodsCart }){
  const { user } = useContext(UserContext)
  let subtotal = 0
  let biggerFreight = 0

  prodsCart.forEach( product => {
    biggerFreight = biggerFreight < product.freight ? product.freight : biggerFreight
    subtotal += product.price * product.amountWanted
  })

  const confirmShop = () =>{
    if (JSON.stringify(user) === "{}"){
      alert('You need to be logged to confirm this shop! Please, go to the login page.')
      return 
    }

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
        clearLocalStorage(ProductsCartLSKey)
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
        <ShopBtn id="shopBtn" onClick={() => confirmShop()}> SHOP </ShopBtn>
    </SummaryStyle>
  )
}