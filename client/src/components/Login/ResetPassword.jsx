import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import sideBg from './sideBg.jpg'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [getOtp, setgetOtp] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 300 seconds for 5 minutes
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        otp: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Password-change-request`, formData)
            console.log(response.data);
            setLoading(false);
            toast.success(response.data.msg)
            setgetOtp(true);
            setTimeLeft(300); // Reset the timer

        }
        catch (err) {
            console.log(err);
            console.log(err.response?.data.msg);
            toast.error(err.response?.data?.msg?? "Internal Server error")
            setLoading(false)

        }
    }

    const handleOTPSubmit = async (otpevent) => {
        setLoading(true)
        otpevent.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Verify-Otp/${formData.email}`, formData)
            console.log(response.data);
            setLoading(false);
            toast.success(response.data.msg)
            navigate('/profile')

        } catch (error) {
            console.log(error)
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)

            setLoading(false)
        }
    }

    const resendOTP = async (otpevent) => {
        setLoading(true)
        otpevent.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Resend-Otp/`, formData)
            console.log(response.data);
            setLoading(false);
            setTimeLeft(300); // Reset the timer
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.msg)

        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, []);

    // for otp timing
    useEffect(() => {
        if (getOtp && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [getOtp, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <>
            <section className="my-3 login-page">
                <div className="container">
                    <div className="row login">
                        <div className="col-md-6 d-none d-md-block">
                            <img src={sideBg} alt="laboratory Image" />
                        </div>
                        <div className="col-md-6 form-div text-center">
                            <div className="headings">
                                <h1>Reset Password</h1>
                                <p>Verify your account and reset your password</p>
                            </div>
                            <div className="form">
                                <form>
                                    <div className="input-field">
                                        <i className="fa-solid fa-envelope"></i>
                                        <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter Email Id" required />
                                    </div>
                                    <div className="input-field">
                                        <i className="fa-solid fa-lock"></i>
                                        <input type="email" name="newPassword" onChange={handleChange} value={formData.newPassword} placeholder="New Password" required />
                                    </div>

                                    {getOtp ? (
                                        <>
                                            <div className="input-field">
                                                <i className="fa-solid fa-key"></i>
                                                <input required type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder='Enter OTP' />
                                            </div>
                                            
                                            <p className="text-success h6">OTP is only valid for {formatTime(timeLeft)} minutes.</p>
                                        
                                            <div className="flex width-80">
                                                <div className="keep">
                                                    <Link onClick={resendOTP}><i className="fa-solid fa-arrow-rotate-right"></i> Resend OTP</Link>
                                                </div>
                                                <div className="member">

                                                </div>
                                            </div>
                                        </>
                                    ) : ""}


                                    <button type='submit' disabled={loading} className={`${loading ? 'not-allowed':'allowed' }`} onClick={getOtp ? handleOTPSubmit : handleSubmit}>
                                        {loading ? "Please Wait ..." : getOtp ? "Submit OTP" : "Get OTP"}
                                    </button>                                    

                                </form>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword
