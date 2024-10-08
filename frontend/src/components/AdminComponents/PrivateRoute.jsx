import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAdmin } = useContext(ShopContext);

  return <div>{isAdmin ? children : <Navigate to={"/login"} />}</div>;
};

export default PrivateRoute;
