import React, { useContext } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Summary from "../components/Summary";
import { CartContext } from "../context/CartContext";
import Tile from "../components/Tile";
import Address from "../components/Address";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
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
                <Address />
              </div>
              <div className="col-md-4 col-sm-6">
                <Summary />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
