import styled from 'styled-components'

export const ViewIcon = styled.span`
  cursor: pointer;
  position: absolute;
  padding-top: .5rem;
  right: 3%;
  z-index: 1;
  color: ${({theme}) => theme.colors.lightText}; 
  *{
    pointer-events: none ;
  }
`