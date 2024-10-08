import { useContext } from "react";
import { ShopContext } from "@/utils/contexts/Shop";
import Items from "../components/Items";

const NewCollections = () => {
  const { newCollections } = useContext(ShopContext);
  return (
    <div className="new-collections flex flex-col items-center gap-5 mb-24 py-12 px-5 bg-gray-50">
      <h1 className="text-zinc-900 text-4xl font-bold">New Collections</h1>
      <hr className=" w-24 h-1 rounded-sm bg-gray-950" />
      <div className="collections grid grid-cols-4 mt-7 gap-5 justify-center">
        {newCollections.map((product) => (
          <Items key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
