import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";

const AlertModal = () => {
  const { alertModal, alertMsg } = useContext(ProductContext);
  return (
    <div className="alertmodal rounded shadow p-2 gradient-bg" ref={alertModal}>
      <p>{alertMsg}</p>
      <span>
        <FaCheck />
      </span>
    </div>
  );
};

export default AlertModal;
