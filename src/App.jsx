import React from "react";
//
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
//
import "./css/style.css";
import "./css/responsive.css";
//
import { Routes, Route } from "react-router-dom";
//
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
//
import { CartContextProvider } from "./context/CartContext";
import { WishlistContextProvider } from "./context/WishlistContext";
import { ProductContextProvider } from "./context/ProductContext";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <ProductContextProvider>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </ProductContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  );
};

export default App;
