import { ShopContext } from "@/utils/contexts/Shop";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.css";
import useDebounce from "@/utils/hooks/useDebounce";
const SearchBar = () => {
  const { setSearchQuery, searchResults, searchQuery } =
    useContext(ShopContext);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchInput}
          value={searchQuery}
        />
      </div>
      {debouncedSearch.trim() !== "" && (
        <div
          className={`product-slider ${searchResults.length > 0 ? "" : "hide"}`}
        >
          {searchResults.length > 0 &&
            searchResults.map((product) => (
              <div key={product._id} className="product-slider-item">
                <NavLink
                  to={`/product/${product._id}`}
                  onClick={() => setSearchQuery("")}
                >
                  <img src={product.image} alt={product.name} />
                </NavLink>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

// filtering, pagination and sorting
