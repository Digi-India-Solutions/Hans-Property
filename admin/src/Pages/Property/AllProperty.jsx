import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const AllProperty = () => {
    const [properties, setProperties] = useState([]);
    const [propertyCategory, setPropertyCategory] = useState([]);
    const [propertyType, setPropertyType] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedVendor, setSelectedVendor] = useState(null); // Selected vendor details
    const [showViewModal, setShowViewModal] = useState(false); // View property modal visibility
    const [selectedProperty, setSelectedProperty] = useState(null); // Selected property details
    const itemPerPage = 8;

    const navigate = useNavigate();

    const fetchPropertyCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-property-category`);
            if (response.data.success) {
                setPropertyCategory(response.data.data);
            } else {
                toast.error('Failed to load locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            toast.error('An error occurred while fetching locations');
        }
    };

    const fetchPropertyTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/properties/types`);
            if (response.data.success) {
                setPropertyType(response.data.data);
            } else {
                toast.error('Failed to load locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            toast.error('An error occurred while fetching locations');
        }
    };

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-properties`);
            const main = res.data.data.reverse();
            setProperties(main);
            setFilteredProperties(main);
        } catch (error) {
            console.error('There was an error fetching the Properties!', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        handleFetch();
        fetchPropertyCategories();
        fetchPropertyTypes();
    }, []);

    useEffect(() => {
        const tempProperties = properties.filter(property =>
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProperties(tempProperties);
    }, [searchQuery, properties]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-property/${id}`);
                    toast.success("Property Deleted Successfully");
                    handleFetch();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Property has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'An error occurred');
                }
            }
        });
    };

    const handleStatusChange = async (id, status) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}/status`, { status });
            toast.success(`Property status updated to ${status}`);
            handleFetch();
        } catch (error) {
            console.error('Error updating property status', error);
            toast.error('Failed to update status');
        }
    };

    const showVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setShowModal(true);
    };

    const showPropertyDetails = (property) => {
        setSelectedProperty(property);
        setShowViewModal(true);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Properties</h4>
                </div>
                <div className="links">
                    <button onClick={() => navigate('/add-property')} className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="selects">
                    <label htmlFor="status">Filter by Status: </label> &nbsp;
                    <select
                        id="status"
                        onChange={(e) => {
                            const status = e.target.value;
                            if (status === 'All') {
                                setFilteredProperties(properties);
                            } else {
                                setFilteredProperties(properties.filter(property => property.status === status));
                            }
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <section className="dis-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">State</th>
                            <th scope="col">Locality</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type</th>
                            <th scope="col">Area</th>
                            <th scope="col">Bedrooms</th>
                            <th scope="col">Bathrooms</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Status</th>
                            <th scope="col">View</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((property, index) => (
                            <tr key={property._id}>
                                <th scope="row">{indexOfFirstItem + index + 1}</th>
                                <td>{property.title}</td>
                                <td>{property.price}</td>
                                <td>{property.state}</td>
                                <td>{property.locality}</td>
                                <td>{property.type}</td>
                                <td>{property.category}</td>
                                <td>{property.areaSize}</td>
                                <td>{property.bedrooms} Bed</td>
                                <td>{property.bathrooms} Bathroom</td>
                                <td>
                                    <span
                                        className="owner-name"
                                        onClick={() => showVendorDetails(property.vendor)}
                                    >
                                        {property.vendor?.name || 'N/A'}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={property.status}
                                        onChange={(e) => handleStatusChange(property._id, e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => showPropertyDetails(property)} className="bt view">
                                        View <i className="fa-solid fa-eye"></i>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => navigate(`/edit-property/${property._id}`)} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(property._id)} className="bt delete">
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(properties.length / itemPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            {/* Modal for vendor details */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedVendor ? (
                        <div>
                            <p><strong>Name:</strong> {selectedVendor.name}</p>
                            <p><strong>Email:</strong> {selectedVendor.email}</p>
                            <p><strong>Phone Number:</strong> {selectedVendor.phoneNumber}</p>
                            <p><strong>Role:</strong> {selectedVendor.role}</p>
                        </div>
                    ) : (
                        <p>No vendor details available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for property details */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Property Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProperty ? (
                        <div>
                            
                            <h5>{selectedProperty.title}</h5>
                            <p><strong>Location:</strong> {selectedProperty.state} , {selectedProperty.locality}</p>
                            <p><strong>Price:</strong> {selectedProperty.price}</p>
                            <p><strong>Type:</strong> {selectedProperty.type}</p>
                            <p><strong>Area:</strong> {selectedProperty.areaSize} sq.ft</p>
                            <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
                            <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>
                            {selectedProperty.images.map((imag,indexx)=>(
                                <img key={indexx} src={imag} alt={selectedProperty.title} className='p-1' style={{ width: '48%', height: '250px' }} />
                            ))}
                            {/* Add more property details as needed */}
                        </div>
                    ) : (
                        <p>No property details available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AllProperty;
