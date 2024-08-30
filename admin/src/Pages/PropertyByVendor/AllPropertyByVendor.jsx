import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllPropertyByVendor = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All'); // State for filter

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-users`);
                setUsers(res.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch properties when a user is selected or status filter changes
    const fetchPropertiesByUser = async (userId, filterStatus = statusFilter) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-properties-by-vendor/${userId}`);
            let properties = res.data.data;

            if (filterStatus !== 'All') {
                properties = properties.filter(property => property.status === filterStatus);
            }

            if (properties.length === 0) {
                toast.info('No properties available for the selected user.');
            }

            setProperties(properties);
        } catch (error) {
            toast.info('No properties available for the selected user.');
        }
    };

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
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Property has been deleted.",
                        icon: "success"
                    });

                    // Refresh properties
                    if (selectedUser) {
                        fetchPropertiesByUser(selectedUser);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'An error occurred');
                }
            }
        });
    };

    // Handle user selection
    const handleUserSelect = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        if (userId) {
            fetchPropertiesByUser(userId);
        } else {
            setProperties([]);
        }
    };

    // Handle status change
    const handleStatusChange = async (id, status) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}/status`, { status });
            toast.success(`Property status updated to ${status}`);
            fetchPropertiesByUser(selectedUser); // Refetch properties to reflect the updated status
        } catch (error) {
            console.error('Error updating property status', error);
            toast.error('Failed to update status');
        }
    };

    // Handle status filter change
    const handleStatusFilterChange = (e) => {
        const newStatusFilter = e.target.value;
        setStatusFilter(newStatusFilter);
        if (selectedUser) {
            fetchPropertiesByUser(selectedUser, newStatusFilter); // Pass the new filter to the fetch function
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Select User to View Properties</h4>
                </div>
                <div className="links">
                    <select className="form-select mb-3" onChange={handleUserSelect}>
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} - {user.email}
                            </option>
                        ))}
                    </select>
                    {selectedUser && (
                        <select className="form-select mb-3" onChange={handleStatusFilterChange}>
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    )}
                </div>
            </div>

            <section className="dis-table mt-4">
                <div className="container">
                    <div className="row justify-content-center">
                        {selectedUser ? (
                            properties.length > 0 ? (
                                properties.map((property) => (
                                    <div key={property._id} className="col-md-6 col-lg-4 mb-4">
                                        <div className="card property-card shadow-lg border-0 h-100">
                                            <div className="card-header bg-gradient-primary text-white text-center py-3">
                                                <h5 className="card-title mb-0">{property.title}</h5>
                                            </div>
                                            <div className="card-body d-flex flex-column">
                                                <p className="card-text description"><strong>Description:</strong> {property.description}</p>
                                                <div className="mt-auto">
                                                    <p className="card-text"><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
                                                    <p className="card-text"><strong>Location:</strong> {property.locality}, {property.state}</p>
                                                    <p className="card-text"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                                    <p className="card-text"><strong>Bathrooms:</strong> {property.bathrooms}</p>
                                                    <p className="card-text"><strong>Year Built:</strong> {property.yearBuilt}</p>
                                                    <p className="card-text"><strong>Created At:</strong> {new Date(property.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="card-footer bg-light text-center">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="me-2"><strong>Status:</strong></span>
                                                    <select
                                                        value={property.status}
                                                        onChange={(e) => handleStatusChange(property._id, e.target.value)}
                                                        className="form-select form-select-sm w-auto"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(property._id)}
                                                    className="btn btn-danger btn-sm mt-3 w-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No properties available for the selected user.</p>
                            )
                        ) : (
                            <p>Please select a user to view their properties.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllPropertyByVendor;
