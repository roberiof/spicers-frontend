import React, {useEffect} from "react"

import FormContactUs from "../components/contactUs/FormContactUs";

import { WrapperContent } from "../styles/components/WrapperContent";

export default function ContactUs(){  
  useEffect( () => {
    window.scrollTo(0,0)
  }, [])

  return(
    <>
      <WrapperContent h1PrimaryColor={true} isParagraphLight={true}>
        <h1> Contact Us</h1>
        <h2> Got some questions or you just need help? </h2>

        <div style={{marginTop: "1.5rem"}}>
          <p> Need help with an existing order you've placed?
          Contact us at <a href='#' className="strong-email">info@spicers.com</a></p>
        </div>

        <div style={{marginTop: "1.5rem"}}>
          <p> Questions on shipping costs or best shipping to choose for both domestic orders Contact us at <a href='#' className="strong-email">info@spicers.com</a> for details.</p>
        </div>

        <div style={{marginTop: "1.5rem"}}>
          <p> For general product questions, product suggestions, ordering questions, marketing, or other information, please write us at <a href='#' className="strong-email"> questions@spicers.com </a> </p>
        </div>

        <div style={{marginTop: "1.5rem"}}>
          <p>Are you a vendor interested in submitting a product for our store to carry? Email <a href='#' className="strong-email"> questions@spicers.com</a> for details.</p>
        </div>
        
        <div style={{marginTop: "1.5rem"}}>
          <p> Want to give us a call?  Please try us at either of the numbers below</p>
          <p className="strong-text" style={{marginTop: '2rem'}}> Toll-free: 833-407-0747 </p>
        </div>

        <div style={{marginTop: "2rem"}}>
          <h2> Send us a message </h2>
          <p> Leave a message and we'll get back to you shortly.</p>
          <FormContactUs/>
        </div>
      </WrapperContent>
    </>
  )
}