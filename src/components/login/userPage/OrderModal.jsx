import React from 'react'
import { useState , useEffect} from 'react'
import styled from 'styled-components'
import { AiOutlineDown , AiOutlineUp} from 'react-icons/ai'
import { formatToCurrency } from '../../../utils/GeralFunctions'
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderModalStyle = styled.div`
  margin-block: 1rem;
  cursor: pointer;
  position:relative;
`

const Order = styled.div`
  background-color: ${({ theme, IsOpen }) => IsOpen ? theme.colors.primary : 'white'};
  color: ${({ IsOpen }) => IsOpen ? 'white' : '#474747'};
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: ${({ IsOpen }) => IsOpen ? '10px 10px 0px 0px' : '0px'};
  transition: all .6s ease-in-out;
  padding: 1rem;
  display: flex;
  align-items:center;
  justify-content: space-between;
  span{
    margin-left: .5rem;
    cursor: pointer;
    font-style: italic;
    text-decoration: underline;
  }
`

const Modal = styled.div`
  z-index: -1;
  user-select: none;
  position: ${({ IsOpen }) => IsOpen ? 'static' : 'absolute'};
  background-color: white;
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-top: 0px;
  border-radius: 0px 0px 10px 10px;
  padding: 1rem;
  color: #474747;
  transform: ${({ IsOpen }) => IsOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${({ IsOpen }) => IsOpen ? '1' : '0'};
  display: flex;
  transition: opacity .2s, transform 0.3s , position 0.3s;
  width: 100%;
  span{
    cursor: pointer;
    font-style: italic;
    text-decoration: underline;
  }
`

const TableStyle  = styled.table`
  width: 100%;
  
  td{
    padding-block: 0.3rem;
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
  
  .price-td, .amount-td{
    padding-inline: 1rem;
    text-align: center;
  }

  .total-td{
    padding-left: 0.5rem;
    text-align: center;
  }

  .freightIndicator{
    color: #474747;
    margin-bottom: 1rem;
  }

  @media (max-width: ${({theme}) => theme.medias.m}) {
    tbody tr td{
      padding-bottom: 3rem;
    }
    .product-td{
      padding-right: 3rem;
      img{
        display: none;
      }
    }
  }

  @media (max-width: ${({theme}) => theme.medias.sm}) {
    .price-td{
      display: none;
    }
    .product-td{
      padding-top: 1.5rem;
      .category{
        font-size: 0.8rem;
      }
    }
    font-size: .9rem;
  }
`

const OrderModal = ( { order , orderDate}) => {
  const [IsModalOpen , setIsModalOpen] = useState(false)
  let biggerFreight = 0 

  order.forEach( product => {
    biggerFreight = biggerFreight < product[0].freight ? product[0].freight : biggerFreight
  })

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <OrderModalStyle>  
      <Order onClick={() => setIsModalOpen(!IsModalOpen)} IsOpen={IsModalOpen}>
          <p> Order N°{order[0][0]['orderNumber']} 
          
            <span>{`(${orderDate.slice(0, -3)})`} </span>
          
          </p>
          <span> { IsModalOpen ? <AiOutlineDown/> : <AiOutlineUp/> } </span>
      </Order>

      <Modal IsOpen={IsModalOpen}>
        <TableStyle>
          {order && order.map((item, index) => (
            <>
              { index == 0 && <p className='freightIndicator'> Freight: { biggerFreight !== 0 ? formatToCurrency(biggerFreight) : 'Free'} </p>}
              <tr>
                <td className="product-td">
                  { item[0].image && <img src={item[0].image} alt="Product" />}
                  <div className='name-category-div'>
                    <p> {item[0].name} </p>
                    <p className="light-text category"> {item[0].category} </p>
                  </div>
                </td>
                <td className="price-td">
                  <p> {formatToCurrency(item[0].price)} </p>
                </td>
                <td className="amount-td">
                  <p> {item[0].amountWanted}x  </p>
                </td>
                <td className='total-td'>
                  <p> {formatToCurrency(item[0].price)} </p>
                </td>
              </tr>
            </>
          ))
          }
        </TableStyle>
      </Modal>
    </OrderModalStyle>
  )
}

export default OrderModal