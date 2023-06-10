import React, { useEffect, useState } from 'react';
import {formatToCurrency, updateProductApi, setLocalStorage, getLocalStorage} from '../../GeralFunctions'

import {AiOutlineDelete , AiOutlinePlus ,AiOutlineMinus} from 'react-icons/ai'

export default function RowProduct({product, setProdsCart}){
  const [amountWanted, setAmountWanted] = useState(product.amountWanted)

  const handleAmount = (className) =>{
    if(className === 'lower' && amountWanted>1){
      setAmountWanted(prev => prev-1)
    }else if(className==='upper' && amountWanted < product.amount){
      setAmountWanted(prev => prev+1)
    }
  }

  const updateAmountWanted = () =>{
    product.amountWanted = amountWanted
    updateProductApi(product)
    setProdsCart( prev => prev.map(item => item.id === product.id ? item = product : item))
    const newLocalStorage = getLocalStorage().map( item  => item.id === product.id ? item = product : item)
    setLocalStorage(newLocalStorage)
  }

  useEffect( () => {
    updateAmountWanted()
  }, [amountWanted])

  const deleteProduct = () =>{
    product.amountWanted = 0 
    updateProductApi(product)
    setProdsCart( prev => prev.filter( item => item.id !== product.id)) 
    const newLocalStorage = getLocalStorage().filter(item => item.id !== product.id)
    setLocalStorage(newLocalStorage)
  }

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
            <button className="lower" onClick={(e) => handleAmount(e.target.className)}> <span className="icon"><AiOutlineMinus/></span> </button>
            <div> {amountWanted}  </div>
            <button className="upper" onClick={(e) => handleAmount(e.target.className)}><span className="icon"> <AiOutlinePlus/></span> </button>
          </div>
        </td>
        <td className='total-td'>
          <p> {formatToCurrency(product.price*amountWanted)} </p>
        </td>
        <td>
          <button className="closingButton" onClick={() => deleteProduct()}> <span className="icon"><AiOutlineDelete/></span> </button>
        </td>
    </tr>
  )
}