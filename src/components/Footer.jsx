import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container-fluid p-2 gradient-bg text-center">
      <p className="text-capitalize">
        Copyright <FaRegCopyright />{" "}
        <a href="mailto:info@thenightsuit.co">The Night Suit Co</a>. Developed
        by <a href="mailto:iamfaridansari@gmail.com">Farid Ansari</a>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
