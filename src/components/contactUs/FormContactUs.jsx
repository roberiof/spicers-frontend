import React , {useState , useEffect} from 'react'

import { SubmitBtn } from '../../styles/components/UtilsStyles'
import styled from 'styled-components'
import { getUserByEmailApi, updateUserApi } from '../../utils/GeralFunctions'

const StyledForm = styled.form`
  margin-top:1rem;
  width: 95%;
  max-width: 688px;

  .name-email-phone-div{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    div{
      display: flex;
      flex-direction: column;
    }
    input{
      padding: .8rem .5rem;
    }
      
    @media (max-width: 700px){
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }

  .message-div{
    margin-top: 1rem;
    display: flex !important;
    flex-direction: column;
    textarea{
      padding:.8rem .5rem;
      height: 5rem;
    }
  }
   
  textarea, input{
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline: none;
    border-radius: 5px;
    transition: 200ms all;
    &:focus{
      box-shadow: 0px 0px 3px 0px #000000; 
      transform: scale(1.01)
    }
  }

  button{
    padding: .8rem 1rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    margin-top: 1rem;
  }
`
export default function FormContactUs(){
  const defaultFormValues = {
    name: '', 
    email: '', 
    phone:  '', 
    message: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues)
  const [isSubmitBtnDisabled , setIsSubmitBtnDisabled] = useState(true)

  const handleInputChange = async({target}, objectKey) => {
    setFormValues(prev => {
      const newObj = {...prev}
      newObj[objectKey] = target.value
      return newObj 
    })
  }

  const verifyUserValidity = async(e) => {
    e.preventDefault()

    const user = await getUserByEmailApi(formValues.email)
    if(! user){
      alert('This email is not registered! Please, create an account!')
      return
    }
    
    storeMessage(user)
  }

  const storeMessage = async(user) =>{
    user.messages.push(formValues)
    updateUserApi(user)
    setFormValues(defaultFormValues)
  }

  const IsValidSubmitBtn = () => {
    const isAllInfoFilledUp = Object.values(formValues).every(item => item != '')
    const isPhoneNumberValid = (/^[0-9]{3}\.[0-9]{3}\.[0-9]{4}$/).test(formValues.phone)
    return (
      isAllInfoFilledUp && isPhoneNumberValid
    )
  }

  useEffect(() => {
    const response = IsValidSubmitBtn()
    setIsSubmitBtnDisabled(!response);
  }, [formValues]);

  return(
    <StyledForm>
        <div className="name-email-phone-div">
          <div>
            <label htmlFor="name"> Name<span style={{color: 'red'}}>*</span></label>
            <input type='name' id="name" placeholder="Name" required value={formValues.name} onChange={(e) => handleInputChange(e , 'name')}/>
          </div>

          <div>
            <label htmlFor="email"> Email<span style={{color: 'red'}}>*</span></label>
            <input type='email' id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e , 'email')}/>
          </div>

          <div>
            <label htmlFor="phone"> Phone <span style={{color: 'red'}}>*</span></label>
            <input type='tel' pattern="[0-9]{3}.[0-9]{3}.[0-9]{4}" placeholder="Phone (xxx.xxx.xxxx)" id="phone" required value={formValues.phone} onChange={(e) => handleInputChange(e , 'phone')}/>
          </div>
        </div>
        <div className="message-div">
          <label htmlFor="message"> Message <span style={{color: 'red'}}>*</span></label>
          <textarea placeholder="Message" id="message" required value={formValues.message} onChange={(e) => handleInputChange(e , 'message')}></textarea>
        </div>
        <SubmitBtn type="submit" onClick={(e) => verifyUserValidity(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)}> Submit </SubmitBtn>
    </StyledForm>
  )
}