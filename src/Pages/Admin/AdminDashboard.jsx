import React, { useState, useEffect } from "react";
import {
  List,
  User,
  Gear,
  SignOut,
  Package,
  House,
  Users,
  ChartLine,
  Chat,
} from "@phosphor-icons/react";
import AdminProductList from "./AdminProductList";
import AdminUserList from "./AdminUserList";
import AdminOrderList from "./AdminOrderList";
import { getProducts } from "../../services/productService";
import AdminOrderDetail from "./AdminOrderDetail";
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productData, setProductData] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const [activeSecondary, setActiveSecondary] = useState({});

  useEffect(() => {
    if (activeSecondary) {
      console.log(activeSecondary);
    }
  }, [activeSecondary]);

  const stats = [
    {
      title: "Total Users",
      value: "2,345",
      icon: <Users className="text-blue-500" />,
    },
    {
      title: "Revenue",
      value: "12,345,678 VNĐ",
      icon: <ChartLine className="text-green-500" />,
    },
    {
      title: "Products",
      value: "1,234",
      icon: <Package className="text-purple-500" />,
    },
    {
      title: "Messages",
      value: "43",
      icon: <Chat className="text-yellow-500" />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          page: 1,
          limit: 10,
          sort: { price: -1 },
          matches: {},
        };
        const response = await getProducts(data);
        setProductData(response.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <AdminUserList />;
      case "products":
        return <AdminProductList products={productData} />;
      case "orders":
        return activeSecondary?.type === "orderDetail" ? (
          <AdminOrderDetail
            orderData={activeSecondary}
            setActiveSecondary={setActiveSecondary}
          />
        ) : (
          <AdminOrderList setActiveSecondary={setActiveSecondary} />
        );
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <List className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">VNU2HAND Admin</h1>
          </div>
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            >
              <img
                src="logo.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span>Admin</span>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-red-500">
                  <SignOut className="mr-2" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 mt-16 h-full bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center space-x-2 p-2 w-full rounded-md hover:bg-gray-100"
          >
            <House /> <span>Trang chủ</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className="flex items-center space-x-2 p-2 w-full rounded-md hover:bg-gray-100"
          >
            <Users /> <span>Danh sách người dùng</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center space-x-2 p-2 w-full rounded-md hover:bg-gray-100"
          >
            <Package /> <span>Danh sách sản phẩm</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center space-x-2 p-2 w-full rounded-md hover:bg-gray-100"
          >
            <ChartLine /> <span>Danh sách đơn hàng</span>
          </button>
        </nav>
      </aside>

      <main
        className={`pt-16 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
