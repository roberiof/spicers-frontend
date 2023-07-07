import React , {useEffect} from 'react'

import { WrapperContent } from "../styles/components/UtilsStyles";

export default function AboutUs(){
  useEffect( () =>{
    window.scroll(0,0)
  }, [])
  
  return(
    <WrapperContent h1PrimaryColor={true} isParagraphLight={true}>
      <h1>About Us</h1>
      <h2>Spicers Owned and Operated Since 1997</h2>
      <h2>The longest-operating spicy products store in the US</h2>

      <div style={{marginTop: '2rem'}}>
        <h3>Our Mission</h3>
        <p>We offer unparalleled customer service and the highest pepper products—all in one location. Spicers is a one-stop shopping destination for all things spicy. </p>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3>Our Guarantee</h3>
        <p>If it’s not good, we don’t offer it, period. You can shop with confidence knowing that if it doesn’t meet our personal ethics, you won’t find it in our store. No need to worry about checking labels and ingredient lists on the items we sell to scrutinize for bad quality ingredients, because there aren't any. We’ve done the work for you, so you can shop in confidence that as a customer, you’ll be able to trust the items we offer.</p>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3> The Spicers’ Difference</h3>
        <p>We may be a small business, but we’re fast and efficient.  We work around the clock to get orders out as quickly as we can, because we know that nobody likes waiting too long to get what they’ve ordered, so we do our best to ship every order as quickly as possible.  </p>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3>Working Together</h3>
        <p>Every shipment that leaves our store is a vote in order to represent all love we feel about pepper and make this spice community bigger!</p>
        <p>Thank you for making us your supplier of spicy products, and if we can assist in any way just call or email and we’ll be here to help you! </p>
      </div>

      <div style={{marginTop: '2rem'}}>
        <p>
          Sincerely,
          <br />
          Spicers.com Team
        </p>
      </div>
    </WrapperContent>
  )
}