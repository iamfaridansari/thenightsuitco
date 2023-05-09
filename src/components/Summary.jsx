import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const Summary = ({ checkout, setCheckout }) => {
  const { backendAPI } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [summary, setSummary] = useState({
    total_items: 0,
    subtotal: 0,
  });
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [applied, setApplied] = useState(false);
  const applyBtn = useRef(null);
  const [discount, setDiscount] = useState(0);
  //
  useEffect(() => {
    let totalitems = 0;
    let totalprice = 0;
    cart.forEach((item) => {
      totalitems = totalitems + item.quantity;
      totalprice = totalprice + item.quantity * item.price;
    });
    setSummary({
      total_items: totalitems,
      subtotal: totalprice - discount,
    });
    setCheckout({
      ...checkout,
      summary: {
        total_items: totalitems,
        subtotal: totalprice - discount,
      },
      cart: cart,
    });
    if (cart.length === 0) {
      setSummary({
        total_items: 0,
        subtotal: 0,
      });
    }
    //
  }, [cart]);
  //
  const applyCoupon = async () => {
    if (coupon === "") {
      setCouponMessage("Enter a coupon code");
      setTimeout(() => {
        setCouponMessage("");
      }, 2000);
    } else {
      try {
        const res = await fetch(backendAPI + "/api/apply/nightsuit/coupon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coupon,
            subtotal: summary.subtotal,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setApplied(true);
          setCouponMessage("");
          setCouponMessage(data.message);
          setSummary({
            ...summary,
            subtotal: data.subtotal,
          });
          setDiscount(summary.subtotal - data.subtotal);
          applyBtn.current.setAttribute("disabled", true);
          applyBtn.current.classList.add("deactive");
        } else if (res.status === 422) {
          setCouponMessage(data.message);
          setTimeout(() => {
            setCouponMessage("");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  const cancelCoupon = () => {
    setCoupon("");
    setApplied(false);
    setCouponMessage("");
    setSummary({
      ...summary,
      subtotal: summary.subtotal + discount,
    });
    applyBtn.current.removeAttribute("disabled");
    applyBtn.current.classList.remove("deactive");
  };
  //
  useEffect(() => {
    setCheckout({
      ...checkout,
      summary: summary,
      cart: cart,
    });
  }, [summary]);
  //
  return (
    <>
      {cart.length !== 0 ? (
        <>
          <h2 className="mb-2">Coupon</h2>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="couponbox">
              <input
                type="text"
                className="input"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
                placeholder="Enter coupon code"
              />
              {applied ? (
                <div className="clearCoupon" onClick={cancelCoupon}>
                  <FaTimes />
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="button" onClick={applyCoupon} ref={applyBtn}>
              Apply
            </button>
          </div>
          <small className={applied ? "text-success" : "text-danger"}>
            {couponMessage}
          </small>{" "}
          <hr />
        </>
      ) : (
        ""
      )}
      <h2 className="mb-2">Summary</h2>
      <ul className="list-group">
        <li className="list-group-item">
          Total quantity: {summary.total_items}
        </li>
        <li className="list-group-item">Total items: {cart.length}</li>
        {applied ? (
          <li className="list-group-item">Coupon discount: {discount}</li>
        ) : (
          ""
        )}
        <li className="list-group-item">
          Subtotal: Rs. <strong>{summary.subtotal}</strong>
        </li>
      </ul>
    </>
  );
};

export default Summary;
