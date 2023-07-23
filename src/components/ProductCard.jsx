import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { setAlertMsg, backendAPI, toggleAlertModal } =
    useContext(ProductContext);
  const addToCart = (product) => {
    let inCart = cart.find((item) => {
      return item._id === product._id;
    });
    if (!inCart) {
      product = {
        ...product,
        quantity: 1,
        total: product.price,
        wishlist: false,
      };
      setCart([...cart, product]);
      setAlertMsg("Item added to cart");
      toggleAlertModal();
    } else if (inCart) {
      const updateQuantity = cart.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * product.price,
          };
        }
        return item;
      });
      setCart(updateQuantity);
      setAlertMsg("Item already in the cart");
      toggleAlertModal();
    }
  };
  //
  const addToWishlist = (product) => {
    const inWishlist = wishlist.find((item) => {
      return item._id === product._id;
    });
    if (!inWishlist) {
      setWishlist([...wishlist, product]);
      setAlertMsg("Item added to wishlist");
      toggleAlertModal();
    } else {
      const filtered = wishlist.filter((item) => {
        return item._id !== product._id;
      });
      setWishlist(filtered);
      setAlertMsg("Item removed from wishlist");
      toggleAlertModal();
    }
  };
  //
  return (
    <>
      <div className="product">
        <Link to={`/view/${product._id}`}>
          <div className="img">
            <img src={`${backendAPI}/${product.images[0].path}`} alt="" />
          </div>
          <div className="my-2">
            <p className="text-capitalize">{product.name}</p>
            <p>
              Rs. <strong>{product.price}</strong>
            </p>
          </div>
        </Link>
        <div className="d-flex align-items-stretch justify-content-between gap-2 custom-flex-column">
          <button
            className="button add-to-cart w-100"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button className="button" onClick={() => addToWishlist(product)}>
            <FaHeart className="SVGdisable" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
