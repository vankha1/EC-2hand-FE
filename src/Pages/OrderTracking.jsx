import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { ArrowRight } from "@phosphor-icons/react";
import OrderTrackingDetail from "../components/OrderTrackingDetail";
const OrderTracking = () => {
  const [toogle, setToogle] = React.useState(false);
  const [orderData, setOrderData] = React.useState({});
  const [orderId, setOrderId] = React.useState("");
  const handleTracking = () => {
    const orderData = {
      type: "anonymous",
      data: orderId,
    };
    setOrderData(orderData);
    setToogle(true);
  };
  if (toogle) {
    return <OrderTrackingDetail orderData={orderData} />;
  } else {
    return (
      <div className="h-[535px] p-36 gap-5 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">Theo dõi đơn hàng</h1>
        <p>
          Để theo dõi đơn hàng của bạn, vuo lòng nhập ID đơn hàng của bạn vào
          trường nhập bên dưới và nhấn nút "Theo dõi". Thông tin này đã được
          trao cho bạn trên biên nhận và trong email xác nhận bạn đã nhận được.
        </p>
        <div className="my-4 flex  gap-10 ">
          <div className="w-auto">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-bold"
            >
              ID của đơn hàng
            </Typography>
            <Input
              containerProps={{ className: "min-w-[72px]" }}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="ID..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              ID của đơn hàng được gửi trong biên nhận và email xác nhận.
            </Typography>
          </div>
          <div className="w-96">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-bold"
            >
              Email thanh toán
            </Typography>
            <Input
              containerProps={{ className: "min-w-[72px]" }}
              placeholder="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <div>
          <Button
            size="lg"
            className="mt-3  flex items-center justify-center gap-3 bg-[#FA8232]"
            onClick={handleTracking}
          >
            Theo dõi
            <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    );
  }
};

export default OrderTracking;
