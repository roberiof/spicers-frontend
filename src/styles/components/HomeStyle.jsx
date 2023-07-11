import styled from "styled-components";
import bgHome from '../../assets/bgHome.jpg'
import { PrimaryBtn } from "./UtilsStyles";

export const WrapperHome = styled.div`
  background-color: #ffffff;
  .presentation{
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${bgHome});
    background-size: cover;
    .text{
      color: #ffffff;
      max-width: 700px;
      position: absolute;
      left: 8%;
      top:50%;
      transform: translateY(-50%);
      
      h1{
        text-shadow: 1px 1px 10px black;
        margin-bottom: 1rem;
        font-size: 3rem;
        font-weight: 800;
        .colored-h1{
          font-weight: inherit;
          color: ${ ({theme}) => theme.colors.primary};
        }
        @media (max-width: ${({theme}) => theme.medias.m}) {
          font-size: 2rem;
        }
      }
      p{  
        font-weight: bold;
        @media (max-width: ${({theme}) => theme.medias.sm}){
          font-size: 1rem;
        }
      }
      @media (max-width: ${({theme}) => theme.medias.sm}){
        text-align: center;
        width: 100%;
        padding-inline: 1.5rem;
        left: 0;
      }
    }
  }
`

export const WrapperCards = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  padding-block: 5rem;
  display: flex;
  row-gap: 4rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

export const CardStyle = styled.div`
  width: 20rem;
  height: 36rem;
  box-shadow: 0px 0px 5px 0px black;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  img{
    object-fit: cover;
    width: 100%;
    height: 25rem;
  }
  .card-text{
    padding: 1rem;
    .product-name{
      font-weight: bolder;
    }
    .product-category{
      color: ${({theme}) => theme.colors.lightText}
    }
    .card-price-text{
      .price{
        font-size: 1.2rem;
      }
      margin-block: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
    }
  }
  .add-div{
    display: flex;
    select{
      border-width: 0px 1px 0px 0px;
      text-align: center;
      width: 25%;
      color: #ffffff;
      background-color: ${({theme}) => theme.colors.primary};
      border-radius: 10px 0px 0px 10px;
      cursor: pointer;
      option{
        text-align: center
      }
      &::-webkit-scrollbar{
        width: 8px;
      }
      &::-webkit-scrollbar-thumb{
        background-color: ${({theme}) => theme.colors.secondaryDark};
        border-radius: 20px;
      }
    }
  }
`

export const StockInfo = styled.div`
  background-color:${({inStock,theme}) => inStock ? theme.colors.success : theme.colors.fail};
  width: fit-content;
  padding: .15rem .75rem ;
  border-radius: 50px;
  color: #ffffff;
  font-weight: 500;
  font-size: .9rem;
` 
  
export const AddCartBtn = styled(PrimaryBtn)`   
  background-color: ${({theme}) => theme.colors.primary};
  color: #ffffff;
  width: 75%;
  padding: 0.5rem 1rem;
  border-radius: 0px 10px 10px 0px;
`

export const SoldOutBtn = styled(PrimaryBtn)`   
  background-color: ${({theme}) => theme.colors.soldOutBtn};
  color: #000000;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`