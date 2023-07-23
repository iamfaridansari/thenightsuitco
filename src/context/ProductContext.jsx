import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const { backendAPI } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [feature, setFeature] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendAPI + "/api/get/nightsuit/products");
      const data = await res.json();
      //
      if (res.status === 200) {
        setLoading(false);
        const updatedData = data.map((item) => {
          return (item = {
            ...item,
            inCart: false,
            inWishlist: false,
          });
        });
        console.log(updatedData);
        //
        setProducts(rearrange(updatedData));
        setNewProducts(rearrange(updatedData));
        setFeature(rearrange(updatedData));
      }
    } catch (error) {
      setLoading(false);
    }
  };
  //
  const rearrange = (data) => {
    let currentIndex = data.length;
    let randomIndex = "";

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    return data;
  };
  //
  useEffect(() => {
    fetchProducts();
  }, []);
  //
  const alertModal = useRef(null);
  const [alertMsg, setAlertMsg] = useState("");
  function toggleAlertModal() {
    alertModal.current.classList.add("active");
    setTimeout(() => {
      alertModal.current.classList.remove("active");
    }, 1000);
  }
  //
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        newProducts,
        setNewProducts,
        feature,
        alertModal,
        toggleAlertModal,
        alertMsg,
        setAlertMsg,
        backendAPI,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
