import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function SignUp() {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(name, email, password);

    // console.log("Form submitted");

    try {
      const response = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });
      let userInfo = response.data;
      if (userInfo.isUserExist) {
        // console.log("User Already Exist => Login");
        toast.warning("User Already Exist");
        navigate("/login");
      } else {
        toast.success("Register Successfully !");
        // console.log("User Register successfully , Now Login");
        navigate("/login");
      }
      // navigate('/'); //to redirect to the allQuotes page after creating a new quote
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
          <h3 className="mb-5 text-center">CREATE AN ACCOUNT</h3>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="UserName"
              placeholder="UserName"
            />
            <label htmlFor="floatingPassword">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              placeholder="Age"
            />
            <label htmlFor="floatingPassword">Enter Your Email</label>
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
              Register
            </button>
          </div>

          <h6 className="text-center mt-5">
            Have already an account?{" "}
            <Link to={"/login"} style={{ color: "#0d6efd" }}>
              Login here
            </Link>
          </h6>
        </div>
      </form>
    </>
  );
}

export default SignUp;
