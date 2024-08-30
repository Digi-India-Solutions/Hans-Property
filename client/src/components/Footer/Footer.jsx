import React, { useEffect, useState } from 'react';
import logo from './logo.png'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Footer = () => {

  const [propertyCategory, setPropertyCategory] = useState([]);

  const fetchPropertyCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-property-category`);
      if (response.data.success) {
        setPropertyCategory(response.data.data);
      } else {
        console.error('Failed to load locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchPropertyCategories();
  }, [])

  return (
    <>
      <footer className="main-footer p_relative">
        <div className="footer-top p_relative d_block">
          <div className="icon-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-03.png)' }} />
          <div className="container">
            <div className="row clearfix">

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget left">
                  <div className="logo-widget">
                    <figure className="footer-logo"><Link to={`/`}><img src={logo} alt="logo" /></Link></figure>
                  </div>
                  <div className="widget-content">
                    <p style={{color:'white'}} >Hans Property is a trusted name in real estate, committed to helping you find your dream property. With a strong foundation built on honesty and integrity, we offer personalized services tailored to your unique needs. Our goal is to make property buying and selling a seamless and rewarding experience.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h4>Quick Links</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li><Link to={`/`}>Home</Link></li>
                      <li><Link to={`/about`}>About us</Link></li>
                      <li><Link to={`/properties`}>Property</Link></li>
                      {/* <li><Link to={`/blog`}>Blog</Link></li> */}
                      <li><Link to={`/contact`}>Contact Us</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h4>Property </h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      {propertyCategory && propertyCategory.map((category,index)=>(
                        <li><Link to={`/properties/${category.replace(/\s+/g, '-')}`} key={index}>{category}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget left">
                   <div className="widget-title">
                    <h4>Contact Details</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="info-list clearfix">
                      <li><span className="icon-icon-31" /> RZF-904/14, Raj Nagar Part-II, Palam Colony, N.D-45 (Near Malaria Hospital Sec-8, Dwarka)</li>
                      <li><span className="icon-icon-35" /> <a href="tel:+919350619539">+91 9350619539</a></li>
                      <li><span className="icon-60" /> <a href="mailto:hansbuilderdwarka@gmail.com">hansbuilderdwarka@gmail.com</a></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="footer-bottom p_relative">
          <div className="container">
            <div className="bottom-inner p_relative">
              <div className="copyright"><p> Copyright © 2024 by <Link to={`/`}>HANS BUILDERS</Link>. All Rights Reserved By <a href="https://www.digiindiasolutions.com/" target="_blank">DIGI INDIA SOLUTIONS</a></p></div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer