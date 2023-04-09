import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import Loader from "../components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const { backendAPI } = useContext(ProductContext);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const authentication = async () => {
    const nightsuituser = JSON.parse(localStorage.getItem("nightsuituser"));
    if (!nightsuituser) {
      navigate("/login", { replace: true });
    } else {
      try {
        setLoading(true);
        const res = await fetch(backendAPI + "/api/auth/nightsuit/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: nightsuituser.email,
            token: nightsuituser.token,
          }),
        });
        const data = await res.json();
        console.log(data, res.status);
        if (res.status === 200) {
          setLoading(false);
          setUser(data);
        }
        if (res.status === 422) {
          setLoading(false);
          navigate("/login", { replace: true });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    authentication();
  }, []);
  //
  const logout = () => {
    localStorage.removeItem("nightsuituser");
    navigate("/login", { replace: true });
  };
  const newAccount = () => {
    localStorage.removeItem("nightsuituser");
    navigate("/signup", { replace: true });
  };
  return (
    <div className="container py-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-2">Personal information</h2>
          <p>
            Name: <strong>{user.name}</strong>
          </p>
          <p>
            Email address: <strong>{user.email}</strong>
          </p>
          <p>
            mobile number: <strong>{user.mobile}</strong>
          </p>
          <div className="d-flex align-items-sm-center  align-items-start justify-content-between gap-2 flex-sm-row flex-column mt-4">
            <button className="button" onClick={logout}>
              logout
            </button>
            <button className="button" onClick={newAccount}>
              Create a new account
            </button>
          </div>
          <hr />
          <h2 className="mb-2">Address</h2>
          {!user.address ? (
            <div className="d-flex align-items-sm-center align-items-start justify-content-between gap-2 flex-sm-row flex-column">
              <p className="text-center">No address found</p>
              <Link className="button" to="/address">
                Add a new address
              </Link>
            </div>
          ) : (
            <ul>
              {user.address &&
                user.address.map((item, index) => {
                  return (
                    <li
                      className={`rounded border p-2 d-flex align-items-sm-center align-items-start justify-content-between gap-2 flex-sm-row flex-column ${
                        index === user.address.length - 1 ? "" : "mb-2"
                      }`}
                      key={index}
                    >
                      <p>
                        {item.house}, {item.landmark ? item.landmark + "," : ""}{" "}
                        {item.city} - {item.pincode}, {item.state}
                      </p>
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <button className="button">
                          <FaPen />
                        </button>
                        <button className="button">
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  );
                })}
              <div className="mt-3">
                <Link className="button" to="/address">
                  Add a new address
                </Link>
              </div>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
