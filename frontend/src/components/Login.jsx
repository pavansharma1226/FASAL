import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  console.log(email, password);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      let userDetails = response.data;
      // console.log(userDetails.userInformation);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(userDetails.userInformation)
      );
      localStorage.setItem("userToken", JSON.stringify(userDetails.Token));
      // console.log(localStorage);
      if (!userDetails.isUserRegister) {
        toast.warning("Register Yourself First !");
        // console.log("New User : Please Register Yourself first");
        // localStorage.setItem('isLogin', 'false');
        // localStorage.setItem('msg', 'New User');
        navigate("/register");
      } else if (userDetails.isvalidPassword) {
        localStorage.setItem("isLogin", true);
        // localStorage.setItem('msg', 'Welcome Home');
        toast.success("Login Successful !");
        // console.log("Welcome Home");
        navigate("/");
      } else {
        // console.log("Invalid Password : Login Again");
        toast.error("Invalid Password !");
        navigate("/login");
      }
    } catch (err) {
      console.log("Something went wrong : ", err);
    }
  }

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="container-fluid py-5 vh-100 bg-light"
      >
        <div
          className="col-12 col-md-8 col-lg-6 col-xl-5 p-4 mx-auto bg-white shadow"
          style={{ borderRadius: "1rem" }}
        >
          <h3 className="mb-5 text-center">LOGIN</h3>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="UserName"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="d-grid col-9 mx-auto">
            <button className="btn btn-primary  btn-block" type="submit">
              Login
            </button>
          </div>

          <h6 className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#0d6efd" }}
            >
              Sign Up
            </Link>
          </h6>
        </div>
      </form>
    </>
  );
}

export default Login;
