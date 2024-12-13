import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  MapPinLine,
  User,
  Headphones,
  Info,
  PhoneCall,
} from "@phosphor-icons/react";
import FlyoutMenu from "./flyoutmenus";

const BottomHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-600">
      <div className="container mx-auto px-16 py-2 flex justify-between items-center text-base">
        <FlyoutMenu />

        <div className="flex space-x-6">
          <button
            className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black "
            onClick={() => navigate("/dashboard")}
          >
            <Stack size={21} />
            <span>Dashboard</span>
          </button>
          <button
            className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black "
            onClick={() => navigate("/trackingdelivery")}
          >
            <MapPinLine size={21} />
            <span> Theo dõi đơn hàng</span>
          </button>
          <button
            className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black "
            onClick={() => navigate("/accountdetail")}
          >
            <User size={21} />
            <span> Thông tin tài khoản</span>
          </button>
          <button className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black ">
            <Headphones size={21} />
            <span> CSKH</span>
          </button>
          <button
            className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black "
            onClick={() => navigate("/contact")}
          >
            <Info size={21} />
            <span> Về chúng tôi</span>
          </button>
        </div>

        <div className="flex space-x-6">
          <button className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black ">
            <PhoneCall size={21} />
            <span> 01234567890</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
