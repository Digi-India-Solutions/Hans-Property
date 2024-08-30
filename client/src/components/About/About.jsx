import React from 'react'

const About = () => {
    return (
        <>
            <section className="about__section see__pad p_relative">
                <div className="anim-icon">
                    <div className="icon icon-01 float-bob-y" style={{ backgroundImage: 'url(assets/images/icons/icon-08.svg)' }} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 col-md-12 wow slideInUp animated animated animated" data-wow-delay="300ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '300ms', animationName: 'slideInUp' }}>
                            <div className="about_left_section">
                                <div className="sec-title">
                                    <div className="sub__title">
                                        <span>About</span>
                                    </div>
                                    <h2>Hans Builder <span> Properties </span> </h2>
                                </div>
                                <div className="normal__text">
                                    <p>Hans Builders is committed to turning dreams into reality by offering quality properties tailored to your lifestyle. With a strong legacy in real estate, we focus on delivering trust, innovation, and excellence. Whether it's a cozy home or a prime commercial space, we help you find the perfect property. Our expert team ensures a seamless journey from start to finish.</p>
                                </div>
                                <div className="sell__list">
                                    <ul>
                                        <li> <span className="icon-58" /> Expert advice and guidance throughout </li>
                                        <li> <span className="icon-58" /> Creative and modern property designs </li>
                                        <li> <span className="icon-58" /> Strategically located prime properties </li>
                                        <li> <span className="icon-58" /> Top-quality construction standards </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 pe-xl-0 wow slideInUp animated animated animated" data-wow-delay="300ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '300ms', animationName: 'slideInUp' }}>
                            <div className="about_right_section pl-xl-10">
                                <div className="inner__image">
                                    <figure className="image">
                                        <img src="https://img.freepik.com/free-photo/construction-works-frankfurt-downtown-germany_1268-20907.jpg?t=st=1723184974~exp=1723188574~hmac=d7912a0e16d2766f3f5afc1f2da8bf124ade310ad209c0883cc8f5e25c5739ef&w=1060" alt="building Image" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default About