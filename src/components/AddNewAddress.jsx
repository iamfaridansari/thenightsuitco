import React, { useEffect, useRef, useState, useContext } from "react";
import { AddressContext } from "../context/AddressContext";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import states from "../data/states";
import { useNavigate } from "react-router-dom";

const AddNewAddress = () => {
  const navigate = useNavigate();
  //
  const { setUser } = useContext(UserContext);
  const { backendAPI } = useContext(ProductContext);
  const authentication = async () => {
    const nightsuituser = JSON.parse(localStorage.getItem("nightsuituser"));
    if (!nightsuituser) {
      navigate("/login", { replace: true });
    } else {
      try {
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
          setUser(data);
        }
        if (res.status === 401) {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    authentication();
  }, []);
  //
  const { address, setAddress, handleAddress } = useContext(AddressContext);
  const cityInput = useRef(null);
  const [stateIndex, setStateIndex] = useState(0);
  useEffect(() => {
    states.forEach((item, index) => {
      if (item.state === address.state) {
        setStateIndex(index);
      }
    });

    address.state === ""
      ? cityInput.current.setAttribute("disabled", true)
      : cityInput.current.removeAttribute("disabled");
  }, [address.state]);
  //
  const [error, setError] = useState({
    house: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [success, setSuccess] = useState("");
  //
  const addAddress = async (e) => {
    const nightsuituser = JSON.parse(localStorage.getItem("nightsuituser"));
    const { house, state, city, landmark, pincode } = address;
    e.preventDefault();
    //
    if (!address.house) {
      setError({
        house: "Enter your house name/number",
      });
    } else if (!address.state) {
      setError({
        state: "Select your state",
      });
    } else if (!address.city) {
      setError({
        city: "Select you city",
      });
    } else if (!address.pincode) {
      setError({
        pincode: "Enter your city's 6 digit PIN code",
      });
    } else {
      try {
        const res = await fetch(backendAPI + "/api/post/nightsuit/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: nightsuituser.email,
            token: nightsuituser.token,
            house,
            state,
            city,
            landmark,
            pincode,
          }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setAddress({
            house: "",
            state: "",
            city: "",
            landmark: "",
            pincode: "",
          });
          setError({
            house: "",
            state: "",
            city: "",
            pincode: "",
          });
          setSuccess("Address saved");
          setTimeout(() => {
            navigate("/profile", { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="container py-4">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6">
            <form className="row align-items-center justify-content-center">
              <div className="col-12 mb-4">
                <textarea
                  className="input"
                  name="house"
                  value={address.house}
                  onChange={handleAddress}
                  placeholder="House"
                ></textarea>
                <small className="text-danger">{error.house}</small>
              </div>
              <div className="col-sm-6 mb-4">
                <select
                  className="input"
                  name="state"
                  value={address.state}
                  onChange={handleAddress}
                >
                  <option disabled value="">
                    Please select your state
                  </option>
                  {states.map((item, index) => {
                    return (
                      <option value={item.state} key={index}>
                        {item.state}
                      </option>
                    );
                  })}
                </select>
                <small className="text-danger">{error.state}</small>
              </div>
              <div className="col-sm-6 mb-4">
                <select
                  className="input"
                  ref={cityInput}
                  name="city"
                  value={address.city}
                  onChange={handleAddress}
                >
                  <option disabled value="">
                    Please select your city
                  </option>
                  {states[stateIndex].districts.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <small className="text-danger">{error.city}</small>
              </div>
              <div className="col-sm-6 mb-4">
                <input
                  type="text"
                  className="input"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleAddress}
                  placeholder="Landmark"
                />
              </div>
              <div className="col-sm-6 mb-4">
                <input
                  type="number"
                  className="input"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleAddress}
                  placeholder="PIN code"
                />
                <small className="text-danger">{error.pincode}</small>
              </div>
              <div className="col-12 text-end">
                <small className="text-success d-block">{success}</small>
                <button className="button" onClick={addAddress}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewAddress;
