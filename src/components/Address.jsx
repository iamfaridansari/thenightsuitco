import React, { useEffect, useContext } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Address = ({ checkout, setCheckout, addressRef }) => {
  const { backendAPI, authentication, user } = useContext(UserContext);
  //
  useEffect(() => {
    authentication();
  }, []);
  //
  const selectAddress = (item) => {
    setCheckout({
      ...checkout,
      address: item,
      user: user,
    });
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
    <>
      <h2 className="mb-2" ref={addressRef}>
        Address
      </h2>
      <>
        {user.address.length === 0 ? (
          <p className="text-center">No address to show</p>
        ) : (
          <>
            {user.address.map((item, index) => {
              return (
                <div
                  className={index === user.address.length - 1 ? "" : "mb-4"}
                  key={index}
                >
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <div className="customRadio">
                      <input
                        type="radio"
                        name="address"
                        onClick={() => selectAddress(item)}
                      />
                      <span>
                        <FaCheck />
                      </span>
                    </div>
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
                  </div>
                  <p>
                    {item.house}, {item.landmark ? item.landmark + "," : ""}{" "}
                    {item.city} - {item.pincode}, {item.state}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </>
      <div className="text-end mt-4">
        <Link to="/address" className="button">
          Add new address
        </Link>
      </div>
    </>
  );
};

export default Address;
