import React, { createContext, useEffect, useState } from "react";
const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const getWIshlist = () => {
    const faridswishlist = sessionStorage.getItem("faridswishlist");
    if (faridswishlist) {
      return JSON.parse(faridswishlist);
    } else {
      return [];
    }
  };
  useEffect(() => {
    setWishlist(getWIshlist());
  }, []);
  useEffect(() => {
    sessionStorage.setItem("faridswishlist", JSON.stringify(wishlist));
    getWIshlist();
  }, [wishlist]);
  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistContextProvider };
