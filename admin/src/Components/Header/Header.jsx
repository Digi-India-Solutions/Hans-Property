import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [sidetoggle,setSideToggle] = useState(false)

  const handletoggleBtn =()=>{
    setSideToggle(!sidetoggle)
  }
  const handleLogOut =()=>{
    sessionStorage.removeItem("hansBuilderToken");
    sessionStorage.removeItem("hansBuilderUser");
    window.location.href="/";
  }
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Hans Builders</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank">
              <i class="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={handleLogOut}>
              Log Out <i class="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : "" } `  }>
          <ul>
            <li><Link to="/dashboard" onClick={handletoggleBtn}> <i class="fa-solid fa-gauge"></i> Dashboard</Link></li>
            <li><Link to="/all-locations" onClick={handletoggleBtn}> <i class="fa-solid fa-location-dot"></i> All Locations</Link></li>
            <li><Link to="/all-properties" onClick={handletoggleBtn}> <i class="fa-solid fa-building"></i> All Properties</Link></li>
            <li><Link to="/all-vendor-properties" onClick={handletoggleBtn}> <i class="fa-solid fa-building"></i> User Properties</Link></li>
            <li><Link to="/all-users" onClick={handletoggleBtn}> <i class="fa-solid fa-user"></i> All Users</Link></li>
            <button className='logout' onClick={handleLogOut}>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header