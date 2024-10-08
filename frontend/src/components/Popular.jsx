import { useContext } from "react";
import { ShopContext } from "@/utils/contexts/Shop";
import Items from "../components/Items";

const Popular = () => {
  const { popularProducts } = useContext(ShopContext);
  return (
    <div>
      <div className="flex flex-col items-center gap-5 h-[90vh] p-10 bg-gray-50">
        <h1 className="text-gray-800 text-4xl font-bold">Popular in Woman</h1>
        <hr className="w-24 h-1 rounded-md bg-gray-900" />
        <div className="mt-7 flex gap-5 justify-center">
          {popularProducts.map((product) => (
            <Items key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
