import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import sideBg from './sideBg.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const OtpSignUp = () => {
    const {email} = useParams()
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [optSend,setOptSend] = useState(false);
    const [countdown, setCountdown] = useState(0); // Countdown state

    const [formData, setFormData] = useState({
        email:email,
        otp: ""
    })

    const handleResendOtpSubmit = async (otpevent) =>{
        otpevent.preventDefault()
        setLoading(true)
        try {
            console.log(formData)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/resend-sign-Otp`,formData)
            console.log(response.data);
            console.log(response.data.msg)
            toast.success(response.data.msg)
            setLoading(false)
            setOptSend(true);
            setCountdown(300); // Restart countdown timer

        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.msg)
            console.log(error.response.data.msg)
            setOptSend(false);
        }
    }

    const handleOtpSubmit = async (otpevent) =>{
        setLoading(true)
        otpevent.preventDefault()
        try {
            console.log(formData)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Verify-sign-Otp`,formData)
            console.log("Response :",response.data);
            console.log(response.data.message);
            // toast.success(response.data.message);
            setLoading(false)
            setOptSend(true);
            // localStorage.setItem('swToken',response.data.token)
            // localStorage.setItem('swUser', JSON.stringify(response.data.user))
            toast.success("Account Created Successfully !!");
            navigate('/login');
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            console.log(error.response.data.message)
            toast.error(error.response.data.message);
            setOptSend(false);
        }
    }

    useEffect(() => {
        let timer;
        if (optSend && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setOptSend(false);
        }
        return () => clearInterval(timer);
    }, [optSend, countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

  return (
    <>
            <section className='login-account login-page mt-5'>
                <div className="container">
                    <div className="row login">

                        <div className="col-md-6 d-none d-md-block">
                            <img src={sideBg} alt="Health Image" />
                        </div>

                        <div className="col-md-6 form-div text-center">
                            <div className="headings">
                                <h1 className='h2'>Enter OTP</h1>
                                <p>Last step to create your account</p>
                            </div>

                            <div className="form">
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="input-field">
                                        <i className="fa-solid fa-unlock-keyhole"></i>
                                        <input required type="number" name="otp" value={formData.otp} onChange={handleChange} placeholder='Enter OTP' />
                                    </div>

                                    {optSend && (
                                        <div className='text-success h6 my-2'>OTP is only valid for {formatTime(countdown)} minutes.</div>
                                    )}

                                    <div className="">
                                        <Link onClick={handleResendOtpSubmit}><i className="fa-solid fa-arrow-rotate-left"></i>Resend OTP</Link>
                                        
                                    </div>

                                    <button type='submit' disabled={loading} className={`${loading ? 'not-allowed':'allowed' }`}>
                                        {loading ? "Please Wait ..." : "SIGN IN"}
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

export default OtpSignUp