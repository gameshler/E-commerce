import { NavLink } from "react-router-dom";
import AddProductIcon from "../../assets/Product_Cart.svg";
import ListProductIcon from "../../assets/Product_list_icon.svg";
import UsersListIcon from "../../assets/users_list_icon.png";
import dashboardIcon from "../../assets/business-report.png";
const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className="sidebar-item flex items-center justify-center no-underline text-zinc-900 my-0 mx-5 py-2 px-4 rounded-md bg-slate-100 gap-5  hover:bg-red-600 hover:transform hover:scale-110 hover:text-white hover:transition-all hover:rounded-lg hover:shadow-lg"
  >
    <img src={icon} alt="" className="sidebar-item-icon w-6 h-6" />
    <p className=" text-inherit ">{label}</p>
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col pt-7 rounded-md gap-5 w-full mt-2 max-w-64 h-screen bg-slate-50 transition-shadow ease-in-out hover:shadow-md">
      <SidebarItem
        to={"/adminpanel/dashboard"}
        icon={dashboardIcon}
        label="Dashboard"
      />
      <SidebarItem
        to="/adminpanel/addproduct"
        icon={AddProductIcon}
        label="Add Product"
      />
      <SidebarItem
        to="/adminpanel/productlist"
        icon={ListProductIcon}
        label="Product List"
      />
      <SidebarItem
        to="/adminpanel/userslist"
        icon={UsersListIcon}
        label="Users List"
      />
    </div>
  );
};

export default Sidebar;
