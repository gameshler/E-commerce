import Breadcrumbs from "@/components/Breadcrumbs";
import DescriptionBox from "@/components/DescriptionBox";
import ProductShowcase from "@/components/ProductShowcase";
import RelatedProducts from "../components/RelatedProducts";
import Spinner from "@/components/ui/spinner";
import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const { allProducts } = useContext(ShopContext);
  if (!allProducts.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  const product = allProducts.find((product) => product._id === productId);

  return (
    <div>
      <Breadcrumbs product={product} />
      <ProductShowcase product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
