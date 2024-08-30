import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader'; // Assuming you have a Loader component
import FormatedIndianPrice from '../../components/FormatedIndianPrice/FormatedIndianPrice';
import MetaTag from '../../components/Meta/MetaTags';

const PropertyBySearch = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000000]); // Adjust based on your max price
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);

  const location = useLocation();

  // Function to extract query parameters from the URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      type: searchParams.get('type') || '',
      category: searchParams.get('category') || '',
      state: searchParams.get('state') || '',
      locality: searchParams.get('locality') || '',
    };
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approved-properties`);

        if (response.data.success) {
          const fetchedProperties = response.data.data;
          setProperties(fetchedProperties);
          setPropertyTypes([...new Set(fetchedProperties.map(p => p.type))]);
          setPropertyCategories([...new Set(fetchedProperties.map(p => p.category))]);
          setStates([...new Set(fetchedProperties.map(p => p.state))]);
          setLocalities([...new Set(fetchedProperties.map(p => p.locality))]);

          const { type, category, state, locality } = getQueryParams();

          setSelectedType(type);
          setSelectedCategory(category);
          setSelectedState(state);
          setSelectedLocality(locality);

          filterProperties(fetchedProperties, type, category, state, locality);
        } else {
          setError('No properties found.');
        }
      } catch (error) {
        setError('An error occurred while fetching properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location.search]); // Dependency on URL search params

  const filterProperties = (properties, type, category, state, locality) => {
    const filtered = properties.filter(property => {
      return (
        (!type || property.type === type) &&
        (!category || property.category === category) &&
        (!state || property.state === state) &&
        (!locality || property.locality === locality) &&
        (property.price >= priceRange[0] && property.price <= priceRange[1])
      );
    });

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    filterProperties(properties, selectedType, selectedCategory, selectedState, selectedLocality);
  }, [selectedType, selectedCategory, selectedState, selectedLocality, priceRange, properties]);

  if (loading) {
    return <Loader />; // Assuming you have a Loader component
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Add appropriate styling for errors
  }

  return (
    <>
    <MetaTag
        title={`Search Results for Property | Hans Property`}
        description={`Explore the search results for Property on Hans Property. Browse through our listings to find the ideal property that matches your search criteria.`}
        keyword={`search results, Property, properties for sale, real estate listings, Hans Property`}
      />

      <div className="property-by-search-container container">
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
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="form-control">
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
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

        <div className="grid-4 mb-60">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property._id} className="property-single-col">
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
            ))
          ) : (
            <div className="row">
              <div className="col-12 text-center ">
                <h3>No properties found for the selected criteria.</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyBySearch;
