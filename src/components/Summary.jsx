import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Summary = () => {
  const { cart } = useContext(CartContext);
  const [summary, setSummary] = useState({
    total_items: "",
    subtotal: "",
  });
  useEffect(() => {
    let totalitems = 0;
    let totalprice = 0;
    cart.forEach((item) => {
      totalitems = totalitems + item.quantity;
      totalprice = totalprice + item.quantity * item.price;
    });
    setSummary({
      total_items: totalitems,
      subtotal: totalprice,
    });
  }, [cart]);
  return (
    <div className="container my-4">
      <div className="row align-items-start justify-content-end">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <ul className="list-group">
            <li className="list-group-item">
              Total quantity: {summary.total_items}
            </li>
            <li className="list-group-item">Total items: {cart.length}</li>
            <li className="list-group-item">
              Subtotal: Rs. <strong>{summary.subtotal}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
