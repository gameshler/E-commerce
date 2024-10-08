import { useState } from "react";
import { useToast } from "../utils/hooks/use-toast";

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  // email validation needed
  const handleSubscribe = () => {
    if (email.trim === "") {
      toast({ title: "Please enter your email" });
    } else {
      toast({ title: "Subscribed" });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className="newsletter w-4/5 h-96 flex flex-col items-center justify-center m-auto py-0 px-0.5/10 mb-36 rounded-3xl shadow-xl gap-7 "
      style={{ background: "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)" }}
    >
      <h1 className="text-gray-950 text-5xl font-bold">
        Get Exclusive Offers On Your Email
      </h1>
      <p className="text-gray-900 text-lg">
        Subscribe to our Newsletter & Stay Updated
      </p>
      <div className="flex items-center justify-center bg-white w-full max-w-2xl h-16 rounded-3xl shadow-lg overflow-hidden ">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className=" w-4/5 p-5 border-none outline-none text-gray-300 text-base "
        />
        <button
          onClick={handleSubscribe}
          disabled={!email.trim()}
          className="w-3/12 h-full rounded-r-lg bg-black text-white text-base cursor-pointer transition: ease-in hover:bg-zinc-900"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
