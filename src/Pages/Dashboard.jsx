import {
  ArrowLeft,
  ArrowRight,
  ClockClockwise,
  Gear,
  Heart,
  MapPinLine,
  Notebook,
  ShoppingCartSimple,
  SignOut,
  Stack,
  Storefront,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import { ListOrder } from "../components/ListOrder";
import ManageProductsTable from "../components/ManageProductsTable";
import OrderTrackingDetail from "../components/OrderTrackingDetail";
import ShoppingCart from "./ShoppingCart";
import AccountDetail from "./AccountDetail";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMain, setActiveMain] = useState("dashboard");
  const [activeAction, setActiveAction] = useState("primary"); // New state for action toggle
  const [activeSecondary, setActiveSecondary] = useState({});
  useEffect(() => {
    if (activeSecondary) {
      console.log(activeSecondary);
    }
  }, [activeSecondary]);
  const primaryNavItems = [
    {
      label: "Thông tin tài khoản",
      value: "dashboard",
      icon: Stack,
      content: <AccountDetail />,
    },
    {
      label: "Lịch sử giao dịch",
      value: "billhistory",
      icon: Storefront,
      content:
        activeSecondary?.type === "orderDetail" ? (
          <OrderTrackingDetail
            orderData={activeSecondary}
            setActiveSecondary={setActiveSecondary}
          />
        ) : (
          <ListOrder setActiveSecondary={setActiveSecondary} />
        ),
    },

    {
      label: "Giỏ hàng",
      value: "cart",
      icon: ShoppingCartSimple,
      content: <ShoppingCart />,
    },

    // {
    //   label: "Thông tin cá nhân",
    //   value: "profile",
    //   icon: Notebook,
    //   content: `We're not always in the position that we want to be at.
    //       We're constantly growing. We're constantly making mistakes. We're
    //       constantly trying to express ourselves and actualize our dreams.`,
    // },

    // {
    //   label: "Cài đặt tài khoản",
    //   value: "settings",
    //   icon: Gear,
    //   content: `We're not always in the position that we want to be at.
    //       We're constantly growing. We're constantly making mistakes. We're
    //       constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];

  const secondaryNavItems = [
    {
      value: "sellingproduct",
      label: "Đăng bán sản phẩm",
      icon: ShoppingCartSimple,
      content: <CreateProductForm />,
    },
    {
      value: "manageproduct",
      label: "Quản lý sản phẩm",
      icon: Storefront,
      content: <ManageProductsTable />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 ease-in-out relative flex flex-col justify-between`}
      >
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-5 bg-white rounded-full p-1.5 shadow-md text-black hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isOpen ? "Collapse menu" : "Expand menu"}
          >
            {isOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </button>

          <nav
            className="pt-5 px-4"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex justify-center mb-3 space-x-2">
              {/* <button
                onClick={() => setActiveAction("primary")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeAction === "primary"
                    ? "bg-orange text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {isOpen ? "Người dùng" : "U"}
              </button> */}
              {isOpen && (
                <button
                  onClick={() => setActiveAction("primary")}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeAction === "primary"
                      ? "bg-orange text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  Người dùng
                </button>
              )}
              {/* <button
                onClick={() => setActiveAction("secondary")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeAction === "secondary"
                    ? "bg-orange text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {isOpen ? "Mua bán" : "S"}
              </button> */}
              {isOpen && (
                <button
                  onClick={() => setActiveAction("secondary")}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeAction === "secondary"
                      ? "bg-orange text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  Mua bán
                </button>
              )}
            </div>

            {(activeAction === "primary"
              ? primaryNavItems
              : secondaryNavItems
            ).map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveMain(item.value)}
                className={`w-full flex items-center p-3 mb-2 rounded-lg transition-all duration-200  text-sm ${
                  activeMain === item.value
                    ? "bg-orange text-white"
                    : "text-black hover:bg-blue-50 hover:text-blue-500"
                }`}
                aria-current={activeMain === item.value ? "page" : undefined}
              >
                <item.icon
                  className={`${isOpen ? "mr-3" : "mx-auto"} text-xl`}
                />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Added Logout Button */}
        <div className="px-4 pb-6">
          <button
            onClick={() => console.log("Logout clicked")}
            className="w-full flex items-center p-3 rounded-lg transition-all duration-200 text-black hover:bg-red-50 hover:text-red-500"
          >
            <SignOut className={`${isOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isOpen && <span className="font-medium  text-sm">Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div>
          {primaryNavItems.find((item) => item.value === activeMain)?.content}
          {secondaryNavItems.find((item) => item.value === activeMain)?.content}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
