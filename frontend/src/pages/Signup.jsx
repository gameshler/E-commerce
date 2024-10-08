import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormFields({
      ...formFields,
      [name]: newValue,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formFields.agree) {
      alert("Please agree to our Terms & Conditions");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        formFields,
        {
          withCredentials: true,
        }
      );

      if (response.data.ok) {
        navigate("/login");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error during signup", error);
    }
  };
  return (
    <form>
      <div className="loginsignup w-full h-screen bg-pink-200 pt-24">
        <div
          className="loginsignup-container bg-white rounded-2xl m-auto py-10 px-14 "
          style={{ width: "680px", height: "700px" }}
        >
          <h1 className="my-5 mx-0 text-xl">Sign Up</h1>
          <div className="loginsignup-fields flex flex-col gap-7 m-7">
            <input
              name="username"
              type="text"
              value={formFields.username}
              onChange={changeHandler}
              placeholder="Enter your username"
              className=" h-16 w-full pl-5 border border-solid border-gray-400 rounded-2xl outline-none text-gray-500 text-lg"
              required
            />
            <input
              name="email"
              type="email"
              value={formFields.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className=" h-16 w-full pl-5 border border-solid border-gray-400 rounded-2xl outline-none text-gray-500 text-lg"
              required
            />
            <input
              name="password"
              type="password"
              value={formFields.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className=" h-16 w-full pl-5 border border-solid border-gray-400 rounded-2xl outline-none text-gray-500 text-lg"
              required
            />
          </div>
          <button
            onClick={submitHandler}
            className=" h-16 text-white bg-red-500 hover:bg-red-400 mt-7 border-none rounded-2xl text-2xl font-medium cursor-pointer"
            style={{ width: "580px" }}
          >
            Signup
          </button>
          <p className="loginsignup-login mt-5 text-gray-400 text-lg font-medium ">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-red-500 font-semibold cursor-pointer ml-1"
            >
              Login here
            </span>
          </p>
          <div className="loginsignup-agree flex items-center mt-6 gap-5 text-gray-800 text-lg font-medium">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={formFields.agree}
              onChange={changeHandler}
              required
            />
            <label htmlFor="agree">
              By Contnuing you agree to our Terms & Conditions
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
