import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FormatedIndianPrice from '../../components/FormatedIndianPrice/FormatedIndianPrice';
import MetaTag from '../../components/Meta/MetaTags';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Approved');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from session storage
    const storedUser = JSON.parse(sessionStorage.getItem('hansBuilderUser'));

    if (storedUser) {
      setUserData(storedUser);

      // Fetch properties listed by the user
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-properties-by-vendor/${storedUser._id}`)
        .then(response => {
          setProperties(response.data.data);
          filterProperties(response.data.data, 'Approved');
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const filterProperties = (properties, status) => {
    const filtered = properties.filter(property => property.status === status);
    setFilteredProperties(filtered);
  };

  const handleTabChange = (status) => {
    setActiveTab(status);
    filterProperties(properties, status);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hansBuilderUser');
    sessionStorage.removeItem('hansBuilderToken');
    navigate('/login');
  };

  const handleResetPassword = () => {
    navigate('/profile/reset-password');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (

    <>

      <MetaTag
        title="User Profile | Hans Property"
        description="View and manage your profile on Hans Property. Access your personal information, property listings, and account details with ease."
        keyword="user profile, Hans Property, manage profile, account details, real estate, property management"
      />

      <section className="page__title p_relative my-5">
        <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
        </div>
        <div className="container">
          <div className="content-box p_relative">
            <h1 className="title">Your Profile</h1>
            <ul className="bread-crumb">
              <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
              <li><span className="icon-57" />Your Profile</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="profile-details bg-light p-3 rounded">
              <h4 className="text-primary">Profile Details</h4>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <p><strong>Account Created At:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="col-md-4 mt-md-0">
            <div className="profile-actions text-end">
              <h4 className="text-primary mb-3">Actions</h4>
              <button onClick={handleResetPassword} className="btn btn-secondary btn-block">Reset Password</button>
              &nbsp;
              <button onClick={handleLogout} className="btn btn-danger btn-block">Logout</button>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex flex-wrap justify-content-between align-items-center">
          <h3 className="text-secondary mb-2">Listed Properties</h3>
          <Link to="/profile/add-property" className="btn-1">
            Add New Property
          </Link>
        </div>

        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Approved' ? 'active' : ''}`}
              onClick={() => handleTabChange('Approved')}
            >
              Approved
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => handleTabChange('Pending')}
            >
              Pending
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Rejected' ? 'active' : ''}`}
              onClick={() => handleTabChange('Rejected')}
            >
              Rejected
            </button>
          </li>
        </ul>

        {filteredProperties.length > 0 ? (
          <div className="row mt-4">
            {filteredProperties.map(property => (
              <div className="col-md-4 mb-3" key={property._id}>
                <div className="card">
                  <img src={property.images[0]} className="card-img-top" alt={property.title} />
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.description}</p>
                    <p><strong>Price:</strong> ₹{FormatedIndianPrice(property.price)}</p>
                    <p><strong>Category:</strong> {property.category}</p>
                    <p><strong>Type:</strong> {property.type}</p>
                    <p><strong>Location:</strong> {property.locality}, {property.state}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No properties found under {activeTab} status.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
