import React, {useState} from 'react'

import { SubmitBtn } from '../../styles/components/UtilsStyles'
import styled from 'styled-components'

const FormStyled = styled.form`
  width: 95%;
  max-width: 488px;

  div{
    display: flex;
    flex-direction: column;
  }

  input{
    padding: .8rem .5rem;
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline: none;
    border-radius: 5px;
    &:focus{
      box-shadow: 0px 0px 3px 0px #000000; 
      transform: scale(1.01)
    }
  }

  button[type= "submit"]{
    padding: .8rem 1rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: #fff;
    margin-top: 1rem;
    cursor: pointer;
  }
`

export default function CreateProductSection(){
  const defaultProductValue = {
    name: '',
    category: '',
    image: '',
    price: null,
    freight: null,
    amount: null,
    amountWanted: 0,
  }
  const [product, setProduct] = useState(defaultProductValue)
  
  const handleInputChange = (event, key) => {
    setProduct(prev => {
      const newObj = {...prev}
      newObj[key] = event.target.value
      return newObj
    })
  }

  return(
    <>   
      <h2 style={{marginTop: "2rem"}}> Create/Add product </h2>  
      <FormStyled>
        <div>
          <label htmlFor="name"> Name<span style={{color: 'red'}}>*</span></label>
          <input type='text' id="name" placeholder="Product Name" required value={product.name}
          onChange={(e) => handleInputChange(e, 'name')}
          />
        </div>

        <div>
          <label htmlFor="category"> Category <span style={{color: 'red'}}>*</span></label>
          <input type='text' id="category" placeholder="Category" required value={product.category} onChange={(e) => handleInputChange(e, 'category')}/>
        </div>

        <div>
          <label htmlFor="image"> Image <span style={{color: 'red'}}>*</span></label>
          <input type='text' id="image" placeholder="Image URL link" required  value={product.image}
          onChange={(e) => handleInputChange(e, 'image')}/>
        </div>
        
        <div>
          <label htmlFor="price"> Price <span style={{color: 'red'}}>*</span></label>
          <input type='text' id="price" placeholder="Price" required  value={product.price}
          onChange={(e) => handleInputChange(e, 'price')}/>
        </div>

        <div>
          <label htmlFor="price"> Freight <span style={{color: 'red'}}>*</span></label>
          <input type='text' id="price" placeholder="Price" required  value={product.price}
          onChange={(e) => handleInputChange(e, 'price')}/>
        </div>

        <div>
          <label htmlFor="amount"> Amount <span style={{color: 'red'}}>*</span></label>
          <input type='text' id="amount" placeholder="Total amount in your stock" required  value={product.amount}
          onChange={(e) => handleInputChange(e, 'amount')}/>
        </div>

        <SubmitBtn type="submit" onClick={(e) => validateProduct(e)}> Create </SubmitBtn>
      </FormStyled>
    </>
  )
}