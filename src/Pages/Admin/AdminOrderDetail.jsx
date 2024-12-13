import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Circle,
  CheckCircle,
  Package,
  ShoppingBag,
  Truck,
  CaretLeft,
  CaretRight,
  PencilSimple,
} from "@phosphor-icons/react";
import { getOrderById } from "../../services/orderService";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { updateOrderStatus } from "../../services/orderService";

const AdminOrderDetail = ({ orderData, setActiveSecondary }) => {
  const [orderDetail, setOrderDetail] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
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
  const statusOrder = [
    "Đơn hàng đã được đặt",
    "Đóng gói sản phẩm",
    "Đang trên đường giao",
    "Đã giao thành công",
  ];

  const getStepStatus = (stepStatus) => {
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
  const [updateStatus, setUpdateStatus] = useState("");

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await updateOrderStatus(
        orderData.data,
        { state: updateStatus },
        token
      );
      setOrderDetail({
        ...orderDetail,
        state: response.state,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [orderDetail]);

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
              <p
              // className="flex items-center gap-2"
              >
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
              </p>
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
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trạng thái đơn hàng
            </h2>
            <div className="relative group">
              <button
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                onClick={handleOpenModal}
              >
                <PencilSimple className="w-8 h-8" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Cập nhập trạng thái
              </span>
            </div>
          </div>
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
      <Dialog open={openModal} handler={handleOpenModal} size="lg">
        <DialogBody>
          <Card className="w-full shadow-none ">
            <List className="flex-row">
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-2 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      defaultChecked={orderDetail.state === statusOrder[0]}
                      name="horizontal-list"
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value={statusOrder[0]}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-400"
                  >
                    {statusOrder[0]}
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-vue"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      defaultChecked={orderDetail.state === statusOrder[1]}
                      name="horizontal-list"
                      id="horizontal-list-vue"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value={statusOrder[1]}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-400"
                  >
                    {statusOrder[1]}
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-svelte"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      defaultChecked={orderDetail.state === statusOrder[2]}
                      name="horizontal-list"
                      id="horizontal-list-svelte"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value={statusOrder[2]}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-400"
                  >
                    {statusOrder[2]}
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-miumiu"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      defaultChecked={orderDetail.state === statusOrder[3]}
                      name="horizontal-list"
                      id="horizontal-list-miumiu"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value={statusOrder[3]}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-400"
                  >
                    {statusOrder[3]}
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="orange"
            onClick={() => {
              handleUpdateStatus();
              handleOpenModal();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default AdminOrderDetail;
