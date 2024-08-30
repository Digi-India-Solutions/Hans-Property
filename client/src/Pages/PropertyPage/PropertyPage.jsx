import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const locations = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Chandigarh"
];


const propertyTypes = [
    "Laxury",
    "Classic",
    "Modern",
    "New"
];

const cities = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Chandigarh",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore"
];


const filters = [
    "Washer",
    "Sauna",
    "Outdoor Shower",
    "Laundry",
    "Swimming Pool",
    "TV Cable",
    "Air Conditioning",
    "Barbeque",
    "Gym"
];


const propertiesData = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Ready Resort for Sell',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Shop For Rent Eaton Centre',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Modern Villa For Rent',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Fortune Condo Town',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Ready Resort for Sell',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Shop For Rent Eaton Centre',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Modern Villa For Rent',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Fortune Condo Town',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Ready Resort for Sell',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Shop For Rent Eaton Centre',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXvmtstIw5lLFbNnQ4I0Ev3CH1j6nrtcygA&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Modern Villa For Rent',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNQra1sdsf-K6UUd6MW4kCz7ds5iscYQ6Ww&s',
        detailsLink: 'property/detail',
        price: '₹25,235.00',
        period: 'yr',
        category: 'Residentials',
        title: 'Fortune Condo Town',
        details: ['03', '02', '600 Sq Ft', '2'],

    },
];

const properties = [
    {
        id: 1,
        name: "KBC Kushwaha Homes",
        bhk: "2, 3, 4 BHK Apartments",
        address: "Sector 15 Dwarka, South West Delhi, New Delhi",
        image: "https://housing-images.n7net.in/4f2250e8/41e2c6a70d5229ac5ab60b13ae733d60/v0/medium/goyal_floors_1-sector_15_dwarka-delhi-goyal_builders.jpeg",
        link: "/property/detail",
        tag: "Rent"
    },

];

const PropertyPage = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState("What you are looking ?");
    const [selectedPropertyType, setSelectedPropertyType] = useState("Property Type");
    const [selectedCity, setSelectedCity] = useState("All Cities");

    const handleChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleViewMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 4);
            setIsLoading(false);
        }, 1000);
    };

    const displayedProperties = propertiesData.slice(0, visibleCount);

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
                        <h1 className="title">All Properties</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />Properties</li>
                        </ul>
                    </div>
                </div>
            </section>



            {/* ==== Property Grid  ====  */}
            <section className="propertiest__section page propertiest__grid p_relative see__pad">
                <div className="container">
                    <div className="propertiest__advanced__search">
                        <div className="property__form_two">

                            <form className="reserve-form">
                                <div className="advance__search">
                                    <h5>Advanced Search</h5>
                                    <ul className="advance__search__one">
                                        <li>
                                            <div className="form-group clearfix">
                                                <div className="top__title clearfix">
                                                    <div className="icon">
                                                        <span className="icon-icon-33" />
                                                    </div>
                                                    <label>Location</label>
                                                </div>
                                                <select className="wide" value={selectedLocation} onChange={(e) => handleChange(e, setSelectedLocation)} style={{ display: 'none' }}>
                                                    <option value="What you are looking ?">What you are looking ?</option>
                                                    {locations.map((location, index) => (
                                                        <option key={index} value={location}>{location}</option>
                                                    ))}
                                                </select>
                                                <div className="nice-select wide" tabIndex={0}>
                                                    <span className="current">{selectedLocation}</span>
                                                    <ul className="list">
                                                        {locations.map((location, index) => (
                                                            <li key={index} data-value={location} className={`option ${selectedLocation === location ? 'selected' : ''}`}>
                                                                {location}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-group clearfix">
                                                <div className="top__title">
                                                    <div className="icon">
                                                        <span className="icon-icon-16" />
                                                    </div>
                                                    <label>Property Type</label>
                                                </div>
                                                <select className="wide" value={selectedPropertyType} onChange={(e) => handleChange(e, setSelectedPropertyType)} style={{ display: 'none' }}>
                                                    <option value="Property Type">Property Type</option>
                                                    {propertyTypes.map((type, index) => (
                                                        <option key={index} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                                <div className="nice-select wide" tabIndex={0}>
                                                    <span className="current">{selectedPropertyType}</span>
                                                    <ul className="list">
                                                        {propertyTypes.map((type, index) => (
                                                            <li key={index} data-value={type} className={`option ${selectedPropertyType === type ? 'selected' : ''}`}>
                                                                {type}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-group clearfix">
                                                <div className="top__title">
                                                    <div className="icon">
                                                        <span className="icon-icon-36" />
                                                    </div>
                                                    <label>All Cities</label>
                                                </div>
                                                <select className="wide" value={selectedCity} onChange={(e) => handleChange(e, setSelectedCity)} style={{ display: 'none' }}>
                                                    <option value="All Cities">All Cities</option>
                                                    {cities.map((city, index) => (
                                                        <option key={index} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                                <div className="nice-select wide" tabIndex={0}>
                                                    <span className="current">{selectedCity}</span>
                                                    <ul className="list">
                                                        {cities.map((city, index) => (
                                                            <li key={index} data-value={city} className={`option ${selectedCity === city ? 'selected' : ''}`}>
                                                                {city}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-group clearfix">
                                                <div className="top__title slider">
                                                    <div className="icon">
                                                        <span className="icon-icon-13" />
                                                    </div>
                                                    <label>Price</label>
                                                </div>
                                                <div className="range-slider clearfix">
                                                    <div id="price-range">
                                                        <div className="section price">
                                                            <p id="price-value" className="price-value"> <span /> </p>
                                                            <div className="price-slider" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="advance__search two mt-4">
                                    <h5 className='h4 fs-600'>Would you like to more filter?</h5>
                                    <div className="search__option">
                                        <div className="advance__search__content">
                                            <div className="advance__search__last pb-15 pt-20">
                                                {filters.map((filter, index) => (
                                                    <div className="form-group" key={index}>
                                                        <div className="check-box">
                                                            <input className="check" type="checkbox" id={`checkbox_0${index + 1}`} />
                                                            <label htmlFor={`checkbox_0${index + 1}`}>{filter}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group message-btn">
                                            <a href="index-4.html" className="common-btn btn__two"> Find Property <i className="icon-icon-51" /></a>
                                        </div>
                                    </div>
                                </div>
                            </form>



                        </div>
                    </div>
                    <div className="propertiest__grid__contect pt-40">
                        <div className="row">

                            {/* <div className="col-xl-12 col-lg-12">
                                <div className="propertiest__contents">
                                    <div className="row">
                                        {displayedProperties.map((property) => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 pb-30" key={property.id}>
                                                <div className="inner-box">
                                                    <div className="image-box">
                                                        <figure className="image">
                                                            <Link to={property.detailsLink}>
                                                                <img src={property.image} alt={property.title} />
                                                            </Link>
                                                        </figure>
                                                        <div className="image__icon__box">
                                                            <ul className="image__icon clearfix">
                                                                <li> <Link ><span className="icon-icon-31" /></Link></li>
                                                                <li><Link > <span className="icon-icon-02" /></Link></li>
                                                                <li><a href={property.image} className="lightbox-image p_relative" data-fancybox="gallery"><span className="icon-icon-47" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="price__section">
                                                            <div className="price">
                                                                <span>{property.price} / <span className="year">{property.period}</span> </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="lower-content">
                                                        <div className="review__section">
                                                            <div></div>
                                                            <div className="catagory">
                                                                <span>{property.category}</span>
                                                            </div>
                                                        </div>
                                                        <div className="properties__title">
                                                            <h4> <Link to={property.detailsLink}>{property.title}</Link> </h4>
                                                        </div>
                                                        <ul className="more__details">
                                                            {property.details.map((detail, index) => (
                                                                <li key={index}><span className={`icon-icon-0${index + 4}`} />{detail}</li>
                                                            ))}
                                                        </ul>
                                                        <div className="author-info">
                                                            <div className="view__btn">
                                                                <Link to={property.detailsLink} className='h5'>View Details <span className="icon-57" /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {isLoading && (
                                        <Loader/>
                                    )}
                                    {!isLoading && visibleCount < propertiesData.length && (
                                        <div style={{ display:'flex' , alignItems:'center', justifyContent:'center' }}>
                                            <button onClick={handleViewMore} className="common-btn btn__two">
                                                View More <i className="icon-icon-51" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div> */}


                            <div className="row">
                                {properties.map((property) => (
                                    <div key={property.id} className="property-single-col col-md-3 col-6">
                                        <Link to={property.link} className="img">
                                            <div className="absolute">{property.tag}</div>
                                            <img src={property.image} alt={property.name} />
                                        </Link>
                                        <Link to={property.link} className="pro-detail">
                                            <p className='pro-name'>{property.name}</p>
                                            <small className='bhk'>{property.bhk}</small>
                                            <address>{property.address}</address>
                                        </Link>
                                        <div className="contact-btn">Contact</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default PropertyPage