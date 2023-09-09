import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useAuth = () => {
  const values = useContext(AuthContext);

  return values;
};

export default useAuth;
