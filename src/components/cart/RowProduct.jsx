import React, { useEffect, useState } from 'react';
import {formatToCurrency, updateProductApi, setLocalStorage, getLocalStorage, ProductsCartLSKey} from '../../utils/GeralFunctions'
import {AiOutlineDelete , AiOutlinePlus ,AiOutlineMinus} from 'react-icons/ai'

import { HandleAmountBtn , ClosingBtn} from '../../styles/components/CartStyle';

export default function RowProduct({product, setProdsCart}){
  const [amountWanted, setAmountWanted] = useState(product.amountWanted)


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
    setProdsCart( prev => prev.map(item => item._id === product._id ? item = product : item))
    const newLocalStorage = getLocalStorage(ProductsCartLSKey).map( item  => item._id === product._id ? item = product : item)
    setLocalStorage(newLocalStorage , ProductsCartLSKey)
  }
  
  const deleteProduct = () =>{
    product.amountWanted = 0 
    updateProductApi(product)
    setProdsCart( prev => prev.filter( item => item._id !== product._id)) 
    const newLocalStorage = getLocalStorage(ProductsCartLSKey).filter(item => item._id !== product._id)
    setLocalStorage(newLocalStorage, ProductsCartLSKey)
  }
  
  useEffect( () => {
    updateAmountWanted()
  }, [amountWanted])

  return(
    <tr>
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
            <HandleAmountBtn className="lower" onClick={(e) => handleAmount(e.target.className)}> <span className="icon"><AiOutlineMinus/></span> </HandleAmountBtn>
            <div> {amountWanted}  </div>
            <HandleAmountBtn className="upper" onClick={(e) => handleAmount(e.target.className)}><span className="icon"> <AiOutlinePlus/></span> </HandleAmountBtn>
          </div>
        </td>
        <td className='total-td'>
          <p> {formatToCurrency(product.price*amountWanted)} </p>
        </td>
        <td>
          <ClosingBtn onClick={() => deleteProduct()}> <span className="icon"><AiOutlineDelete/></span> </ClosingBtn>
        </td>
    </tr>
  )
}