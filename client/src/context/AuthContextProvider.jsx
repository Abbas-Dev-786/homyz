import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const setUserStorage = (data = {}) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const updateUserStorage = (newData) => {
    const data = { ...user };

    data.user = newData;

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const removeUser = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUserStorage, removeUser, updateUserStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthContextProvider;
