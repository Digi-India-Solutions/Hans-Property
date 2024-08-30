import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePageProperty = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approved-properties`);

                if (response.data && Array.isArray(response.data.data)) {
                    const reverseData = response.data.data.reverse()
                    setProperties(reverseData); // Access the data array within the response object
                } else {
                    setIsError(true); // Handle the case where data is not an array
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                setIsError(true);
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoading(false); // Stop loading after the fetch is complete
            }
        };
        fetchProperties();
    }, []);

    if (isLoading) {
        return <p>Loading properties...</p>; // Display while fetching properties
    }

    if (isError || properties.length === 0) {
        return null; // If there's an error or no properties, render nothing
    }

    return (
        <div className="homepage-properties">
            <div className="grid-4">
                {properties.slice(0, 12).map((property) => (
                    <div key={property._id} className="property-single-col">
                        <Link to={`/property/${property.category.replace(/\s+/g, '-')}/${property.title.replace(/\s+/g, '-')}`} className="img">
                            <div className="absolute category-tag">{property.category}</div>
                            <img src={property.images[0]} alt={property.title} />
                        </Link>

                        <Link to={`/property/${property.category.replace(/\s+/g, '-')}/${property.title.replace(/\s+/g, '-')}`} className="pro-detail">
                            <p className="pro-name">{property.title}</p>
                            <address>{property.state}, {property.locality}</address>
                            <p className="brief-info">
                                {property.type} | {property.bedrooms} Beds | {property.bathrooms} Baths
                            </p>
                            <p className="price">
                                ₹{property.price.toLocaleString()}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            {properties.length > 4 && (
                <div className='text-center mt-20'>
                    <Link to="/properties" className="view-all-btn">
                        View All Properties
                    </Link>
                </div>

            )}
        </div>
    );
};

export default HomePageProperty;
