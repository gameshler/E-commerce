import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import Items from "./Items";

const RelatedProducts = () => {
  const { newCollections } = useContext(ShopContext);

  return (
    <div className="relatedproducts flex flex-col items-center gap-5 h-4/5 py-12 px-5 bg-gray-50">
      <h1 className="text-zinc-950 text-4xl font-bold">Related Products</h1>
      <hr className=" w-24 h-1 rounded-md bg-gray-950" />
      <div className="relatedproducts-item mt-7 flex gap-5 justify-center">
        {newCollections
          .map((product) => <Items key={product._id} {...product} />)
          .slice(0, 3)}
      </div>
    </div>
  );
};

export default RelatedProducts;
