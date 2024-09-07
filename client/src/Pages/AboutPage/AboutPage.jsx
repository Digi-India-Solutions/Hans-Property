import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import aboutImage from './about.jpg';
import './AboutPage.css'; // Make sure to import the stylesheet
import MetaTag from '../../components/Meta/MetaTags';
import fatherImg from './father.jpeg'
import sonImg from './son.jpeg'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <>

            <MetaTag
                title="About Us - Hans Property"
                description="Discover the story of Hans Property, founded in 2017 by Kailash Chand Khandelwal. Learn about our vision, mission, and the leadership of Grovin Khandelwal as we continue to excel in the real estate industry."
                keyword="Hans Property, real estate history, Hans Property mission, Hans Property vision, Kailash Chand Khandelwal, Grovin Khandelwal, real estate leaders, company history Hans Property"
            />



            {/* ----- BreadCrumb ---- */}
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative text-center">
                        <h1 className="title text-uppercase">About Us</h1>
                        <ul className="bread-crumb d-flex justify-content-center">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />About Us</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ----- Introduction Section ---- */}
            <section className="about-intro-section mt-40">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="section-title">Welcome to <span className='text-uppercase'>Hans Property</span></h2>
                            <p className="intro-text">
                                <strong> Hans Property</strong> has been a trusted name in the real estate industry.
                                With years of experience and a commitment to excellence, we have been helping our clients find their dream properties.
                                <span className="highlight">Today, the legacy is carried forward by Grovin Khandelwal,</span> who continues to lead the company towards new heights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----- History Section ---- */}
            <section className="company-history-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="section-subtitle">Our History</h3>
                            <p>
                                Hans Property began its journey in 2017, with a vision to make property dealing simple and accessible for everyone.
                                Our founder, <strong>Kailash Chand Khandelwal</strong>, established the company with strong values and a customer-first approach.
                                Over the years, we have grown significantly, expanding our services and our reach.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img src={aboutImage} alt="Office" className="img-fluid rounded shadow-sm" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ----- Vision & Mission Section ---- */}
            <section className="vision-mission-section py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="section-subtitle">Our Vision</h3>
                            <p>
                                Our vision is to be the leading real estate company that provides outstanding services and helps clients
                                achieve their property goals with ease and satisfaction.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h3 className="section-subtitle">Our Mission</h3>
                            <p>
                                We aim to deliver high-quality real estate services through honesty, integrity, and customer-centric practices.
                                Our mission is to create lasting relationships with our clients by ensuring their property needs are met with professionalism and care.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----- Team Section ---- */}
            <section className="team-section py-5">
                <div className="container">
                    <h3 className="section-title mb-40">Meet Our Team</h3>
                    <div className="row">
                        <div className="col-md-6 team-member">
                            <img src={fatherImg} alt="Kailash Chand Khandelwal" className="team-img mb-3" />
                            <h4>Kailash Chand Khandelwal</h4>
                            <p className="position">Founder, Hans Property</p>
                            <p>
                                Kailash Chand Khandelwal is the visionary who laid the foundation of Hans Property. With his extensive knowledge and experience in real estate,
                                he has built the company from the ground up.
                            </p>
                        </div>
                        <div className="col-md-6 team-member">
                            <img src={sonImg} alt="Grovin Khandelwal" className="team-img mb-3" />
                            <h4>Grovin Khandelwal</h4>
                            <p className="position">CEO, Hans Property</p>
                            <p>
                                Grovin Khandelwal, son of Kailash Chand Khandelwal, now leads Hans Property. Under his guidance, the company continues to thrive and
                                achieve new milestones in the real estate market.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutPage;
