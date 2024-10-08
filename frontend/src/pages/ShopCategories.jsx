import Items from "@/components/Items";
import { useContext, useEffect, useState } from "react";
import dropdownIcon from "../assets/dropdown_icon.png";
import { ShopContext } from "@/utils/contexts/Shop";
import "./CSS/ShopCategories.css";
import SaleCountdown from "@/components/SaleCountdown";
const ShopCategories = ({ category }) => {
  const [sortOption, setSortOption] = useState("default");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allProducts } = useContext(ShopContext);
  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    let sortedProducts = [...allProducts];
    switch (sortOption) {
      case "ascending":
        sortedProducts.sort((a, b) => a.new_price - b.new_price);
        break;

      case "descending":
        sortedProducts.sort((a, b) => b.new_price - a.new_price);
        break;

      default:
        break;
    }

    setSortedProducts(sortedProducts);
  }, [sortOption, allProducts]);

  return (
    <div className="shop-category">
      <div className="shopcategory-banner">
        <div className="ad-banner">
          <h2>Special Sale</h2>
          <p>Up to 50% off on {category} Collection</p>
          <SaleCountdown endDate={new Date("2024-12-12T00:00:00Z")} />
        </div>
      </div>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12 </span>
          out of 36
        </p>
        <div
          className="shopcategory-sort"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Sort By
          <div
            className="custom-select"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{`Price: ${
              sortOption === "default" ? "Default" : sortOption
            }`}</span>
            <img
              className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
              src={dropdownIcon}
              alt="dropdown icon"
            />
            {isDropdownOpen && (
              <div className="dropdown-options">
                <div onClick={() => handleSortChange("default")}>Default</div>
                <div onClick={() => handleSortChange("ascending")}>
                  Low to High
                </div>
                <div onClick={() => handleSortChange("descending")}>
                  High to Low
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts
          .filter((product) => category === product.category)
          .map((product) => (
            <Items key={product._id} {...product} />
          ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategories;
