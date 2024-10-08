import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { useContext, useState } from "react";
import { ShopContext } from "@/utils/contexts/Shop";

const ProductShowcase = ({
  product: { _id, name, image, old_price, new_price, category },
}) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="productdisplay flex my-0 mx-44">
      <div className="productdisplay-left flex gap-4">
        <div className="productdisplay-img-list w-1/4">
          {Array.from({ length: 4 }).map((_, index) => (
            <img
              key={index}
              src={image}
              alt="product image"
              className=" h-1/4 mt-1 rounded-2xl object-cover hover:scale-110"
              style={{ transition: "transform 0.3s ease" }}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          {image && (
            <img
              className="productdisplay-main-img h-1/2 max-w-full rounded-2xl object-cover"
              src={image}
              alt="product image"
            />
          )}
        </div>
      </div>
      <div className="productdisplay-right my-0 mx-16 flex flex-col">
        <h1 className="text-gray-800 text-4xl font-bold">{name}</h1>
        <div className="productdisplay-right-star flex items-center mt-3 gap-1 text-gray-900 text-base">
          {Array.from({ length: 4 }).map((_, index) => (
            <img key={index} src={star_icon} alt="star icon" />
          ))}
          <img src={star_dull_icon} alt="star icon" />
          <p>({122})</p>
        </div>
        <div className="productdisplay-right-prices flex my-10 mx-0 gap-7 text-2xl font-bold">
          <div className="productdisplay-right-price-old text-gray-300 line-through">
            ${old_price}
          </div>
          <div className="productdisplay-right-price-new text-red-500">
            ${new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
          harum vero at qui veniam voluptatibus, quisquam odio repellendus, illo
          corrupti debitis rerum nostrum voluptatem repudiandae, labore
          distinctio ea sit incidunt.
        </div>
        <div className="productdisplay-right-size">
          <h1 className=" mt-14 text-gray-600 text-xl font-semibold">
            Select Size
          </h1>
          <div className="productdisplay-right-sizes flex my-8 mx-0 gap-5">
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <div
                key={index}
                onClick={() => handleSizeSelection(size)}
                className={` px-5 py-4 bg-slate-50 border-solid border border-slate-200 rounded-lg cursor-pointer ${
                  selectedSize === size ? " bg-slate-900 text-white" : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => addToCart(_id)}
          className=" py-5 px-10 w-48 text-base font-semibold text-white bg-red-500 mb-10 border-none rounded-xl outline-none cursor-pointer hover:bg-red-400 transition"
        >
          Add to Cart
        </button>
        <p className="productdisplay-right-category mt-2">
          <span className="font-semibold">Category: </span>
          {category}, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category mt-2">
          <span className="font-semibold">Tags: </span>
          Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductShowcase;
