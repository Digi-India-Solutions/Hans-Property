import React from 'react'

const Counter = () => {
    return (
        <>
            <section classname="funfact__section p_relative centred see__pad">
                <div classname="funfact__content">
                    <div classname="container">
                        <div classname="inner__container p_relative ">
                            <div classname=" col-lg-3 col-md-6 col-sm-6 col-12 counter-block-one wow slideInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                <div classname="inner-box">
                                    <div classname="icon__image">
                                        <img src="assets/images/resource/fun-fact-01.svg" alt />
                                    </div>
                                    <div classname="count-outer count-box">
                                        <span classname="count-text" data-speed="{1500}" data-stop="{180}">0 </span>
                                        <span>+</span>
                                    </div>
                                    <p>Rooms</p>
                                </div>
                            </div>
                            <div classname="col-lg-3 col-md-6 col-sm-6 col-12 counter-block-one wow slideInUp animated" data-wow-delay="100ms" data-wow-duration="1500ms">
                                <div classname="inner-box">
                                    <div classname="icon__image">
                                        <img src="assets/images/resource/fun-fact-02.svg" alt />
                                    </div>
                                    <div classname="count-outer count-box">
                                        <span classname="count-text" data-speed="{1500}" data-stop="{1100}"> 0</span><span>+</span>
                                    </div>
                                    <p>Working Hours</p>
                                </div>
                            </div>
                            <div classname="col-lg-3 col-md-6 col-sm-6 col-12 counter-block-one wow slideInUp animated" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div classname="inner-box">
                                    <div classname="icon__image">
                                        <img src="assets/images/resource/fun-fact-03.svg" alt />
                                    </div>
                                    <div classname="count-outer count-box">
                                        <span classname="count-text" data-speed="{1500}" data-stop="{300}">0</span> <span>+</span>
                                    </div>
                                    <p>Happy Customers</p>
                                </div>
                            </div>
                            <div classname="col-lg-3  col-md-6 col-sm-6 col-12 counter-block-one wow slideInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                                <div classname="inner-box">
                                    <div classname="icon__image">
                                        <img src="assets/images/resource/fun-fact-04.svg" alt />
                                    </div>
                                    <div classname="count-outer count-box">
                                        <span classname="count-text" data-speed="{1500}" data-stop="{300}">0</span> <span>+</span>
                                    </div>
                                    <p>Awards Winning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Counter