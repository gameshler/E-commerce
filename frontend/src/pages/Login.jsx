import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import breadCrumArrow from "../assets/breadcrum_arrow.png";
import axios from "axios";
import { ShopContext } from "@/utils/contexts/Shop";
const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { setMenu } = useContext(ShopContext);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        formFields,
        {
          withCredentials: true,
        }
      );

      if (response.data.ok) {
        navigate("/Shop");
        setMenu("shop");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };
  return (
    <form>
      <div className="login w-full h-screen bg-pink-200 pt-24">
        <div
          className="login-container bg-white rounded-2xl m-auto py-10 px-14 shadow-xl"
          style={{ width: "680px", height: "700px" }}
        >
          <span>
            <img
              src={breadCrumArrow}
              alt="Bread Crum Arrow"
              onClick={navigateToSignup}
              className=" transform: rotate-180 cursor-pointer"
            />
          </span>
          <h1 className="my-5 mx-0 text-xl">Login</h1>
          <div className="login-fields flex flex-col gap-7 m-8 ">
            <input
              name="email"
              type="email"
              value={formFields.email}
              onChange={changeHandler}
              placeholder="Enter Email"
              required
              className=" h-16 w-full pl-5 border border-solid border-gray-400 rounded-2xl outline-none text-gray-500 text-lg"
            />
            <input
              name="password"
              type="password"
              value={formFields.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              required
              className=" h-16 w-full pl-5 border border-solid border-gray-400 rounded-2xl outline-none text-gray-500 text-lg"
            />
          </div>
          <button
            onClick={submitHandler}
            className=" w-full h-16 text-white bg-red-500 mt-8 border-none rounded-xl text-2xl font-medium cursor-pointer hover:bg-red-400"
          >
            Login
          </button>
          <p className="signup-btn flex justify-between mt-5 text-gray-500 text-lg font-medium">
            <span
              onClick={navigateToSignup}
              className=" font-medium hover:text-red-500 cursor-pointer"
            >
              No account Yet?
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
