import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const userData = localStorage.getItem("userDetails");
      console.log("is User Exist : ", userData);
      if (userData && userData != "undefined") {
        // console.log(JSON.parse(userData));
        setUser(JSON.parse(userData));
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("userDetails");
      setUser(null);
    };

  return (
    <div>

      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-dark">
        <div className="container-fluid d-flex justify-content-between">
          <Link to={"/"} className="navbar-brand text-white">
            Movie Mania
          </Link> 

          <Link to={"/"} className="navbar-brand text-white">
            Home
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarCollapse"
          >
           

           <div className="d-flex">
              {user ? (
                <>
                  <Link to={'/profile'} className="navbar-text text-white me-3">
                    Welcome, {user.name.split(' ')[0]}
                  </Link>
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="navbar-nav">
                    <Link
                      to={"/register"}
                      className="nav-item nav-link text-white"
                    >
                      Register
                    </Link>
                  </div>
                  <div className="navbar-nav">
                    <Link to={"/login"} className="nav-item nav-link text-white">
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
