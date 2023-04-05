import React, { useContext } from "react";
import AlertModal from "../components/AlertModal";
import ProductCard from "../components/ProductCard";
import { WishlistContext } from "../context/WishlistContext";
import Tile from "../components/Tile";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  return (
    <>
      <AlertModal />
      <Tile title="Wishlist" />
      <div className="container mt-4">
        {wishlist.length !== 0 ? (
          <div className="product-container">
            {wishlist.map((item, index) => {
              return <ProductCard key={index} product={item} />;
            })}
          </div>
        ) : (
          <p className="text-center my-4">No item in wishlist.</p>
        )}
      </div>
    </>
  );
};

export default Wishlist;
