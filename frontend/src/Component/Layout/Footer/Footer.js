import React from 'react'
import "../Footer/Footer.css"
import appstore from "../../../images/Appstore.png";
import playstore from "../../../images/playstore.png";


const Footer = () => {

  return (
    <>
      <div id='myFooter'>
          <div className='left-footer'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App For Andriod And IOS Mobile Phones</p>
            <img style={{width:"12vmax"}}src={playstore} alt="playstore" />
            <img style={{width:"12vmax"}} src={appstore} alt="appstore" />
          </div>

          <div className='mid-footer'>
              <h1>EShopping</h1>
              <p>Products With Verified Quality At Reasonale Price is our Priority</p>
              <p>Copyright 2023 &copy; Rv</p>
          </div>

          <div className='right-footer'>
            <h4>Follow Us</h4>
            <a href="https://www.instagram.com/rupeshkumar_v">Instagram</a>
            <a href="*">YouTube</a>
            <a href="*">Facebook</a>
          </div>
      </div>
    </>
  )
}

export default Footer