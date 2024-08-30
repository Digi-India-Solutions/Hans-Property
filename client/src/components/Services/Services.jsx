import React from 'react'

const Services = () => {
    return (
        <>
            <section className="service__two see__pad p_relative">
                <div className="anim-icon">
                    <div className="icon icon-01 float-bob-y" style={{ backgroundImage: 'url(assets/images/icons/icon-21.svg)' }} />
                    <div className="icon icon-02 float-bob-y" style={{ backgroundImage: 'url(assets/images/icons/icon-22.svg)' }} />
                </div>
                <div className="service__two__content">
                    <div className="container">
                        <div className="sec-title text-center">
                            <div className="sub__title">
                                <span>Our Services</span>
                            </div>
                            <h2>Our Main <span> Focus </span> </h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="inner__content">
                                    <div className="icon__box">
                                        <div className="icon__outer">
                                            <div className="icon__bg">
                                                <span className="icon-icon-06" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service__text">
                                        <h4><a href="services-details.html">Buy a home</a> </h4>
                                        <p>Find your perfect home with ease. Quality properties, and expert guidance from start to finish.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="inner__content">
                                    <div className="icon__box">
                                        <div className="icon__outer">
                                            <div className="icon__bg">
                                                <span className="icon-icon-07" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service__text">
                                        <h4><a href="services-details.html">Find a home</a></h4>
                                        <p>Discover your ideal home effortlessly. Quality options, expert guidance, and a seamless experience await.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="inner__content">
                                    <div className="icon__box">
                                        <div className="icon__outer">
                                            <div className="icon__bg">
                                                <span className="icon-icon-17" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service__text">
                                        <h4><a href="services-details.html">Rent a home</a></h4>
                                        <p>Find the perfect rental with ease. Quality homes, flexible options, and expert support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Services