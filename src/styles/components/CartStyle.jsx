import styled from "styled-components";
import { PrimaryBtn } from "./UtilsStyles";
import { WrapperContent } from './WrapperContent'

export const WrapperContentCart = styled(WrapperContent)`
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

export const TableStyle  = styled.table`
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

export const HandleAmountBtn = styled(PrimaryBtn)`
    background-color: ${({theme}) => theme.colors.cartActionBtn};
    color: black;
    padding: .2rem 0.5rem 0;
`

export const ClosingBtn = styled(PrimaryBtn)`
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