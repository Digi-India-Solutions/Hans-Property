import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'




const listings = [
    {
        id: 1,
        title: "House for Sell",
        location: "Dwarka Sector-21",
        price: "₹25.2 LPA",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s",
        link: "/properties",
    },
    {
        id: 2,
        title: "Luxury Apartment",
        location: "Rohini Sector-3",
        price: "₹45.5 LPA",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s",
        link: "/properties",
    },
    {
        id: 3,
        title: "Villa for Sell",
        location: "Gurgaon Sector-56",
        price: "₹85.0 LPA",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s",
        link: "/properties",
    },
];



const PropertyDetail = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <>
            {/* ----- BreadCrumb ----    */}
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Ready Resort for Sell</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />Properties Details</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* image-gallery */}
            <section className="image__gallery">
                <div className="image__gallery__content">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-12 image__gallery__left">
                            <div className="inner__box" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s)' }}>
                                <div className="image__gallery__feature_image">
                                    <img className="d-block d-xxl-none" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s" alt />
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-12 image__gallery__right">
                            <div className="row">
                                <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-12 gallery__top">
                                    <div className="inner__box">
                                        <div className="image__box">
                                            <figure className="image">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s" alt />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-12 pt-4 gallery__bottom">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="inner__box">
                                                <div className="image__box">
                                                    <figure className="image">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s" alt />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 last__gallery">
                                            <div className="inner__box">
                                                <div className="image__box ">
                                                    <figure className="image">
                                                        <a href="#gallery-1" className="btn-gallery p_relative">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s" alt />
                                                            <div className="number__of__img p_absolute">
                                                                
                                                            </div>
                                                        </a>
                                                    </figure>
                                                </div>
                                            </div>
                                            <div id="gallery-1" className="hidden">
                                                <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s">Image 1</a>
                                                <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s">Image 2</a>
                                                <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s">Image 3</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* image-gallery end*/}


            {/* property__details */}
            <section className="property__details pt-60 pb-140">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12 pb-30">
                            <div className="property__details__content">
                                <div className="property__one">
                                    <div className="property__one__left">
                                        <h3>Ready Resort for Sell</h3>
                                        <ul className="place__info">
                                            <li><span className="icon-icon-31" /> Location</li>
                                            <li><span className="icon-icon-23" /> July 2, 2022</li>
                                        </ul>
                                    </div>
                                    <div className="property__one__right">
                                        <span className="price">₹25,235.00 </span>
                                        <ul className="location__info">
                                            <li><a href="#"><span className="icon-icon-31" /></a></li>
                                            <li><a ><span className="icon-icon-02" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="property__two">
                                    <div className="property__two__title">
                                        <h4>About This Property</h4>
                                    </div>
                                    <div className="property__two__content">
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                                    </div>
                                </div>
                                <div className="property__two">
                                    <div className="property__two__title">
                                        <h4>Property Type</h4>
                                    </div>
                                    <div className="property__two__content">
                                        <div className="property__type">
                                            <div className="property__type__info">
                                                <div className="property__type__info__list">

                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Home Area: </span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>120 sqft</span>
                                                        </div>
                                                    </div>
                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Lot dimensions </span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>4</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="property__type__info__list">
                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Baths:</span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>220 sqft</span>
                                                        </div>
                                                    </div>
                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Beds: </span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>14</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="property__type__info__list">
                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Year built:</span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>1852</span>
                                                        </div>
                                                    </div>
                                                    <div className="property__type__block">
                                                        <div className="property__type__info__content">
                                                            <span className="text__bold">Price:</span>
                                                        </div>
                                                        <div className="property__type__info__content">
                                                            <span>₹25,235.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="property__two">
                                    <div className="property__two__title">
                                        <h4>Amenities</h4>
                                    </div>
                                    <div className="property__two__content">
                                        <ul className="amenities" style={{ flexWrap: 'wrap' }}>
                                            <li><span className="icon-icon-49" /> TV Cable</li>
                                            <li><span className="icon-icon-49" /> Air Conditioning</li>
                                            <li><span className="icon-icon-49" /> Barbeque</li>
                                            <li><span className="icon-icon-49" /> Gym</li>
                                            <li><span className="icon-icon-49" /> Washer</li>
                                            <li><span className="icon-icon-49" /> Sauna</li>
                                            <li><span className="icon-icon-49" /> Microwave</li>
                                            <li><span className="icon-icon-49" /> Outdoor Shower</li>
                                            <li><span className="icon-icon-49" /> Laundry</li>
                                            <li><span className="icon-icon-49" /> Swimming Pool</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <div className="property__two">
                                    <div className="property__two__title">
                                        <h4>Location</h4>
                                    </div>
                                    <div className="property__two__content">
                                        <div className="location">
                                            <div className="image__box p_relative">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.6090151114627!2d77.08295547496047!3d28.73122847959285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07440faeeedd%3A0x7fd3b4b030819bdf!2sDigi%20India%20Solutions!5e0!3m2!1sen!2sin!4v1723139239811!5m2!1sen!2sin" width={'100%'} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12">
                            <div className="blog__sidebar default__sidebar">
                                <div className="sidebar__widget about__author">
                                    <h4 className="title">Contact Owner</h4>
                                    <div className="author__info">
                                        <figure className="author__thumb"><img src="https://avatars.githubusercontent.com/u/138967484?v=4" alt /></figure>
                                        <div className="re__post__content">
                                            <h5 className='mb-2'>Hans Builder</h5>
                                            <div className="team__media mb-15">
                                                <ul>
                                                    <li><a href="#"> <span className="icon-icon-35" /> </a> </li>
                                                    <li><a href="#"> <span className="icon-icon-27" /> </a> </li>
                                                    <li><a href="#"> <span className="icon-icon-14" /> </a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="author__text">
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiumt site be doloremque laudantium.</p>
                                    </div>
                                </div>
                                <div className="sidebar__widget post__widget">
                                    <div className="widget-title">
                                        <h4 className="title">Latest Listings</h4>
                                    </div>

                                    <div className="widget-content">
                                        <div className="post-inner">

                                            {listings.map(listing => (
                                                <div className="post" key={listing.id}>
                                                    <figure className="post__thumb">
                                                        <Link to={listing.link}>
                                                            <img src={listing.imageUrl} alt={listing.title} />
                                                        </Link>
                                                    </figure>
                                                    <div className="re__post__content">
                                                        <h6>
                                                            <Link to={listing.link}>{listing.title}</Link>
                                                        </h6>
                                                        <div className="location">
                                                            <p><span className="icon-icon-36" /> {listing.location}</p>
                                                        </div>
                                                        <div className="price__post">
                                                            <p>{listing.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* property__details end*/}

        </>
    )
}

export default PropertyDetail