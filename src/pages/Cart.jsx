import React, { useContext, useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Summary from "../components/Summary";
import { CartContext } from "../context/CartContext";
import Tile from "../components/Tile";
import Address from "../components/Address";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { backendAPI } = useContext(UserContext);
  //
  const removeItem = (product) => {
    const filtered = cart.filter((item) => {
      return item._id !== product._id;
    });
    setCart(filtered);
  };
  //
  const increment = (product) => {
    const updatedQuantity = cart.map((item) => {
      if (item._id === product._id) {
        return {
          ...item,
          quantity: item.quantity + 1,
          total: (item.quantity + 1) * product.price,
        };
      }
      return item;
    });
    setCart(updatedQuantity);
  };
  //
  const decrement = (product) => {
    const updatedQuantity = cart.map((item) => {
      if (item._id === product._id && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1,
          total: (item.quantity - 1) * product.price,
        };
      }
      return item;
    });
    const filtered = updatedQuantity.filter((item) => {
      return item.quantity > 0;
    });
    setCart(filtered);
  };
  //
  const [checkout, setCheckout] = useState({
    user: {},
    address: {},
    cart: [],
    summary: {},
  });
  //
  const addressRef = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const checkoutUser = async () => {
    //
    const { user, address, cart, summary } = checkout;
    //
    if (Object.keys(checkout.address).length === 0) {
      addressRef.current.scrollIntoView();
      addressRef.current.classList.add("alertCheckout");
      setError(true);
      setMessage("Please select an address");
      setTimeout(() => {
        addressRef.current.classList.remove("alertCheckout");
      }, 2000);
    } else if (Object.keys(checkout.user).length === 0) {
      setError(true);
      setMessage("Please login to continue");
    } else if (checkout.cart.length === 0) {
      setError(true);
      setMessage("No item in cart");
    } else if (Object.keys(checkout.summary).length === 0) {
      setError(true);
      setMessage("No item in cart");
    } else {
      try {
        const res = await fetch(backendAPI + "/api/post/nightsuit/orders", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ user, address, cart, summary }),
        });
        const data = await res.json();
        console.log(data);
        //
        setMessage(data.message);
        if (res.status === 200) {
          setError(false);
          setTimeout(() => {
            setCart([]);
            navigate("/products", { replace: true });
          }, 2000);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [message]);
  return (
    <>
      <Tile title="Cart" />
      <div className="container my-4">
        {cart.length === 0 ? (
          <p className="text-center my-4">No item in the cart.</p>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr className="gradient-bg">
                    <th>Sr.No.</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{item.name}</td>
                        <td>
                          Rs. <strong>{item.price}</strong>
                        </td>
                        <td className="text-center">
                          <div className="btn-group align-items-center gap-2">
                            <button
                              className="button"
                              onClick={() => decrement(item)}
                            >
                              <FaMinus />
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              className="button"
                              onClick={() => increment(item)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td>
                          Rs. <strong>{item.total}</strong>
                        </td>
                        <td className="text-center">
                          <button
                            className="button"
                            onClick={() => removeItem(item)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row align-items-start justify-content-between gap-md-0 gap-5 mt-4">
              <div className="col-md-6">
                <Address
                  checkout={checkout}
                  setCheckout={setCheckout}
                  addressRef={addressRef}
                />
              </div>
              <div className="col-md-4 col-sm-6">
                <Summary checkout={checkout} setCheckout={setCheckout} />
              </div>
            </div>
            <hr />
            <div className="text-end">
              <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
                {message}
              </p>
              <button className="button" onClick={checkoutUser}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
