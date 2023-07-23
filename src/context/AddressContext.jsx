import React, { createContext, useState } from "react";
const AddressContext = createContext();

const AddressContextProvider = ({ children }) => {
  const [address, setAddress] = useState({
    house: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  });
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  return (
    <AddressContext.Provider value={{ address, setAddress, handleAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressContextProvider };
