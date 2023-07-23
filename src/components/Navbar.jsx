import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { FaShoppingBag, FaHeart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  //
  const navbar = useRef(null);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        navbar.current.classList.add("shadow");
      } else if (window.scrollY < 50) {
        navbar.current.classList.remove("shadow");
      }
    };
  }, []);
  //
  const navlinks2 = useRef(null);
  const [menu, setMenu] = useState(false);
  const togglenav = () => {
    navlinks2.current.classList.toggle("active");
    setMenu(!menu);
  };
  // 
  const closeMenu = () => {
    navlinks2.current.classList.remove("active");
    setMenu(false);
  }
  return (
    <>
      <nav className="container-fluid p-2" ref={navbar}>
        <NavLink className="logo" to="/" onClick={closeMenu}>
          <img src={logo} alt="" />
        </NavLink>
        <ul className="navlinks">
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/products">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/wishlist">
              <FaHeart />
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/cart">
              <FaShoppingBag />
            </NavLink>
          </li>
          <li
            className="d-md-none"
            style={{ cursor: "pointer" }}
            onClick={togglenav}
          >
            {menu ? <FaTimes /> : <FaBars />}
          </li>
        </ul>
      </nav>
      <div className="container-fluid p-0 navlinks2 mb-2 d-md-none" ref={navlinks2}>
        <ul className="d-md-none d-flex align-items-center justify-content-between flex-column gap-2">
          <li>
            <NavLink className="nav-link" to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/products" onClick={closeMenu}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
