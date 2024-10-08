import axios from "axios";
import { useState } from "react";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import upload_area from "../../assets/upload_area.svg";
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });
  const [tempProduct, setTempProduct] = useState(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const previewProduct = () => {
    if (tempProduct) {
      setTempProduct(null);
    }
    setTempProduct({ ...productDetails, image: URL.createObjectURL(image) });
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const cloudinaryResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/images/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      return cloudinaryResponse.data.secure_url;
    } catch (error) {
      console.error("Failed to Upload Image", error);
      throw error;
    }
  };

  const addProduct = async () => {
    try {
      const imageUrl = await uploadImage();

      const updatedProduct = {
        ...productDetails,
        image: imageUrl,
      };
      setTempProduct(updatedProduct);
      setProductDetails(updatedProduct);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/product/addproduct`,
        updatedProduct,
        { withCredentials: true }
      );

      alert("Product Added");
    } catch (error) {
      console.error("Failed to Add Product", error);
      alert("Failed to add product. Please check your inputs.");
    }
  };

  return (
    <div className="add-product-container flex justify-between w-11/12 h-5/6 my-5 mx-7">
      <div className="add-product box-border py-8 px-12 my-5 mx-7 rounded-2xl shadow-md transition-shadow hover:shadow-lg">
        <div className="addproduct-itemfield w-full text-gray-600 mt-4 text-base transition-colors">
          <p>Product Title</p>
          <input
            value={productDetails.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Type here ..."
            required
            className=" box-border w-full h-12 rounded-lg mt-4 pl-4 border border-solid border-gray-800 outline-none text-gray-600 text-sm transition-colors focus:border-red-600"
          />
        </div>
        <div className="addproduct-price flex gap-10">
          <div className="addproduct-itemfield w-full text-gray-600 mt-4 text-base transition-colors">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={handleChange}
              type="text"
              name="old_price"
              placeholder="Type here ..."
              required
              className=" box-border w-full h-12 rounded-lg mt-4 pl-4 border border-solid border-gray-800 outline-none text-gray-600 text-sm transition-colors focus:border-red-600"
            />
          </div>
          <div className="addproduct-itemfield w-full text-gray-600 mt-4 text-base transition-colors">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={handleChange}
              type="text"
              name="new_price"
              placeholder="Type here ..."
              required
              className=" box-border w-full h-12 rounded-lg mt-4 pl-4 border border-solid border-gray-800 outline-none text-gray-600 text-sm transition-colors focus:border-red-600"
            />
          </div>
        </div>
        <div className="addproduct-itemfield w-full text-gray-600 mt-4 text-base transition-colors">
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={handleChange}
            name="category"
            className="add-product-selector p-2 w-24 h-12 text-sm text-gray-600 border border-solid border-white rounded-lg transition-colors focus:border-red-600"
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="addproduct-itemfield w-3/12 text-gray-600 mt-4 text-base transition-colors">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="addproduct-thumbnail-img h-24 w-24 rounded-2xl object-contain my-2 mx-0 transition ease-in hover:transform hover:scale-110 cursor-pointer"
              alt="product-thumbnail"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
            className=" box-border w-full h-12 rounded-lg mt-4 pl-4 border border-solid border-gray-800 outline-none text-gray-600 text-sm transition-colors focus:border-red-600"
          />
        </div>
        <button
          onClick={() => {
            addProduct();
          }}
          className="addproduct-btn ml-2 mt-5 w-40 h-12 rounded-3xl bg-red-600 border-none text-white text-base font-medium transition-colors ease-in cursor-pointer hover:transition-transform hover:ease-in-out hover:scale-105 "
        >
          Add
        </button>
        <button
          className="addproduct-btn ml-2 mt-5 w-40 h-12 rounded-3xl bg-red-600 border-none text-white text-base font-medium transition-colors ease-in cursor-pointer hover:transition-transform hover:ease-in-out hover:scale-105"
          onClick={previewProduct}
        >
          Preview Product
        </button>
      </div>
      {tempProduct && (
        <div className="productdisplay flex m-0">
          <div className="productdisplay-left flex gap-4 my-4 mx-10">
            <div className="productdisplay-img-list flex flex-col gap-4">
              {tempProduct.image && (
                <img
                  src={tempProduct.image}
                  alt="preview-product-image"
                  className="h-28 rounded-2xl"
                />
              )}
              {tempProduct.image && (
                <img
                  src={tempProduct.image}
                  alt="preview-product-image"
                  className="h-28 rounded-2xl"
                />
              )}
              {tempProduct.image && (
                <img
                  src={tempProduct.image}
                  alt="preview-product-image"
                  className="h-28 rounded-2xl"
                />
              )}
              {tempProduct.image && (
                <img
                  src={tempProduct.image}
                  alt="preview-product-image"
                  className="h-28 rounded-2xl"
                />
              )}
            </div>
            <div className="productdisplay-img h-64 ">
              {tempProduct.image && (
                <img
                  className="productdisplay-main-img max-w-full max-h-full w-full h-auto rounded-2xl"
                  src={tempProduct.image}
                  alt="preview-product-main-img"
                />
              )}
            </div>
          </div>
          <div className="productdisplay-right flex-1 max-w-lg my-0 mx-7">
            <h1 className=" text-gray-700 text-3xl font-bold">
              {tempProduct.name}
            </h1>
            <div className="productdisplay-right-star flex items-center mt-2 gap-1 text-zinc-900 text-sm">
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_dull_icon} alt="" />
              <p>({122})</p>
            </div>
            <div className="productdisplay-right-prices flex my-5 mx-0 gap-7 text-lg font-bold">
              <div className="productdisplay-right-price-old text-gray-400 line-through">
                ${tempProduct.old_price}
              </div>
              <div className="productdisplay-right-price-new text-red-600">
                ${tempProduct.new_price}
              </div>
            </div>
            <div className="productdisplay-right-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              facere ipsam, qui dolores debitis rem
            </div>
            <div className="productdisplay-right-size">
              <h1 className="mt-9 text-gray-400 text-base font-semibold">
                Select Size
              </h1>
              <div className="productdisplay-right-sizes flex my-7 mx-0 gap-5">
                <div className="py-3 px-4 bg-slate-100 border border-solid border-slate-200 rounded-lg cursor-pointer">
                  Small
                </div>
                <div className="py-3 px-4 bg-slate-100 border border-solid border-slate-200 rounded-lg cursor-pointer">
                  Medium
                </div>
                <div className="py-3 px-4 bg-slate-100 border border-solid border-slate-200 rounded-lg cursor-pointer">
                  Large
                </div>
                <div className="py-3 px-4 bg-slate-100 border border-solid border-slate-200 rounded-lg cursor-pointer">
                  XL
                </div>
                <div className="py-3 px-4 bg-slate-100 border border-solid border-slate-200 rounded-lg cursor-pointer">
                  XXL
                </div>
              </div>
            </div>
            <button className="py-4 px-7 w-36 text-sm font-semibold text-white bg-red-600 mb-5 border-none rounded-xl outline-none cursor-pointer">
              Add to Cart
            </button>
            <p className="productdisplay-right-category mt-3">
              <span className=" font-semibold">Category : </span>
              {tempProduct.category}, T-Shirt, Crop Top
            </p>
            <p className="productdisplay-right-category mt-3">
              <span className="font-semibold">Tags : </span>
              Modern, Latest
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
