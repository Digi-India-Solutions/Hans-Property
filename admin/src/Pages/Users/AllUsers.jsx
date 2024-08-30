import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <section className="dis-table">
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Role</th>
                            <th scope="col">Active</th>
                            <th scope="col">Created At</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.role}</td>
                                <td>{user.isActive ? 'Yes' : 'No'}</td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                                {/* Render more columns if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
        </>
    );
};

export default AllUsers;
