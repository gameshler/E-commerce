import AddProduct from "@/components/AdminComponents/AddProduct";
import NotFound from "@/components/NotFound";
import ProductList from "@/components/AdminComponents/ProductList";
import Sidebar from "@/components/AdminComponents/Sidebar";
import UsersList from "@/components/AdminComponents/UsersList";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/components/AdminComponents/Dashboard";
const Admin = () => {
  return (
    <div className="flex h-fit">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Admin;
