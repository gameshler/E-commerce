import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import iconUser from "../assets/icon-user.svg";
import iconCart from "../assets/icon-cart.svg";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import admin_panel_img from "../assets/admin_panel_img.png";

const Navbar = () => {
  const { menu, setMenu, isUser, getTotalCartItems, isAdmin } =
    useContext(ShopContext);

  const navigate = useNavigate();
  const handleUserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
        withCredentials: true,
      });
      setMenu("shop");
      navigate("/shop");
      sessionStorage.clear();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="navbar flex justify-between p-4 shadow">
      <div className="nav-logo w-fit flex items-center gap-2">
        <div onClick={() => setMenu("shop")}>
          <NavLink
            to={"/shop"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="Logo" />
            <p className="ml-4 text-gray-700 text-3xl font-semibold">
              Super Dress
            </p>
          </NavLink>
        </div>
      </div>
      <ul className="nav-menu flex items-center list-none gap-12 text-gray-600 text-xl font-medium">
        {["shop", "men", "women", "kids"].map((item) => (
          <li
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            key={item}
            onClick={() => setMenu(item)}
          >
            <NavLink to={`/${item}`} style={{ textDecoration: "none" }}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
            {menu === item ? (
              <hr className=" border-none w-4/5 h-1 rounded-2xl bg-red-500" />
            ) : null}
          </li>
        ))}
      </ul>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="nav-login-cart flex items-center  gap-5 ">
        {isUser || isAdmin ? (
          <button
            className="w-24 h-9 rounded-3xl text-white bg-neutral-700 text-sm font-medium border-none cursor-pointer transition-colors hover:bg-neutral-600 hover:shadow"
            onClick={handleUserLogout}
          >
            Logout
          </button>
        ) : (
          <NavLink to={"/signup"} onClick={() => setMenu("")}>
            <img
              src={iconUser}
              alt="user_icon"
              className="img-icon-user w-11 h-11 bg-white rounded-full"
            />
          </NavLink>
        )}

        <NavLink
          to={"/cart"}
          onClick={() => setMenu("")}
          className={"flex items-center"}
        >
          <div className="relative">
            <img
              src={iconCart}
              alt="cart_icon"
              className="img-icon-cart w-11 h-11"
            />
            <div className="nav-cart-count absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-5 h-5 rounded-xl flex justify-center items-center text-sm bg-red-500 text-white">
              {getTotalCartItems()}
            </div>
          </div>
        </NavLink>
        {isAdmin && (
          <NavLink to={"/adminpanel/dashboard"}>
            <img
              src={admin_panel_img}
              alt="admin panel img"
              className="admin_panel_img w-11 h-11"
            />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
