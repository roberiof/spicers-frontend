import styled from 'styled-components'

export const BackPageIcon = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  top: .5rem;
  left: 1rem ;
  display: flex;
  align-items: center;  
  gap: .5rem;
  &:hover{
    transform: translateY(-4px);
    ::after{
        content:'Go back to ${({page}) => page} page';
        font-size: .8rem;
      }
  }
`