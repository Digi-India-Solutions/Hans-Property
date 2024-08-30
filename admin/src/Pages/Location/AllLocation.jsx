import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllLocation = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({ state: '', locality: [] });
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [showModal, setShowModal] = useState(false);
    
    // State for filter and search
    const [selectedState, setSelectedState] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [stateOptions, setStateOptions] = useState([]);

    // --- Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-location`);
            const main = res.data.data.reverse(); // Reversing the data
            setLocations(main);
            setFilteredLocations(main); // Set initial filtered locations
            updateStateOptions(main); // Update state options
        } catch (error) {
            console.error('There was an error fetching the Locations!', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        handleFetch();
    }, []);

    // Update state options based on fetched locations
    const updateStateOptions = (locations) => {
        const states = new Set(locations.map(location => location.state));
        setStateOptions([...states]);
    };

    // Filter locations based on selected state and search query
    useEffect(() => {
        let tempLocations = locations;

        if (selectedState) {
            tempLocations = tempLocations.filter(location => location.state === selectedState);
        }

        if (searchQuery) {
            tempLocations = tempLocations.filter(location =>
                location.locality.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredLocations(tempLocations);
    }, [selectedState, searchQuery, locations]);

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
                    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-location/${id}`);
                    toast.success("Location Deleted Successfully");
                    handleFetch();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Location has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'An error occurred');
                }
            }
        });
    };

    const handleAddOrUpdate = async () => {
        const url = modalType === 'add'
            ? `${process.env.REACT_APP_BACKEND_URL}/create-location`
            : `${process.env.REACT_APP_BACKEND_URL}/update-location/${currentLocation._id}`;

        const method = modalType === 'add' ? 'post' : 'put';

        try {
            const res = await axios[method](url, currentLocation);
            toast.success(`Location ${modalType === 'add' ? 'Added' : 'Updated'} Successfully`);
            setShowModal(false);
            handleFetch();
        } catch (error) {
            console.error('There was an error!', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    const openModal = (type, location = { state: '', locality: [] }) => {
        setModalType(type);
        setCurrentLocation(location);
        setShowModal(true);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Locations</h4>
                </div>
                <div className="links">
                    <button onClick={() => openModal('add')} className="add-new">Add New <i className="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        <option value="">Choose Your State</option>
                        {stateOptions.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search Of locality</label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <section className="dis-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">State</th>
                            <th scope="col">Locality</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((location, index) => (
                            <tr key={location._id}>
                                <th scope="row">{indexOfFirstItem + index + 1}</th>
                                <td>{location.state}</td>
                                <td>{Array.isArray(location.locality) ? location.locality.join(', ') : location.locality}</td>
                                <td>
                                    <button onClick={() => openModal('edit', location)} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(location._id)} className="bt delete">
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(filteredLocations.length / itemPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            {/* Modal for Add/Edit Location */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalType === 'add' ? 'Add New Location' : 'Edit Location'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" className="form-control" id="state" value={currentLocation.state} onChange={(e) => setCurrentLocation({ ...currentLocation, state: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="locality" className="form-label">Locality (comma-separated)</label>
                                    <input type="text" className="form-control" id="locality" value={currentLocation.locality.join(', ')} onChange={(e) => setCurrentLocation({ ...currentLocation, locality: e.target.value.split(',').map(l => l.trim()) })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddOrUpdate}>{modalType === 'add' ? 'Add Location' : 'Update Location'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllLocation;
