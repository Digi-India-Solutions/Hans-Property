import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Services from '../../components/Services/Services';
import Testimonial from '../../components/Testimonial/Testimonial';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import HomePageProperty from './HomePageProperty';
import MetaTag from '../../components/Meta/MetaTags';

const Home = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedType, setSelectedType] = useState('Rent');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSubLocation, setSelectedSubLocation] = useState('');
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Added state for selected category

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch property types
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/properties/types`)
      .then(response => {
        if (response.data.success) {
          setPropertyTypes(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching property types:', error);
      });

    // Fetch locations
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-location`)
      .then(response => {
        if (response.data.success) {
          setLocations(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });

    // Fetch property categories
    fetchPropertyCategories();
  }, []);

  const fetchPropertyCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-property-category`);
      if (response.data.success) {
        setPropertyCategories(response.data.data);
        setSelectedCategory(response.data.data[0]); // Default to the first category
      } else {
        console.error('Failed to load property categories');
      }
    } catch (error) {
      console.error('Error fetching property categories:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?type=${selectedType}&state=${selectedLocation}&locality=${selectedSubLocation}&category=${selectedCategory}`);
  };

  return (
    <>

      <MetaTag
        title="Hans Builders - Trusted Real Estate Experts"
        description="Founded in 2017, Hans Builders, led by Kailash Chand Khandelwal and Groovin Khandelwal, has been a leading name in the real estate industry, helping clients find their dream properties in Dwarka and beyond."
        keyword="Hans Builders, Hans Property, real estate Hans Builders, property Hans Builders, Dwarka real estate, Hans Builders website, real estate experts Hans Builders, Hans Builders contact, Hans Builders property management"
      />

      <section className="banner__one p_relative">
        {/* Banner and other content */}
        <div className="banner__one__content">
          <div className="banner__one__left">
            <div className="banner__tab__section">
              <div className="tabs-box">
                <div className="tab-btn-box p_relative">
                  <ul className="tab-btns tab-buttons clearfix">
                    {propertyCategories.map((category, index) => (
                      <li
                        key={index}
                        className={`tab-btn ${selectedCategory === category ? 'active-btn' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span className="tab___all">{category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tabs-content wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '0ms', animationName: 'fadeInUp' }}>
                  <div className="tab active-tab" id="tab-2">
                    <div className="inner-box">
                      <div className="property__form">
                        <form onSubmit={handleSearch} className="reserve-form">
                          {/* Location, Sub Location, and Property Type Selects */}
                          <div className="form-group">
                            <div className="top__title">
                              <div className="icon">
                                <span className="icon-icon-33" />
                              </div>
                              <label>Location</label>
                            </div>
                            <div className="select-wrapper">
                              <select
                                className="wide"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                              >
                                <option value="">Select State</option>
                                {locations.map(location => (
                                  <option key={location._id} value={location.state}>
                                    {location.state}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="top__title">
                              <div className="icon">
                                <span className="icon-icon-33" />
                              </div>
                              <label>Sub Location</label>
                            </div>
                            <div className="select-wrapper">
                              <select
                                className="wide"
                                value={selectedSubLocation}
                                onChange={(e) => setSelectedSubLocation(e.target.value)}
                              >
                                <option value="">Select Locality</option>
                                {locations
                                  .find(location => location.state === selectedLocation)
                                  ?.locality.map((locality, index) => (
                                    <option key={index} value={locality}>
                                      {locality}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          {/* 
                          <div className="form-group">
                            <div className="top__title">
                              <div className="icon">
                                <span className="icon-icon-16" />
                              </div>
                              <label>Property Type</label>
                            </div>
                            <div className="select-wrapper">
                            <select
                              className="wide"
                              value={selectedType}
                              onChange={(e) => setSelectedType(e.target.value)}
                            >
                              {propertyTypes.map((type, index) => (
                                <option key={index} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            </div>
                          </div> */}

                          <div className="form-group message-btn centred">
                            <button type="submit" className="theme-btn-one">
                              <span className="icon-57" />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional banner content */}
            <div className="apartment_number">
              <h5>We have more than <span>1,000</span> apartments and places to choose from.</h5>
            </div>
            <div className="banner__botom__section">
              <div className="bottom__content">
                <div className="content__block">
                  <img src="https://avatars.githubusercontent.com/u/138967484?v=4" alt />
                  <img src="https://avatars.githubusercontent.com/u/145193630?v=4" alt />
                  <img src="https://avatars.githubusercontent.com/u/138967484?v=4" alt />
                </div>
                <div className="content__block">
                  <p>1k+ People</p>
                  <p>Successfully Getting House</p>
                </div>
                <div className="content__block">
                  <div className="logo__image">
                    <img src="assets/images/banner/banner-one-logo.png" alt />
                  </div>
                  <p>Excellent <span>100+</span> reviews</p>
                </div>
              </div>
            </div>
          </div>
          {/* Banner right side */}
          <div className="banner__one__right">
            <div className="image__one">
              <figure className="image-box wow slideInUp animated animated animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '0ms', animationName: 'slideInUp' }}><img src="assets/images/banner/banner-01.jpg" alt /></figure>
            </div>
          </div>

        </div>
      </section>

      <section className="property-list see__pad ">
        <div className="container">
          <div className="sec-title md-mb-5  text-center">
            <div className="sub__title">
              <span>Our Properties</span>
            </div>
            <h2>Our <span> Property </span> </h2>
          </div>
          <HomePageProperty />
        </div>
      </section>

      <Services />
      <Testimonial />
    </>
  );
}

export default Home;
