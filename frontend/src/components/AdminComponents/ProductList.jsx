import { ShopContext } from "@/utils/contexts/Shop";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import cross_icon from "../../assets/cart_cross_icon.png";
import EditProduct from "./EditProduct";
const ProductList = () => {
  const { allProducts } = useContext(ShopContext);
  const [editingProduct, setEditingProduct] = useState(null);

  const removeProduct = async (_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/product/removeproduct`,
        { _id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to remove product", error);
    }
  };

  const handleEdit = async () => {
    setEditingProduct(null);
  };

  const handleEditClick = async (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md shadow-md hover:shadow-lg p-6 my-7 mx-auto w-full max-w-7xl h-5/6 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">All Products List</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-800 font-semibold  bg-gray-50">
              <th className="py-2 ">Products</th>
              <th className="py-2 ">Title</th>
              <th className="py-2 ">Old Price</th>
              <th className="py-2 ">New Price</th>
              <th className="py-2 ">Category</th>
              <th className="py-2 ">Edit</th>
              <th className="py-2 ">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-16 object-cover rounded-xl mx-auto"
                  />
                </td>
                <td className="py-4 text-center">{product.name}</td>
                <td className="py-4 text-center">${product.old_price}</td>
                <td className="py-4 text-center">${product.new_price}</td>
                <td className="py-4 text-center">{product.category}</td>
                <td className="py-4 text-center">
                  {editingProduct && editingProduct._id === product._id ? (
                    <EditProduct
                      product={editingProduct}
                      onEdit={handleEdit}
                      onClose={() => setEditingProduct(null)}
                    />
                  ) : (
                    <button
                      className="px-2 py-1 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 focus:outline-none"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="py-4 text-center">
                  <img
                    onClick={() => removeProduct(product._id)}
                    src={cross_icon}
                    alt="Remove"
                    className="cursor-pointer h-4 w-4 transform transition-all hover:scale-125 mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
