import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import AlertModal from "../components/AlertModal";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import Loader from "../components/Loader";

const Products = () => {
  const { newProducts, loading } = useContext(ProductContext);
  return (
    <>
      <SearchFilter />
      <AlertModal />
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Products;
