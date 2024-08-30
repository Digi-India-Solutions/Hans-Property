import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader';
import formatDate from '../../components/formatDate/formatDate';
import FormatedIndianPrice from '../../components/FormatedIndianPrice/FormatedIndianPrice';
import MetaTag from '../../components/Meta/MetaTags';

const PropertyDetailByCategory = () => {

    const { categoryName, titleName } = useParams();

    const newCategoryName = categoryName.replace(/-/g, ' ');
    const newTitleName = titleName.replace(/-/g, ' ');

    const [property, setProperty] = useState(null);
    const [listedProperty, setListedProperty] = useState([])

    const fetchPropertyByPropertyTitle = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/property-by-name/${newTitleName}`);
            if (response.data.success) {
                setProperty(response.data.data);
            } else {
                console.error('Failed to fetch property');
            }
        } catch (error) {
            console.error('Error fetching Property:', error);
        }
    };

    const fetchPropertyByCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approved-properties/${newCategoryName}`);
            if (response.data.success) {
                const reverseData = response.data.data.reverse();
                setListedProperty(reverseData);
            } else {
                console.error('Error fetching Properties: In Else');
            }
        } catch (error) {
            console.error('Error fetching Properties:', error);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        fetchPropertyByPropertyTitle();
        fetchPropertyByCategory();
    }, [categoryName, titleName]);


    return (
        <>
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">{newTitleName}</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" /><Link className='text-white' to={`properties/${newCategoryName.replace(/\s+/g, '-')}`}>{newCategoryName}</Link></li>
                        </ul>
                    </div>
                </div>
            </section>

            {property ? (
                <>
                    <MetaTag
                        title={`${property.title} | ${property.type}`}
                        description={`Discover the details of ${property.title}. This ${property.type} property is listed at ₹${property.price}. Located in ${property.locality}, ${property.state}, it offers a spacious area of ${property.areaSize} sq ft, built in ${property.yearBuilt}. Ideal for buyers looking for quality real estate.`}
                        keyword={`${property.title}, ${property.type} property, ${property.locality} real estate, ${property.state} property, premium property, property for sale, ${property.description}`}
                    />


                    <section className="property__details pt-20 pb-140">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-12 pb-30">
                                    <div className="property__details__content">

                                        <div className="property__one pb-3">
                                            <div className="property__one__left">
                                                <h3>{property.title}</h3>
                                                <ul className="place__info">
                                                    <li><span className="icon-icon-31" /> <Link to={property.mapLink}>Location</Link></li>
                                                    <li><span className="icon-icon-23" /> {formatDate(property.createdAt)}</li>
                                                </ul>
                                            </div>
                                            <div className="property__one__right">
                                                <span className="price">₹{FormatedIndianPrice(property.price)}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            {property.images && property.images.map((image, index) => (
                                                <div className="col-md-4 col-sm-6 mb-2" key={index}>
                                                    <div className="property__image__box">
                                                        <img src={image} alt={`Property image ${index + 1}`} className="img-fluid" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="property__two">
                                            <div className="property__two__title">
                                                <h4>About This Property</h4>
                                            </div>
                                            <div className="property__two__content">
                                                <p>{property.description}</p>
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
                                                                    <span className="text__bold">Home Area:</span>
                                                                </div>
                                                                <div className="property__type__info__content">
                                                                    <span>{property.areaSize} sqft</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="property__type__info__list">
                                                            <div className="property__type__block">
                                                                <div className="property__type__info__content">
                                                                    <span className="text__bold">Baths:</span>
                                                                </div>
                                                                <div className="property__type__info__content">
                                                                    <span>{property.bathrooms} </span>
                                                                </div>
                                                            </div>
                                                            <div className="property__type__block">
                                                                <div className="property__type__info__content">
                                                                    <span className="text__bold">Beds:</span>
                                                                </div>
                                                                <div className="property__type__info__content">
                                                                    <span>{property.bedrooms}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="property__type__info__list">
                                                            <div className="property__type__block">
                                                                <div className="property__type__info__content">
                                                                    <span className="text__bold">Year built:</span>
                                                                </div>
                                                                <div className="property__type__info__content">
                                                                    <span>{property.yearBuilt}</span>
                                                                </div>
                                                            </div>
                                                            <div className="property__type__block">
                                                                <div className="property__type__info__content">
                                                                    <span className="text__bold">Price:</span>
                                                                </div>
                                                                <div className="property__type__info__content">
                                                                    <span>₹{(FormatedIndianPrice(property.price))}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-12">
                                    <div className="blog__sidebar default__sidebar">
                                        <div className="sidebar__widget about__author">
                                            <h4 className="title">Contact Owner</h4>
                                            <div className="author__info">
                                                <figure className="author__thumb">
                                                    <img src="https://res.cloudinary.com/dtk5bwcgi/image/upload/v1724999528/logo_1_1_weqnny.png" alt={property.vendor.name} />
                                                </figure>
                                                <div className="re__post__content">
                                                    {/* <h5 className='mb-2'>{property.vendor.name}</h5> */}
                                                    <h5 className=''>Hans Property</h5>
                                                    <a href="tel:+919350619539">+91-9350619539</a>
                                                    <div className="team__media mb-15">
                                                        <ul>
                                                            <li><a href="tel:+919350619539"><span className="icon-icon-35" /></a></li>
                                                            <li><a href="#"><span className="icon-icon-27" /></a></li>
                                                            <li><a href="#"><span className="icon-icon-14" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="author__text">
                                                <p>{property.vendor.description || "Contact for more details."}</p>
                                            </div>
                                        </div>

                                        {/* Latest Listings */}
                                        <div className="sidebar__widget post__widget">
                                            {listedProperty.length > 0 ? (
                                                <>
                                                    <div className="widget-title">
                                                        <h4 className="title">Latest Listings</h4>
                                                    </div>
                                                    <div className="widget-content">
                                                        <div className="post-inner">
                                                            {/* Display properties */}
                                                            {listedProperty.slice(0, 3).map(listing => (
                                                                <div className="post" key={listing.id}>
                                                                    <figure className="post__thumb mb-0">
                                                                        <Link to={`/property/${listing.category.replace(/\s+/g, '-')}/${listing.title.replace(/\s+/g, '-')}`}>
                                                                            <img src={listing.images[0]} alt={listing.title} />
                                                                        </Link>
                                                                    </figure>
                                                                    <div className="re__post__content">
                                                                        <h6>
                                                                            <Link to={`/property/${listing.category.replace(/\s+/g, '-')}/${listing.title.replace(/\s+/g, '-')}`}>
                                                                                {listing.title}
                                                                            </Link>
                                                                        </h6>
                                                                        <div className="location">
                                                                            <p><span className="icon-icon-36" /> {listing.state}, {listing.locality}</p>
                                                                        </div>
                                                                        <div className="price__post">
                                                                            <p>₹{listing.price.toLocaleString()}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {/* Show "View All" button if more than 3 properties are available */}
                                                            {listedProperty.length > 3 && (
                                                                <div className="mt-3 text-center">
                                                                    <Link to={`/properties/${newCategoryName.replace(/\s+/g, '-')}`} className="btn-1">
                                                                        View All {newCategoryName}
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <p>No properties available.</p>

                                            )}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default PropertyDetailByCategory;
