import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">Page Not Found</h1>
      <p className="text-2xl mt-3">
        The page you are looking for does not exist.
      </p>

      <NavLink to={"/shop"}>
        <Button variant="destructive" className="mt-5">
          Back to Shop
        </Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
