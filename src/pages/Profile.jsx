import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { user, authentication, backendAPI } = useContext(UserContext);
  //
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
  //
  const deleteAddress = async (item) => {
    try {
      const res = await fetch(backendAPI + "/api/delete/nightsuit/address", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: item.email,
          house: item.house,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        authentication();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container py-4">
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
                      <button
                        className="button"
                        onClick={() => deleteAddress(item)}
                      >
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
    </div>
  );
};

export default Profile;
