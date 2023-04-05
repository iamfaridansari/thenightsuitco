import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import AlertModal from "../components/AlertModal";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import Tile from "../components/Tile";

const Products = () => {
  const { newProducts } = useContext(ProductContext);
  return (
    <>
      <SearchFilter />
      <AlertModal />
      <div className="container mt-4">
        {newProducts.length === 0 ? (
          <p className="text-center my-4">No product to show.</p>
        ) : (
          <div className="product-container">
            {newProducts.map((item, index) => {
              return <ProductCard key={index} product={item} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
