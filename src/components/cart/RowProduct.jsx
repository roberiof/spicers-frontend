import React, { useEffect, useState } from 'react';
import {formatToCurrency, updateProductApi, setLocalStorage, getLocalStorage, ProductsCartLSKey} from '../../utils/GeralFunctions'
import {AiOutlineDelete , AiOutlinePlus ,AiOutlineMinus} from 'react-icons/ai'
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from "styled-components";
import { PrimaryBtn } from "../../styles/UtilsStyles";


export const HandleAmountBtn = styled(PrimaryBtn)`
    background-color: ${({theme}) => theme.colors.cartActionBtn};
    color: black;
    padding: .2rem 0.5rem 0;
`

export const DeleteBtn = styled(PrimaryBtn)`
  background-color: ${({theme}) => theme.colors.cartActionBtn};
  color: black;
  position: absolute;
  margin-top: 2rem;
  padding: .1rem;
  border: 0;
  top: 0;
  transform: translateX(-100%);
  @media (max-width: ${({theme}) => theme.medias.m}) {
    padding: 0;
    margin-top: .8em;
  }
`

export default function RowProduct({product, setProdsCart}){
  const [amountWanted, setAmountWanted] = useState(product.amountWanted)
  const { setProds } = useContext(ProductsContext)

  const handleAmount = (className) =>{
    if(className.includes('lower') && amountWanted>1){
      setAmountWanted(prev => prev-1)
    }else if(className.includes('upper') && amountWanted < product.amount){
      setAmountWanted(prev => prev+1)
    }
  }

  const updateAmountWanted = () =>{
    product.amountWanted = amountWanted
    updateProductApi(product)
    setProdsCart( prev => prev.map(item => item.id === product.id ? item = product : item))
    const newLocalStorage = getLocalStorage(ProductsCartLSKey).map( item  => item.id === product.id ? item = product : item)
    setLocalStorage(newLocalStorage , ProductsCartLSKey)
  }
  
  const deleteProduct = () =>{
    product.amountWanted = 0 
    updateProductApi(product)
    setProds( prev => prev.map( item => item.id ===  product.id ? item = product : item))
    setProdsCart( prev => prev.filter( item => item.id !== product.id)) 
    const newLocalStorage = getLocalStorage(ProductsCartLSKey).filter(item => item.id !== product.id)
    setLocalStorage(newLocalStorage, ProductsCartLSKey)
  }
  
  useEffect( () => {
    updateAmountWanted()
    AOS.init()
  }, [amountWanted])

  return(
    <tr data-aos="fade-down">
        <td className="product-td">
          <img src={product.image} alt="Product" />
          <div className='name-category-div'>
            <p> {product.name} </p>
            <p className="light-text category"> {product.category} </p>
          </div>
        </td>
        <td className="price-td">
          <p> {formatToCurrency(product.price)} </p>
        </td>
        <td className='amount-td'>
          <div className="amount-div">
            <HandleAmountBtn id="lower" className="lower" onClick={(e) => handleAmount(e.target.className)}> <span className="icon"><AiOutlineMinus/></span> </HandleAmountBtn>
            <div> {amountWanted}  </div>
            <HandleAmountBtn id="lower" className="upper" onClick={(e) => handleAmount(e.target.className)}><span className="icon"> <AiOutlinePlus/></span> </HandleAmountBtn>
          </div>
        </td>
        <td className='total-td'>
          <p> {formatToCurrency(product.price*amountWanted)} </p>
        </td>
        <td>
          <DeleteBtn onClick={() => deleteProduct()}> <span className="icon"><AiOutlineDelete/></span> </DeleteBtn>
        </td>
    </tr>
  )
}