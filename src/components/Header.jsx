import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container-fluid p-2">
      <div className="d-flex align-items-center justify-content-between">
        <ul>
          <li>
            <Link to="/">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaTwitter />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a href="tel:9892422174">
              <FaPhoneAlt />
            </a>
          </li>
          <li>
            <a href="mailto:info@thenightsuit.co">
              <FaEnvelope />
            </a>
          </li>
          <li>
            <Link to="/profile">
              <FaUser />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
