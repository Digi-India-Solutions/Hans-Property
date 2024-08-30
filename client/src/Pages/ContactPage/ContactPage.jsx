import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaTag from '../../components/Meta/MetaTags';

const ContactPage = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.target);
    formData.append("access_key", "ff14c527-5f59-4cfa-8e2d-07ecd1f43852");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        setMessage("Email sent successfully!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  return (
    <>

      <MetaTag
        title="Contact Us - Hans Builders"
        description="Get in touch with Hans Builders for your real estate needs. Located at RZF-904/14, Raj Nagar Part-II, Palam Colony, N.D-45. Call us at +91 9350619539 or email hansbuilderdwarka@gmail.com."
        keyword="Hans Builders contact, real estate contact, Hans Builders address, contact Hans Builders, real estate inquiries, Hans Builders phone number, Hans Builders email"
      />


      {/* ----- BreadCrumb ----    */}
      <section className="page__title p_relative">
        <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
        </div>
        <div className="container">
          <div className="content-box p_relative">
            <h1 className="title">Contact Us</h1>
            <ul className="bread-crumb">
              <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
              <li><span className="icon-57" />Contact Us</li>
            </ul>
          </div>
        </div>
      </section>

      {/* contact*/}
      <section className="contact__style__one see__pad">
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 info-column">
              <div className="contact-info mr_70">
                <h3>Lets talk!</h3>
                <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out. We're here to help and answer any questions you may have. Let's connect and discuss how we can assist you.</p>
                <div className="contact__info__block">
                  <div className="left__site__info">
                    <div className="contact__icon one">
                      <span className="icon-56" />
                    </div>
                  </div>
                  <div className="right__site__info one">
                    <h5>Call us</h5>
                    <a href="tel:+919350619539">+91 9350619539</a>
                  </div>
                </div>
                <div className="contact__info__block">
                  <div className="left__site__info">
                    <div className="contact__icon two">
                      <span className="icon-55" />
                    </div>
                  </div>
                  <div className="right__site__info two">
                    <h5>E-mail Address</h5>
                    <a href="mailto:hansbuilderdwarka@gmail.com">hansbuilderdwarka@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-column">
              <div className="form-inner">
                <div className="contact___title">
                  <h3> Send us a message </h3>
                  <p>If you have any questions, inquiries, or feedback, we’re here to help. Reach out to us by filling out the form below, and our team will get back to you as soon as possible. We value your input and look forward to assisting you.</p>
                </div>

                <form onSubmit={onSubmit} id="contact-form">
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input type="text" name="username" placeholder="Your Name" required />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ps-xl-0 form-group">
                      <input type="email" name="email" placeholder="Your email" required />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea name="message" placeholder="Message" defaultValue={""} />
                    </div>
                    <div className="col-12">
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn mr-0">
                      <div className="more__buttons">
                        <button className="common-btn btn__two" type="submit" name="submit-form">{loading ? "Please wait..." : "Send Your Message"} <i className="icon-icon-51" /></button>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* contact end*/}

    </>
  )
}

export default ContactPage