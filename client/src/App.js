
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import ContactPage from './Pages/ContactPage/ContactPage';
import PropertyPage from './Pages/PropertyPage/PropertyPage';
import PropertyDetail from './Pages/PropertyDetail/PropertyDetail';
import AboutPage from './Pages/AboutPage/AboutPage';
import BlogPage from './Pages/BlogPage/BlogPage';
import Login from './components/Login/Login';
import ForgetPassword from './components/Login/ForgetPassword';
import SignIn from './components/Login/SignIn';
import OtpSignUp from './components/Login/OtpSignUp';

import { ToastContainer } from 'react-toastify';
import PropertyByCategory from './Pages/PropertyPage/PropertyByCategory';
import PropertyDetailByCategory from './Pages/PropertyDetail/PropertyDetailByCategory';
import AllProperty from './Pages/PropertyPage/AllProperty';
import PropertyBySearch from './Pages/PropertyPage/PropertyBySearch';
import Profile from './Pages/Vendor/Profile';
import AddProperty from './Pages/Vendor/AddProperty';
import ResetPassword from './components/Login/ResetPassword';
function App() {
  return (
    <>
    <BrowserRouter>
    <div class="boxed_wrapper">
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />

        {/* <Route path='/properties' element={<PropertyPage/>} /> */}
        <Route path="/search" element={<PropertyBySearch />} />
        <Route path='/properties' element={<AllProperty/>} />
        <Route path='/properties/:categoryName' element={<PropertyByCategory/>} />

        <Route path='/property/:categoryName/:titleName' element={<PropertyDetailByCategory/>} />

        <Route path='/property/detail' element={<PropertyDetail/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/contact' element={<ContactPage/>} />

          {/* ------- Authentication ---------  */}
          <Route path='/login' element={<Login />} />
          <Route path='/login/forget-password' element={<ForgetPassword />} />
          <Route path='/sign-up' element={<SignIn />} />
          <Route path='/sign-up/confirm-account/:email' element={<OtpSignUp />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/add-property' element={<AddProperty />} />
          <Route path='/profile/reset-password' element={<ResetPassword />} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
