import React, { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  ShoppingBag,
  Circle,
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { getOrderById } from "../services/orderService";
import RatingDialog from "./RatingDialog";

const OrderTrackingDetail = ({ orderData, setActiveSecondary }) => {
  const [orderDetail, setOrderDetail] = useState({});
  const [openProductId, setOpenProductId] = React.useState(null);
  const handleOpen = (productId) => {
    setOpenProductId(openProductId === productId ? null : productId);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      console.log(orderData);
      try {
        const response = await getOrderById(orderData.data, token);
        setOrderDetail(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [orderData]);

  const activities = [
    {
      id: 1,
      status: "Order Placed",
      timestamp: "2024-01-20 09:00",
      description: "Order has been placed successfully",
    },
    {
      id: 2,
      status: "Packaging",
      timestamp: "2024-01-21 14:20",
      description: "Order is being packed",
    },
    {
      id: 3,
      status: "On The Road",
      timestamp: "2024-01-22 10:15",
      description: "Package is out for delivery",
    },
    {
      id: 4,
      status: "Order Delivered",
      timestamp: "2024-01-22 15:30",
      description: "Package has been delivered",
    },
  ];

  const steps = [
    {
      id: 1,
      name: "Order Placed",
      icon: ShoppingBag,
      status: "Đơn hàng đã được đặt",
    },
    { id: 2, name: "Packaging", icon: Package, status: "Đóng gói sản phẩm" },
    { id: 3, name: "On The Road", icon: Truck, status: "Đang trên đường giao" },
    {
      id: 4,
      name: "Delivered",
      icon: CheckCircle,
      status: "Đã giao thành công",
    },
  ];

  const getStepStatus = (stepStatus) => {
    const statusOrder = [
      "Đơn hàng đã được đặt",
      "Đóng gói sản phẩm",
      "Đang trên đường giao",
      "Đã giao thành công",
    ];
    const currentIndex = statusOrder.indexOf(orderDetail.state);

    const stepIndex = statusOrder.indexOf(stepStatus);

    if (orderDetail.state === "Đã giao thành công") return "completed";

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };
  const getActivityStatus = (activityStatus) => {
    const statusOrder = [
      "Order Placed",
      "Packaging",
      "On The Road",
      "Order Delivered",
    ];
    const currentIndex = statusOrder.indexOf(orderDetail.state);
    return statusOrder.slice(0, currentIndex + 1).includes(activityStatus);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (data) => Math.ceil(data?.length / itemsPerPage);

  const renderPagination = (data) => (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretLeft />
      </button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages(data)}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages(data)))
        }
        disabled={currentPage === totalPages(data)}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretRight />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Order Information Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4">
            {orderData.type !== "anonymous" && (
              <ArrowLeft
                size={22}
                className="mb-4 hover:cursor-pointer hover:text-orange"
                onClick={() =>
                  setActiveSecondary({
                    type: "orderList",
                    data: null,
                  })
                }
              />
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thông tin đơn hàng
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID Đơn hàng</p>
              <p className="font-medium">{orderDetail._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền</p>
              <p className="font-medium">
                {orderDetail?.totalPrice?.toLocaleString()} VNĐ
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="font-medium">
                {orderDetail?.receivingAddress?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">
                {orderDetail?.receivingPhone?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phương thức thanh toán</p>
              <p className="font-medium">
                {orderDetail?.paymentMethod?.toLocaleString()}
              </p>
              {orderDetail?.paymentMethod === "Chuyển khoản ngân hàng" && (
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    orderDetail.paymentState
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {orderDetail.paymentState
                    ? "ĐÃ THANH TOÁN"
                    : "CHƯA THANH TOÁN"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày đặt hàng</p>
              <p className="font-medium">
                {new Date(orderDetail?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Order Status Stepper */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Trạng thái đơn hàng
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      getStepStatus(step.status) === "completed"
                        ? "bg-green-500"
                        : getStepStatus(step.status) === "current"
                        ? "bg-blue-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 hidden md:block bg-gray-200">
                    <div
                      className={`h-full ${
                        getStepStatus(step.status) === "completed"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Ordered Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thông tin sản phẩm
            </h2>
            {orderDetail?.listOfSingleOrder &&
            orderDetail.listOfSingleOrder.length > 0 ? (
              getPaginatedData(orderDetail.listOfSingleOrder).map(
                (item, index) => (
                  <div className="grid grid-cols-3" key={index}>
                    <div className="col-span-2 flex items-start space-x-4 mb-6">
                      <img
                        src={
                          item?.product?.images[0] ||
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                        }
                        alt={item?.product?.productName || "Product"}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
                        }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item?.product?.productName || "Product"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Số lượng: {item?.quantity || "1"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Màu: {item?.product?.color || ""}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {item?.product?.description || ""}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Giá: {item?.product?.price?.toLocaleString()} VNĐ
                        </p>
                      </div>
                    </div>
                    {orderDetail.state === "Đã giao thành công" && (
                      <div className="col-span-1">
                        <button
                          className="
                        px-4 py-2 rounded-lg flex items-center space-x-2
                        text-sm
                      hover:text-yellow-600 transition-colors duration-300 hover:border-yellow-600
                      hover:bg-yellow-100 border border-yellow-500 text-yellow-500
                    "
                          onClick={() => {
                            handleOpen(item.productId);
                          }}
                        >
                          <span className="text-orange"> ⭐ Đánh giá ngay</span>
                          <ArrowRight className="w-5 h-5 inline-block text-orange" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">
                Không có sản phẩm nào trong đơn hàng.
              </p>
            )}
            {renderPagination(orderDetail.listOfSingleOrder)}
          </div>

          {/* Order Activity Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Chi tiết trạng thái đơn hàng
            </h2>
            <div className="space-y-4">
              {activities
                .filter((activity) => getActivityStatus(activity.status))
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 border-l-2 border-gray-200 pl-4"
                  >
                    <Circle className="w-2 h-2 mt-2 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.timestamp}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <RatingDialog
        productId={openProductId}
        open={openProductId !== null}
        handleOpen={() => handleOpen(openProductId)}
      />
    </div>
  );
};

export default OrderTrackingDetail;
