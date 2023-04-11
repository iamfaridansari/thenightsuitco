import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ViewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    mrp: "",
    price: "",
    color: "",
    fabric: "",
    images: [],
  });
  const { id } = useParams();
  const viewProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/view/nightsuit/products/${id}`);
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setLoading(false);
        setProduct(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    viewProduct();
  }, []);
  return (
    <div className="container py-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="row align-items-start justify-content-between gap-md-0 gap-4">
          <div className="col-md-6">
            <div className="displayImg">
              <img
                src={
                  product.images.length !== 0
                    ? product.images[productIndex].path
                    : ""
                }
                alt=""
              />
            </div>
            <div className="d-flex align-items-center justify-content-start gap-2 mt-2 optionImg">
              {product.images.map((item, index) => {
                return (
                  <img
                    src={item.path}
                    className={index === productIndex ? "active" : ""}
                    key={index}
                    onClick={() => setProductIndex(index)}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
          <div className="col-md-6">
            <p>
              Name: <strong>{product.name}</strong>
            </p>
            <p>
              Category: <strong>{product.category}</strong>
            </p>
            <p>
              Price:
              <small className="text-decoration-line-through mx-2 text-secondary opacity-75">
                Rs.{product.mrp}
              </small>
              <strong>Rs.{product.price}</strong>
            </p>
            <p>
              Color: <strong>{product.color}</strong>
            </p>
            <p>
              Fabric: <strong>{product.fabric}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
