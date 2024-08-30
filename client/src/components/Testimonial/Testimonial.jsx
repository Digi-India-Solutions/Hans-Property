import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

const testimonials = [
    {
        id: 1,
        image: 'https://avatars.githubusercontent.com/u/138967484?v=4',
        name: 'Harsh Vardhan Mishra',
        position: 'Developer',
        review: 'Hans Builders provided an exceptional home-buying experience with their professional team and quality properties. Highly recommended!',
        rating: 5.0
    },
    {
        id: 2,
        image: 'https://avatars.githubusercontent.com/u/145193630?v=4',
        name: 'Mannu Sharma',
        position: 'Designer',
        review: 'Fantastic service! The team was attentive, and the property exceeded my expectations. A truly smooth process from start to finish.',
        rating: 4.8
    },
    {
        id: 3,
        image: 'https://avatars.githubusercontent.com/u/138967484?v=4',
        name: 'Sonia Kapoor',
        position: 'Marketing Specialist',
        review: 'Great experience with Hans Builders. They made finding and renting a home effortless. Excellent customer service and quality options.',
        rating: 4.9
    },
    {
        id: 4,
        image: 'https://avatars.githubusercontent.com/u/138967484?v=4',
        name: 'Raj Patel',
        position: 'Entrepreneur',
        review: 'Professional and reliable. The team at Hans Builders helped me find the perfect home with minimal hassle. Very satisfied!',
        rating: 5.0
    }
];


const Testimonial = () => {
    return (
        <>
            <section className="testimonial__section see__pad p_relative">
                <div className="layer__bg">
                    <div className="anim-icon">
                        <div data-parallax="{&quot;x&quot;: -200}" className="icon layer-bg" style={{ backgroundImage: 'url(assets/images/shape/shape-04.png)' }} />
                    </div>
                    <div className="container">
                        <div className="sec-title text-center">
                            <div className="sub__title">
                                <span>Our Testimonial</span>
                            </div>
                            <h2>What Our Client <span> Says </span> </h2>
                        </div>
                        <OwlCarousel 
                            className="testimonial-carousel owl-theme" 
                            loop 
                            margin={10} 
                            nav 
                            items={3} 
                            dots={false} 
                            autoplay
                            autoplayTimeout={3000}
                            responsive={{
                                0: { items: 1 },
                                600: { items: 2 },
                                1000: { items: 3 }
                            }}
                        >
                            {testimonials.map(testimonial => (
                                <div key={testimonial.id} className="testimonial__block">
                                    <div className="inner__box">
                                        <div className="image__box">
                                            <figure className="image">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </figure>
                                        </div>
                                        <div className="review">
                                            <ul>
                                                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                                                    <li key={i}><span className="icon-icon-43" /></li>
                                                ))}
                                                <li><span>{testimonial.rating.toFixed(1)}</span></li>
                                            </ul>
                                        </div>
                                        <div className="test__monial__text">
                                            <p>{testimonial.review}</p>
                                        </div>
                                        <div className="t__title">
                                            <h5>{testimonial.name}</h5>
                                            <p>{testimonial.position}</p>
                                        </div>
                                        <div className="icon__outer">
                                            <span className="icon-quote" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Testimonial;
