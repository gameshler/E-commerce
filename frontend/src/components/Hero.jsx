import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import arrow_icon from "../assets/arrow.png";
import hero_img from "../assets/hero_img.png";
import hand_icon from "../assets/hand_icon.png";

const Hero = () => {
  const { setMenu } = useContext(ShopContext);
  const navigate = useNavigate();
  const navigateToWomen = () => {
    setMenu("women");
    navigate("/women");
    window.scrollTo(0, 0);
  };
  return (
    <div
      className="hero h-screen flex"
      style={{ background: "linear-gradient(180deg, #7457f9, #8743e222 60%)" }}
    >
      <div className="hero-left flex-1 flex flex-col justify-center gap-5 pl-60 leading-5">
        <h2 className="text-zinc-900 text-3xl font-bold">New Arrivals Only!</h2>
        <div>
          <div className="hero-hand-icon flex items-center gap-4">
            <p className="text-zinc-900 text-6xl font-bold mb-5">new</p>

            <img className=" w-20" src={hand_icon} alt="hand icon" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>

        <div
          className="hero-latest-btn flex justify-center items-center gap-4 w-64 h-14 rounded-3xl mt-5 bg-red-600 text-white text-lg font-semibold transition hover:bg-red-500 cursor-pointer"
          onClick={navigateToWomen}
        >
          <div>Latest Collections</div>

          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
      <div className="hero-right flex-1 flex items-center justify-center">
        <img
          src={hero_img}
          alt="hero image"
          className=" max-w-full h-4/5 rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
