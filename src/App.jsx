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
import AddNewAddress from "./components/AddNewAddress";
import { AddressContextProvider } from "./context/AddressContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContextProvider } from "./context/UserContext";
import Profile from "./pages/Profile";
import ViewProduct from "./pages/ViewProduct";

const App = () => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <ProductContextProvider>
            <AddressContextProvider>
              <Header />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/view/:id" element={<ViewProduct />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/address" element={<AddNewAddress />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </AddressContextProvider>
          </ProductContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default App;
