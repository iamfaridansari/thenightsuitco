import React, { createContext, useEffect, useState } from "react";
const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const getProductsFromLS = () => {
    const faridscloset = sessionStorage.getItem("faridscloset");
    if (faridscloset) {
      return JSON.parse(faridscloset);
    } else {
      return [];
    }
  };
  useEffect(() => {
    setCart(getProductsFromLS());
  }, []);
  useEffect(() => {
    sessionStorage.setItem("faridscloset", JSON.stringify(cart));
    getProductsFromLS()
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, setCart, getProductsFromLS }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
