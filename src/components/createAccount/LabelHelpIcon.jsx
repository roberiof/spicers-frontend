import React, {useState} from 'react'
import { useEffect } from 'react'
import { MdInfo } from 'react-icons/md'
import styled from 'styled-components'

const StyledLabelIconDiv = styled.div`
  display: flex;
  gap: .3rem;
`

const InfoIcon = styled.span`
  color: gray;
  cursor: pointer;
  align-items: center;
  gap: .2rem;
  
  display: ${({hidden}) => hidden ? 'none' : 'flex'};

  *{
    pointer-events: none ;
  }
`

const HelpInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  p {  
    line-height: 1.5rem;
    color: ${({theme}) => 'white'};
    font-size: 13px;
    background-color: ${({theme}) => theme.colors.helpInfoDiv};
    padding-inline: 0.5rem;
    border-radius: 0px 0px 5px 5px;
  }
  .time-bar{
    border-radius: 5px 5px 0px 0px;
    padding-block: 0.1rem;
    background-color: ${({theme}) => theme.colors.primary};
    animation: timeBar 2.5s linear;
  }

  @keyframes timeBar {
    0% {
      width: 0%;
    }
    50%{
      width: 50%;
    }
    100% {
      width: 100%;
    }
  }

`

export default function LabelHelpIcon({helpText, labelName, hidden}){
  const labelNameCapitalized = labelName[0].toUpperCase() + labelName.slice(1)
  const [isHelpInfoDivsActive, setIsHelpDivsActive] = useState({
    name: false, 
    email: false,
    password: false,
    confirmationPassword: false
  })

  const handleShowHelpInfo = (helpDivKey) =>{
    setIsHelpDivsActive(prev => {
      const newObj = {...prev}
      newObj[helpDivKey] = true  
      return newObj
    })

    setTimeout(() => { 
      setIsHelpDivsActive(prev => {
        const newObj = {...prev}
        newObj[helpDivKey] = false  
        return newObj
      })
    }, 2500)
  }

  return(
    <StyledLabelIconDiv>
      <label htmlFor={labelName}> {labelNameCapitalized}</label>
      <InfoIcon onMouseEnter={() => handleShowHelpInfo(labelName)} hidden={hidden}> < MdInfo /> </InfoIcon>
      {isHelpInfoDivsActive[labelName] && 
        <HelpInfoDiv>
            <div className="time-bar"></div>
            <p>{helpText}</p>
        </HelpInfoDiv>
      }
    </StyledLabelIconDiv>
  )
}