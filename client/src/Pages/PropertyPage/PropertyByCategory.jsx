import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import FormatedIndianPrice from '../../components/FormatedIndianPrice/FormatedIndianPrice';
import MetaTag from '../../components/Meta/MetaTags';

const PropertyByCategory = () => {
    const { categoryName } = useParams();

    const [properties, setProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [states, setStates] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000000]);

    // Fetch Properties by Category
    const fetchPropertyByCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approved-properties/${categoryName}`);
            if (response.data.success) {
                const reverseData = response.data.data.reverse();
                setAllProperties(reverseData);
                setProperties(reverseData);
                setIsError(reverseData.length === 0);
            } else {
                toast.error('Failed to load Properties');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error fetching Properties:', error);
            setIsError(true);
        }
    };

    // Fetch Locations
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-location`);
            if (response.data.success) {
                const locationData = response.data.data;
                setStates(locationData.map(location => location.state));
                setLocalities(locationData.reduce((acc, location) => {
                    if (!acc[location.state]) acc[location.state] = [];
                    acc[location.state].push(...location.locality);
                    return acc;
                }, {}));
            } else {
                toast.error('Failed to load locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    // Fetch Property Types
    const fetchPropertyTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/properties/types`);
            if (response.data.success) {
                setPropertyTypes(response.data.data);
            } else {
                toast.error('Failed to load Property Types');
            }
        } catch (error) {
            console.error('Error fetching Property Types:', error);
        }
    };

    // Filter Properties
    const filterProperties = () => {
        let filtered = [...allProperties];

        if (selectedState) {
            filtered = filtered.filter(property => property.state === selectedState);
        }

        if (selectedLocality) {
            filtered = filtered.filter(property => property.locality && property.locality.includes(selectedLocality));
        }

        if (selectedType) {
            filtered = filtered.filter(property => property.type === selectedType);
        }

        filtered = filtered.filter(property => property.price >= priceRange[0] && property.price <= priceRange[1]);

        setProperties(filtered);
    };

    const handleViewMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 4);
            setIsLoading(false);
        }, 1000);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedLocality(''); // Reset locality when state changes
    };

    const handlePriceChange = (event) => {
        const { value } = event.target;
        setPriceRange([priceRange[0], Number(value)]);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        fetchPropertyByCategory();
        fetchLocations();
        fetchPropertyTypes();
    }, [categoryName]);

    useEffect(() => {
        filterProperties();
    }, [selectedState, selectedLocality, selectedType, priceRange]);

    const displayedProperties = properties.slice(0, visibleCount);

    return (
        <>
            {categoryName && (
                <MetaTag
                    title={`Browse ${categoryName} Properties | Hans Property`}
                    description={`Discover a range of ${categoryName} properties on Hans Property. Find your perfect home or investment opportunity among our carefully curated listings in this category.`}
                    keyword={`${categoryName} properties, ${categoryName} real estate, Hans Property, property listings, buy ${categoryName}, ${categoryName} homes`}
                />
            )}

            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">{categoryName} Properties</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />{categoryName}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="filter-section mb-4 mt-20">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <label>Property Type</label>
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="form-control">
                                <option value="">All Types</option>
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label>State</label>
                            <select value={selectedState} onChange={handleStateChange} className="form-control">
                                <option value="">All States</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label>Locality</label>
                            <select value={selectedLocality} onChange={(e) => setSelectedLocality(e.target.value)} className="form-control">
                                <option value="">All Localities</option>
                                {localities[selectedState]?.map((locality, index) => (
                                    <option key={index} value={locality}>{locality}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label>Price Range</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="100000000"
                                step="50000"
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                            />
                            <span>₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="propertiest__section page propertiest__grid p_relative see__pad">
                <div className="container">
                    <div className="row">
                        {isError && (
                            <div className="col-12 text-center">
                                <h3>No properties available in {categoryName}</h3>
                            </div>
                        )}
                    </div>
                    <div className="grid-4 ">
                        {!isError && displayedProperties.map((property) => (
                            <div key={property._id} className="property-single-col ">
                                <Link to={`/property/${property.category.replace(/\s+/g, '-')}/${property.title.replace(/\s+/g, '-')}`} className="img">
                                    <div className="absolute category-tag">{property.category}</div>
                                    <img src={property.images[0]} alt={property.title} />
                                </Link>

                                <Link to={`/property/${property.category.replace(/\s+/g, '-')}/${property.title.replace(/\s+/g, '-')}`} className="pro-detail">
                                    <p className='pro-name'>{property.title}</p>
                                    <address>{property.state}, {property.locality}</address>
                                    <p className="brief-info">
                                        {property.type} | {property.bedrooms} Beds | {property.bathrooms} Baths
                                    </p>
                                    <p className="price">₹{FormatedIndianPrice(property.price)}  </p>
                                    <p className='bhk'>{property.areaSize} sq.ft</p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {isLoading && <Loader />}

                    {!isLoading && !isError && visibleCount < properties.length && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button onClick={handleViewMore} className="common-btn btn__two">
                                View More <i className="icon-icon-51" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default PropertyByCategory;
