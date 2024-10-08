import Hero from "@/components/Hero";
import NewCollections from "../components/NewCollections";
import Newsletter from "../components/Newsletter";
import Offers from "@/components/Offers";
import Popular from "../components/Popular";
import { Toaster } from "@/components/ui/toaster";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
      <Toaster />
    </div>
  );
};

export default Shop;
