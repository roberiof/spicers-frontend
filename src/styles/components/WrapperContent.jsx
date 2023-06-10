import styled from "styled-components"

export const WrapperContent = styled.div`
  background-color: #ffffff;
  max-width: 1200px;
  width: 95%;
  margin: 8rem auto;
  padding: 2rem;
  border-radius: 10px;
  line-height: 2rem;
  position: relative;
  h1{
    text-align: center;
    padding-bottom: 3rem;
    font-weight: 500;
    color: ${({h1PrimaryColor, theme}) => { 
      return h1PrimaryColor ? theme.colors.primaryDark : '#000'
    }}
  }
  h2{
    color: ${({theme}) => theme.colors.primary};
    font-style: italic;
    margin-bottom: 1rem 
  }

  h3{
    text-decoration: underline;
    margin-bottom: .4rem;
  }  

  p{
    color: ${({theme, isParagraphLight}) => {
      if(isParagraphLight)
        return theme.colors.lightText
      }
    };
  }

  // strong texts inside "contact us" page
  .strong-text{
    font-weight: bold;
    color: #000000;
  }

  .strong-email{
    font-weight: bold;
    color: ${({theme}) => theme.colors.primaryDark};
  }

  @media(max-width: ${({theme}) => theme.medias.sm}){
    padding-inline: 1rem;
    h1{
      font-size: 1.8rem;
    }
    h2{
      font-size: 1.2rem
    }
  }
`