import React from "react";
import Tile from "../components/Tile";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Tile title="Contact us" />

      <div className="container py-4">
        <div className="row align-items-center justify-content-between gap-md-0 gap-5">
          <div className="col-md-6">
            <form className="contactform">
              <input type="text" className="input mb-4" placeholder="Full Name" />
              <input type="text" className="input mb-4" placeholder="Email address" />
              <input type="text" className="input mb-4" placeholder="Mobile Number" />
              <textarea className="input" placeholder="Message"></textarea>
              <div className="text-end mt-4">
                <button className="button">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center justify-content-between gap-4">
              <a href="tel:9892422174">
                <FaPhoneAlt className="me-2" />
                9892422174
              </a>
              <a href="mailto:info@thenightsuit.co">
                <FaEnvelope className="me-2" />
                info@thenightsuit.co
              </a>
              <div>
                <p>Contact us via</p>
                <ul className="d-flex align-items-center justify-content-between gap-4">
                  <li>
                    <a href="/">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
