import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import removeIcon from "../assets/cart_cross_icon.png";
import Spinner from "./ui/spinner";
const CartItems = () => {
  const { allProducts, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  if (!allProducts.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="cartitems my-24 mx-44">
      <div className="cartitems-format-main grid grid-cols-6 items-center gap-16  py-5 px-0 text-gray-800 text-lg font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className=" h-1 bg-gray-100 border-none " />
      {cartItems.map((cartItemId) => {
        const product = allProducts.find(
          (product) => product._id === cartItemId
        );

        const { _id, name, image, new_price } = product;
        const quantity = 1;

        return (
          <div key={_id}>
            <div className="grid grid-cols-6 items-center gap-16  py-5 px-0 text-gray-800 text-base font-medium">
              <img
                className="carticon-product-icon h-16 ml-3 rounded-lg"
                src={image}
                alt={name}
              />
              <p>{name}</p>
              <p className="new-price my-0 mx-1">${new_price}</p>
              <button className="cartitems-quantity w-16 h-12 my-0 mx-2 border-2 border-gray-300 border-solid rounded-lg bg-white">
                {quantity}
              </button>
              <p className="total-price my-0 mx-1">${new_price * quantity}</p>
              <img
                className="cartitems-remove-icon w-4 my-0 mx-8 cursor-pointer"
                src={removeIcon}
                onClick={() => removeFromCart(_id)}
                alt="Remove from Cart"
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down flex my-24 mx-0">
        <div className="cartitems-total flex-1 flex flex-col mr-48 gap-10">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item flex justify-between py-4 px-0">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item flex justify-between py-4 px-0">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item flex justify-between py-4 px-0">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className=" w-64 h-14 outline-none border-none rounded-xl bg-red-600 text-white text-base font-semibold hover:bg-red-500 cursor-pointer">
            Proceed To Checkout
          </button>
        </div>
        <div className="cartitems-promocode flex-1 text-base font-medium">
          <p className=" text-gray-700">
            If you have a promo code, Enter it here
          </p>
          <div className="cartitems-promobox flex items-center w-96 mt-4 rounded-2xl pl-5 h-14 bg-slate-50">
            <input
              className=" border-none outline-none bg-transparent text-base w-80 h-12"
              type="text"
              placeholder="promo code"
            />
            <button className=" w-44 h-14 rounded-2xl text-base bg-black text-white cursor-pointer hover:bg-zinc-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
