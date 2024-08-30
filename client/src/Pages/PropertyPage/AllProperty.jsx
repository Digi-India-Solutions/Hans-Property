import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import FormatedIndianPrice from '../../components/FormatedIndianPrice/FormatedIndianPrice';
import MetaTag from '../../components/Meta/MetaTags';

const AllProperty = () => {
    const [properties, setProperties] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Filter states
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertyCategories, setPropertyCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000000]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');

    // Fetch property types
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

    // Fetch property categories
    const fetchPropertyCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-property-category`);
            if (response.data.success) {
                setPropertyCategories(response.data.data);
            } else {
                toast.error('Failed to load Property Categories');
            }
        } catch (error) {
            console.error('Error fetching Property Categories:', error);
        }
    };

    // Fetch locations
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-location`);
            if (response.data.success) {
                setStates(response.data.data);
            } else {
                toast.error('Failed to load Locations');
            }
        } catch (error) {
            console.error('Error fetching Locations:', error);
        }
    };

    // Fetch properties with filters
    const fetchProperties = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approved-properties`);
            // console.log('API Response:', response.data);  // Debugging
            if (response.data.success) {
                const filteredProperties = response.data.data.filter(property =>
                    (selectedType ? property.type === selectedType : true) &&
                    (selectedCategory ? property.category === selectedCategory : true) &&
                    (selectedState ? property.state === selectedState : true) &&
                    (selectedLocality ? property.locality === selectedLocality : true) &&
                    (property.price >= priceRange[0] && property.price <= priceRange[1])
                );
                setProperties(filteredProperties.reverse());
                setIsError(filteredProperties.length === 0);
            } else {
                toast.error('Failed to load Properties');
                setIsError(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Properties:', error);
            setIsError(true);
            setIsLoading(false);
        }
    };

    // Handle 'View More' button click
    const handleViewMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 2);
            setIsLoading(false);
        }, 1000);
    };

    // Displayed properties based on visible count
    const displayedProperties = properties.slice(0, visibleCount);

    // Fetch data when component mounts or filters change
    useEffect(() => {
        fetchPropertyTypes();
        fetchPropertyCategories();
        fetchLocations();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [selectedType, selectedCategory, selectedState, selectedLocality, priceRange]);

    // Handle state selection change
    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setLocalities(states.find(s => s.state === state)?.locality || []);
        setSelectedLocality('');
    };

    return (
        <>
            <MetaTag
                title="Browse All Properties | Hans Property"
                description="Explore a wide range of properties listed on Hans Property. Find your ideal home or investment opportunity from our extensive collection of residential and commercial properties."
                keyword="properties for sale, real estate listings, Hans Property, residential properties, commercial properties, property search"
            />

            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Our Properties</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />Our Properties</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="propertiest__section page propertiest__grid p_relative see__pad">
                <div className="container">
                    {/* Filter Section */}
                    <div className="filter-section mb-4">
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
                                <label>Category</label>
                                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-control">
                                    <option value="">All Categories</option>
                                    {propertyCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>State</label>
                                <select value={selectedState} onChange={handleStateChange} className="form-control">
                                    <option value="">All States</option>
                                    {states.map((state) => (
                                        <option key={state._id} value={state.state}>{state.state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Locality</label>
                                <select value={selectedLocality} onChange={(e) => setSelectedLocality(e.target.value)} className="form-control">
                                    <option value="">All Localities</option>
                                    {localities.map((locality) => (
                                        <option key={locality} value={locality}>{locality}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label>Price Range</label>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="100000000"
                                    step="50000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, e.target.value])}
                                />
                                <span>₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Show message if no properties are available */}
                        {isError && (
                            <div className="col-12 text-center">
                                <h3>No properties available</h3>
                            </div>
                        )}
                    </div>
                    <div className="grid-4">
                        {/* Display Properties */}
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
                                    <p className="price">
                                        ₹{FormatedIndianPrice(property.price)}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-12 text-center mt-4">
                        {isLoading ? <Loader /> : (
                            visibleCount < properties.length && (
                                <button onClick={handleViewMore} className="btn btn-primary">View More</button>
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllProperty;
