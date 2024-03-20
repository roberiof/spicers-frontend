import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {formatToCurrency, getProductsApi, getLocalStorage, ProductsCartLSKey} from '../utils/GeralFunctions'
import RowProduct from '../components/cart/RowProduct'
import Summary from '../components/cart/Summary'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BackPageIcon } from '../styles/UtilsStyles'
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components'
import { WrapperContent } from '../styles/UtilsStyles'

const WrapperContentCart = styled(WrapperContent)`
  .content{
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 95%;
    max-width: 1000px;
    margin: auto;
    @media (max-width:720px) {
      flex-direction: column;
    }
  }

  section{
    width: 65%;
  }

  aside{
    width: 30%;
  }

  section, aside{
    @media (max-width:720px) {
      width: 100% !important;
    }
  }
`

const TableStyle  = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead{
    border-width: 0px 0px 1px 0px;
    border-color: ${({theme}) => theme.colors.tableBorder};
    border-style: solid;
    th{
      padding: .5rem;
      color: ${({theme}) => theme.colors.lightText}

    }
  }
  tbody tr  td{
    font-size: .9rem;
    padding-top: 2rem;
  }
  
  tr{
    position: relative;
  }

  .thead-product{
    text-align: left;
  }

  .empty-message{
    padding-top: 1rem;
    text-align: center;
  }

  .product-td{
    padding-right: .5rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    img{
      object-fit: cover;
      width: 80px;
      height:100px;
    }
    .category{
      font-size: .85rem;
    }
  }
  
  .price-td{
    padding-inline: 1rem;
    text-align: center;
  }

  .amount-td{
    padding-inline: 1rem;
    text-align: center;
    .amount-div{
      display: flex;
      justify-content: center;
      div{
        background-color: ${({theme}) => theme.colors.input};
        width: 1rem;
      }
      .upper{
        border-radius: 0px 10px 10px 0px;
      }
      .lower{
        border-radius: 10px 0px 0px 10px ;
      }
    }
  }

  .total-td{
    padding-left: 0.5rem;
    text-align: center;
  }

  .icon{
    pointer-events: none;
  }

  @media (max-width: ${({theme}) => theme.medias.m}) {
    tbody tr td{
      padding-bottom: 3rem;
    }
    .thead-product{
      text-align: center;
    }
    .product-td{
      padding-left: 1rem;
      img{
        display: none;
      }
    }
  }

  @media (max-width: ${({theme}) => theme.medias.sm}) {
    .price-td, .price-th{
      display: none;
    }
    .product-td{
      padding-top: 3.5rem;
    }
  }
`

export default function Cart(){
  const [prodsCart, setProdsCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setProdsCart(getLocalStorage(ProductsCartLSKey) ?? [])
    window.scrollTo(0,0)
    AOS.init()
  }, [])
  
  return (
    <WrapperContentCart>
      <BackPageIcon page={"home"}  onClick={() => navigate('/')}>
        <IoMdArrowRoundBack/>
      </BackPageIcon>

      <h1> Your Cart </h1>
      <div className='content'>
        <section>
          <TableStyle>
            <thead>
              <tr> 
                <th className='thead-product  light-text'> Product </th>
                <th className="light-text price-th"> Price </th>
                <th className="light-text amount-th"> Amount </th>
                <th className="light-text"> Total </th>
              </tr>
            </thead>
            <tbody>
              {prodsCart && prodsCart.map( (product, index) => (
                <RowProduct 
                  key={index} 
                  product={product} 
                  setProdsCart={setProdsCart}
                  getProductsApi={getProductsApi}
                  formatToCurrency={formatToCurrency}
                />
              ))}
              {prodsCart.length === 0 && <tr><td colSpan={4} className='empty-message' data-aos="fade-up"> The cart is empty!</td></tr>}
            </tbody>
          </TableStyle>
        </section>
        <aside>
          <Summary 
            setProdsCart={setProdsCart} 
            prodsCart={prodsCart}
            formatToCurrency={formatToCurrency}
          />
        </aside>
      </div>
    </WrapperContentCart>
  )
}