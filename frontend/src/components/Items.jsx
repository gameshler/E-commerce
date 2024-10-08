import { NavLink } from "react-router-dom";

const Items = ({ _id, name, image, old_price, new_price }) => {
  return (
    <div
      className="item w-80 hover:transform hover:scale-105 hover:shadow-xl rounded-lg"
      style={{ transition: "transform 0.6s ease, box-shadow 0.6s ease" }}
    >
      <NavLink to={`/product/${_id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={image}
          alt="product image"
          className=" max-w-full rounded-lg shadow-xl"
        />
      </NavLink>
      <p className=" my-1 mx-0 text-gray-700 text-base">{name}</p>
      <div className="item-prices flex gap-5">
        <div className="item-price-new text-blue-950 text-lg font-semibold">
          ${new_price}
        </div>
        <div className="item-price-old text-gray-400 text-lg font-medium line-through">
          ${old_price}
        </div>
      </div>
    </div>
  );
};

export default Items;
