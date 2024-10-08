import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ShopContext } from "@/utils/contexts/Shop";
import exclusive_img from "../assets/exclusive_image.png";
const Offers = () => {
  const { setMenu } = useContext(ShopContext);
  const navigate = useNavigate();
  const navigateToWomen = () => {
    window.scrollTo(0, 0);
    setMenu("women");
    navigate("/women");
  };
  return (
    <div
      className="offers w-4/5 flex my-5 mx-auto py-0 px-5 mb-20 rounded-3xl shadow-xl"
      style={{ background: "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)" }}
    >
      <div className="offers-left flex-1 flex flex-col justify-center p-5">
        <h1 className=" text-zinc-900 text-7xl font-semibold">Exclusive</h1>
        <h2 className=" text-zinc-900 text-7xl font-semibold">
          Offers for You!
        </h2>
        <p className="text-zinc-900 text-xl font-semibold">
          Only on Best Sellers Products
        </p>
        <button
          onClick={navigateToWomen}
          className=" w-72 h-16 rounded-3xl bg-red-500 border-none text-white text-lg font-semibold mt-5 cursor-pointer transition hover:bg-red-400"
        >
          Check Now
        </button>
      </div>
      <div className="offers-right flex-1 flex items-center justify-end pt-12">
        <img src={exclusive_img} alt="Exclusive Image" className=" h-full" />
      </div>
    </div>
  );
};

export default Offers;
