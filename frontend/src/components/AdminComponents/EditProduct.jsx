import { useState } from "react";
import axios from "axios";
import cross_icon from "../../assets/cart_cross_icon.png";

const EditProduct = ({ product, onEdit, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    image: product.image,
    category: product.category,
    new_price: product.new_price,
    old_price: product.old_price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/product/editproduct`,
        {
          _id: product._id,
          ...formData,
        },
        { withCredentials: true }
      );

      onEdit();
      onClose();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-lg animate__animated animate__fadeInDown">
        <div className="flex justify-between items-center bg-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <img src={cross_icon} alt="Close" className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate__animated animate__fadeIn">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                required
              />
            </div>
            <div className="animate__animated animate__fadeIn">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                required
              />
            </div>
            <div className="animate__animated animate__fadeIn">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                required
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 animate__animated animate__fadeIn">
              <div>
                <label
                  htmlFor="new_price"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Price ($)
                </label>
                <input
                  type="number"
                  id="new_price"
                  name="new_price"
                  value={formData.new_price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="old_price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Old Price ($)
                </label>
                <input
                  type="number"
                  id="old_price"
                  name="old_price"
                  value={formData.old_price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 animate__animated animate__fadeIn">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
