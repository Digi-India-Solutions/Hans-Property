import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Make sure to create and import a CSS file for styling

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin-login`, formData);
      setLoading(false)
      console.log(response.data);
      if (response.data.user.role === "Vendor") {
        toast.error("You have not authorised person")
        console.error("You have not authorised person")
      }
      else {
        toast.success('Login SuccessFull')
        sessionStorage.setItem('hansBuilderToken', response.data.token);
        sessionStorage.setItem('hansBuilderUser', JSON.stringify(response.data.user));
        window.location.href = ('/dashboard')
      }

    } catch (error) {
      console.log("Error While Login", error)
      if (error.response && error.response.data) {
        console.log("error.response", error)
        console.log(error.response.data);
        toast.error(error.response.data.msg);
      } else {
        console.log(error.response.data.msg);  // Fallback to the error's message if no response
        toast.error('An unexpected error occurred');
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <>
    <ToastContainer/>
      <div className="main-login">
        <div className="login-container">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                name='email'
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                name='password'
              />
            </div>
            <button type="submit" disabled={loading} className={`login-button ${loading ? 'not-allowed' : 'allowed'}`} >{loading ? "Please Wait ..." : "Login"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
