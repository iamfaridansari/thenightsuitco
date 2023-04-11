import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Address = () => {
  const { backendAPI } = useContext(ProductContext);
  const [address, setAddress] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const nightsuituser = JSON.parse(localStorage.getItem("nightsuituser"));
  const fetchAddress = async () => {
    if (!nightsuituser) {
      setResponse("Please login to get address");
    } else {
      try {
        setLoading(true);
        const res = await fetch(backendAPI + "/api/get/nightsuit/address", {
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
        //
        if (res.status === 200) {
          setLoading(false);
          setAddress(data.address);
        }
        if (res.status === 401) {
          setLoading(false);
          setResponse(data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
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
        fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="mb-2">Address</h2>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {address.length === 0 ? (
              <p className="text-center">No address to show</p>
            ) : (
              <>
                <p className="text-center">{response}</p>
                {address.map((item, index) => {
                  return (
                    <div
                      className={index === address.length - 1 ? "" : "mb-4"}
                      key={index}
                    >
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                        <div className="customRadio">
                          <input
                            type="radio"
                            name="address"
                            onClick={(e) => console.log(e)}
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
