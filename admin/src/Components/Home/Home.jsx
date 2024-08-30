import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllUsers from '../../Pages/Users/AllUsers'
import AllLocation from '../../Pages/Location/AllLocation'
import AllProperty from '../../Pages/Property/AllProperty.jsx'
import Login from '../Auth/Login'
import ErrorPage from '../../Pages/Error/ErrorPage'
import AddProperty from '../../Pages/Property/AddProperty.jsx'
import EditProperty from '../../Pages/Property/EditProperty.jsx'
import AllPropertyByVendor from '../../Pages/PropertyByVendor/AllPropertyByVendor.jsx'

const Home = () => {
  const hansAdminToken = sessionStorage.getItem("hansBuilderToken")
  return (
    <>
      {hansAdminToken ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path={"/dashboard"} element={<Dashboard />} />

              {/* Category --  */}
              <Route path={"/all-locations"} element={<AllLocation />} />

              {/* Product --  */}
              <Route path="/all-properties" element={<AllProperty />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/edit-property/:id" element={<EditProperty />} />

              <Route path="/all-vendor-properties" element={<AllPropertyByVendor />} />
              {/* --- Orders --- */}
              <Route path={"/all-users"} element={<AllUsers />} />

            </Routes>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/*"} element={<ErrorPage />} />
          </Routes>
        </>
      )}


    </>
  )
}

export default Home