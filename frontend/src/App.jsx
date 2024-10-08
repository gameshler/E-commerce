import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ShopCategories from "./pages/ShopCategories";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Spinner from "./components/ui/spinner";
import NotFound from "./components/NotFound";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/AdminComponents/PrivateRoute";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      <Router>
        {/* User Routes */}
        <Navbar />
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<ShopCategories category={"Men"} />} />
          <Route
            path="/women"
            element={<ShopCategories category={"Women"} />}
          />
          <Route path="/kids" element={<ShopCategories category={"Kids"} />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {/* Admin Routes */}
          <Route
            path="/adminpanel/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
};

export default App;
