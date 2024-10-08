import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [menu, setMenu] = useState(() => {
    const storedMenu = sessionStorage.getItem("menu");
    return storedMenu || "shop";
  });
  const fetchAllProducts = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/product/allproducts`
  );
  const fetchPopularProducts = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/collections/popularinwoman`
  );
  const fetchNewCollections = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/collections/newcollection`
  );
  const checkAdmin = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/status/checkadmin`
  );
  const checkUser = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/status/checkuser`
  );
  useEffect(() => {
    sessionStorage.setItem("menu", menu);
  }, [menu]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/cart/addtocart`,
        { productId },
        {
          withCredentials: true,
        }
      );

      if (response.data.ok) {
        setCartItems((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_SERVER_URL}/cart/removefromcart`,
        { productId },
        { withCredentials: true }
      );

      if (response.data.ok) {
        setCartItems((prev) => prev.filter((item) => item !== productId));
      }
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  useEffect(() => {
    if (!fetchAllProducts.loading && fetchAllProducts.data) {
      setAllProducts(fetchAllProducts.data.products);
    }
    if (!fetchPopularProducts.loading && fetchPopularProducts.data) {
      setPopularProducts(fetchPopularProducts.data);
    }
    if (!fetchNewCollections.loading && fetchNewCollections.data) {
      setNewCollections(fetchNewCollections.data.newCollection);
    }
  }, [fetchAllProducts, fetchPopularProducts, fetchNewCollections]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/cart/getcart`,

          {
            withCredentials: true,
          }
        );

        if (response.data.ok) {
          const cartData = response.data.cartData.map((item) => item.productId);
          setCartItems(cartData);
        }
      } catch (error) {
        console.error("Failed to Get Cart", error);
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const response = await axios.get(
            `${
              import.meta.env.VITE_SERVER_URL
            }/product/search?q=${searchQuery}`,
            {
              withCredentials: true,
            }
          );
          setSearchResults(response.data.products);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    const checkAdminRights = async () => {
      try {
        const { loading, data, error } = checkAdmin;
        if (!loading && !error && data && data.ok) {
          setIsAdmin(checkAdmin.data.ok);
        }
      } catch (error) {
        console.error("Failed to Check Admin Rights:", error);
      }
    };

    checkAdminRights();
  }, [checkAdmin]);

  useEffect(() => {
    const checkUserRights = async () => {
      try {
        const { loading, data, error } = checkUser;
        if (!loading && !error && data && data.ok) {
          setIsUser(checkUser.data.ok);
        }
      } catch (error) {
        console.error("Failed to Check User Rights:", error);
      }
    };
    checkUserRights();
  }, [checkUser]);

  const getTotalCartItems = () => {
    return cartItems.length;
  };

  const getTotalCartAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = allProducts.find((product) => product._id === item);
      total += product.new_price;
    });
    return total;
  };

  const contextValue = {
    menu,
    setMenu,
    allProducts,
    setAllProducts,
    popularProducts,
    newCollections,
    setSearchQuery,
    searchResults,
    searchQuery,
    getTotalCartAmount,
    getTotalCartItems,
    removeFromCart,
    addToCart,
    cartItems,
    isAdmin,
    isUser,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
