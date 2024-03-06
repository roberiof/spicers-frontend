import React , {useState , useEffect , useRef} from 'react'
import { PrimaryInput, SubmitBtn } from '../../styles/UtilsStyles'
import styled from 'styled-components'
import { getUserByEmailApi, updateUserApi , errorMessageAnimation, getUserByIdApi, postGenericMessage} from '../../utils/GeralFunctions'
import AOS from 'aos';
import 'aos/dist/aos.css';

const StyledForm = styled.form`
  margin-top:1rem;
  width: 95%;
  max-width: 688px;

  .name-email-phone-div{
    display: grid;
    grid-template-columns: 1fr 1fr ;
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
      grid-template-rows: 1fr 1fr ;
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
   
  textarea{
    background-color: ${({theme}) => theme.colors.input};
    border: 0;
    outline-width: 1px;
    border-radius: 5px;
    transition: 200ms all;
    &:focus{
      background-color: #f7d8d8;
      box-shadow: 0px 0px 3px 0px #D80A30; 
      transform: scale(1.01)
    }
  }

  button{
    margin-top: 2rem;
  }
`
export default function FormContactUs(){
  const loggedUserId = JSON.parse(localStorage.getItem("loggedUserId")) ? JSON.parse(localStorage.getItem("loggedUserId"))[0] : undefined
  const [ user , setUser ] = useState();
  const defaultFormValues =  {
    name: '', 
    email: '', 
    message: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues)
  const [isSubmitBtnDisabled , setIsSubmitBtnDisabled] = useState(true)
  const submitBtn = useRef()

  const handleInputChange = async({target}, objectKey) => {
    setFormValues(prev => {
      const newObj = {...prev}
      newObj[objectKey] = target.value
      return newObj 
    })
  }

  const storeGenericMessage = async(e) => {
    e.preventDefault()
    postGenericMessage(formValues)
    setFormValues(defaultFormValues)
    alert("Message sent!")
  }
  
  const storeMessageUser = async(e) =>{
    e.preventDefault()
    user.messages.push(formValues)
    updateUserApi(user)
    setFormValues(defaultFormValues)
    alert("Message sent!")
  }

  const IsValidSubmitBtn = () => {
    console.log(formValues)
    const isAllInfoFilledUp = Object.values(formValues).every(item => item != '')
    return (
      isAllInfoFilledUp
    )
  }

  useEffect(() => {
    const returnUser = async() => { 
      const res = await getUserByIdApi(loggedUserId);
      if (res !== "error") {
        setUser(res);
        setFormValues({name: res.name, email: res.email, message: ""})
      }
    }
    if (loggedUserId && !user) {
      returnUser()
    }
  }, [])

  useEffect(() => {
    const returnUser = async() => { 
      const res = await getUserByIdApi(loggedUserId);
      if (res !== "error") {
        setUser(res);
      }
    }
    if (loggedUserId && !user) {
      returnUser()
    }
  }, [])

  useEffect(() => {
    const response = IsValidSubmitBtn()
    setIsSubmitBtnDisabled(!response);
  }, [formValues]);

  useEffect(() => {
    AOS.init()
  })

  return(
    <StyledForm>
        <div className="name-email-phone-div" style={{ display: user ? 'none' : 'grid' }} >
          <div data-aos="fade-up">
            <label htmlFor="name"> Name <span style={{color: 'red'}}>*</span></label>
            <PrimaryInput type='name' id="name" placeholder="Name" required value={formValues.name} onChange={(e) => handleInputChange(e , 'name')}/>
          </div>

          <div data-aos="fade-up">
            <label htmlFor="email"> Email <span style={{color: 'red'}}>*</span></label>
            <PrimaryInput type='email' id="email" placeholder="Email" required value={formValues.email} onChange={(e) => handleInputChange(e , 'email')}/>
          </div>
        </div>
        <div className="message-div" data-aos="fade-up">
          <label htmlFor="message"> Message <span style={{color: 'red'}}>*</span></label>
          <textarea placeholder="Message" id="message" required value={formValues.message} onChange={(e) => handleInputChange(e , 'message')}></textarea>
        </div>
        <SubmitBtn id="submitContactUs" type="submit" ref={submitBtn} onClick={(e) => user ? storeMessageUser(e) : storeGenericMessage(e)} disabled={isSubmitBtnDisabled} disabled_style={JSON.stringify(isSubmitBtnDisabled)} data-aos="fade-up"> Submit </SubmitBtn>
    </StyledForm>
  )
}