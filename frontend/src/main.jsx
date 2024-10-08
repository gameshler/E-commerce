import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./globals.css";
import ShopProvider from "./utils/contexts/Shop.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ShopProvider>
    <App />
  </ShopProvider>
);
