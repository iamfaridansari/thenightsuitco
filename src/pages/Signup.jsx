import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { backendAPI } = useContext(UserContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
    response: "",
  });
  const [success, setSuccess] = useState("");
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const signup = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, password2 } = input;
    console.log(name, email, mobile, password);
    if (!name) {
      setError({
        name: "Enter your name",
      });
    } else if (!email) {
      setError({
        email: "Enter your email address",
      });
    } else if (!emailpattern.test(email)) {
      setError({
        email: "Invalid email address",
      });
    } else if (!mobile) {
      setError({
        mobile: "Enter your mobile number",
      });
    } else if (mobile.length !== 10) {
      setError({
        mobile: "Enter a valid 10 digit mobile number",
      });
    } else if (!password) {
      setError({
        password: "Create a password",
      });
    } else if (password.length < 8) {
      setError({
        password: "Password must be atleast 8 characters long",
      });
    } else if (password.length > 15) {
      setError({
        password: "Password must be less than 15 characters",
      });
    } else if (password !== password2) {
      setError({
        password2: "Password does not match",
      });
    } else {
      try {
        const res = await fetch(backendAPI + "/api/signup/nightsuit/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, mobile, password }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setError({});
          setSuccess(data.message);
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        } else if (res.status === 422) {
          setError({
            response: data.message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container my-4">
      <div className="row align-items-start justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInput}
                className="input"
                placeholder="Name"
                autoComplete="off"
              />
              <p className="text-danger">{error.name}</p>
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInput}
                className="input"
                placeholder="Email address"
                autoComplete="off"
              />
              <p className="text-danger">{error.email}</p>
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="mobile"
                value={input.mobile}
                onChange={handleInput}
                className="input"
                placeholder="mobile number"
                autoComplete="off"
              />
              <p className="text-danger">{error.mobile}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleInput}
                className="input"
                minLength="8"
                maxLength="15"
                placeholder="Password"
                autoComplete="off"
              />
              <p className="text-danger">{error.password}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password2"
                value={input.password2}
                onChange={handleInput}
                className="input"
                minLength="8"
                maxLength="15"
                placeholder="Confirm Password"
                autoComplete="off"
              />
              <p className="text-danger mb-2">{error.password2}</p>
            </div>
            <div className="text-end">
              <p className="text-danger mb-2">{error.response}</p>
              <p className="text-success mb-2">{success}</p>
              <button className="button" onClick={signup}>
                Sign up
              </button>
            </div>
          </form>
          <hr />
          <div className="d-flex align-items-center justify-content-between flex-sm-row flex-column gap-2">
            <h2>Already have an account?</h2>
            <Link className="button" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
