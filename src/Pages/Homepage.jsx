import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePageBody from "./HomepageBody";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import ShopPage from "./ShopPage";
import { getUserMe } from "../services/authService";
import OrderTracking from "./OrderTracking";
import AccountDetail from "./AccountDetail";
import ProductDetail from "./ProductDetail";
import Dashboard from "./Dashboard";
import CreateOrder from "./CreateOrder";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./CheckOut";
import { HeaderUserProvider } from "../context/HeaderContext";
import Success from "./Success";
import ShowSearchProducts from "./ShowSearchProduct";
import Contact from "./Contact";
import OrderSuccess from "./OrderSuccess";

const HomePage = ({ type }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const response = await getUserMe();
          const userData = response.data;
          localStorage.setItem("user", JSON.stringify(userData));
          setRole(response.data.role);
        }
      } catch (error) {
        console.error("Error fetching user role", error);
      }
    };
    fetchData();
  }, [navigate, role]);
  if (type === "success") {
    return <Success />;
  }

  return (
    <HeaderUserProvider>
      {role === "user" ? (
        <div>
          <HeaderUser />
        </div>
      ) : (
        <div>
          <Header />
        </div>
      )}
      {type === "homepage" ? (
        <HomePageBody />
      ) : type === "ShopPage" ? (
        <ShopPage />
      ) : type === "trackingdelivery" ? (
        <OrderTracking />
      ) : type === "accountdetail" ? (
        <AccountDetail />
      ) : type === "productdetail" ? (
        <ProductDetail />
      ) : type === "dashboard" ? (
        <Dashboard />
      ) : type === "createorder" ? (
        <CreateOrder />
      ) : type === "shoppingcart" ? (
        <ShoppingCart />
      ) : type === "checkout" ? (
        <Checkout />
      ) : type === "search" ? (
        <ShowSearchProducts />
      ) : type === "contact" ? (
        <Contact />
      ) : type === "ordersuccess" ? (
        <OrderSuccess />
      ) : (
        <div>
          <h1>Not found</h1>
        </div>
      )}
      <Footer />
    </HeaderUserProvider>
  );
};
export default HomePage;
