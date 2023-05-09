import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { backendAPI } = useContext(UserContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    response: "",
  });
  const [success, setSuccess] = useState("");
  const handleinput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = input;
    if (!email) {
      setError({
        email: "Enter you email address",
      });
    } else if (!emailpattern.test(email)) {
      setError({
        email: "Invalid email address",
      });
    } else if (!password) {
      setError({
        password: "Enter you password",
      });
    } else {
      try {
        const res = await fetch(backendAPI + "/api/login/nightsuit/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setSuccess(data.message);
          localStorage.setItem("nightsuituser", JSON.stringify(data.token));
          setError({
            email: "",
            password: "",
            response: "",
          });
          setTimeout(() => {
            navigate("/profile", { replace: true });
            setSuccess("");
          }, 2000);
        }
        if (res.status !== 422) {
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
                type="email"
                className="input"
                name="email"
                value={input.email}
                onChange={handleinput}
                placeholder="Email address"
                autoComplete="off"
              />
              <p className="text-danger">{error.email}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="input"
                name="password"
                value={input.password}
                onChange={handleinput}
                minLength="8"
                maxLength="15"
                placeholder="Password"
                autoComplete="off"
              />
              <p className="text-danger">{error.password}</p>
            </div>
            <div className="text-end">
              <p className="text-success mb-2">{success}</p>
              <p className="text-danger mb-2">{error.response}</p>
              <button className="button" onClick={login}>
                Login
              </button>
            </div>
          </form>
          <hr />
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h2>New here?</h2>
            <Link className="button" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
