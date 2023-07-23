import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    token: "",
    address: [],
  });
  //
  const navigate = useNavigate();
  const backendAPI = "";
  const authentication = async () => {
    const authtoken = JSON.parse(localStorage.getItem("nightsuituser"));
    if (!authtoken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const res = await fetch(backendAPI + "/api/auth/nightsuit/user", {
          method: "GET",
          headers: {
            "auth-token": `Bearer ${authtoken}`,
          },
        });
        const data = await res.json();
        console.log(data, res.status);
        if (res.status === 200) {
          setUser(data);
        }
        if (res.status === 422) {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, authentication, backendAPI }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
