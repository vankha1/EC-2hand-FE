import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Radio,
} from "@material-tailwind/react";
import { ShoppingCart } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { placeOrder } from "../services/orderService";
import { createQRCodePayment } from "../services/paymentService";

const PaymentMethod = {
  BANK_TRANSFER: "Chuyển khoản ngân hàng",
  CASH: "Thanh toán tiền mặt khi nhận hàng",
};

const Checkout = () => {
  const location = useLocation();
  const { cartItems } = location.state;
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    sendToDifferentAddress: false,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    additionalNotes: "",
  });

  const subTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const totalPostingCost = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.postingCost, 0),
    [cartItems]
  );
  const totalDiscount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.discount, 0),
    [cartItems]
  );
  const totalTax = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.tax, 0),
    [cartItems]
  );
  const total = subTotal - totalDiscount + totalTax + totalPostingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.paymentMethod === PaymentMethod.CASH) {
      const orderData = {
        items: cartItems.map((item) => ({
          ...item,
          useInsurance: item.useInsurance || false,
        })),
        paymentMethod: formData.paymentMethod,
        receivingAddress: formData.address || currentUser.location,
        receivingPhone: formData.phone || currentUser.phoneNumber,
        receiver: formData.name || currentUser.fullname,
        deliveryDate: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date.toISOString();
        })(),
      };
      const token = localStorage.getItem("accessToken");
      const order = await placeOrder(orderData, token);
      window.location.href = "/ordersuccess";
    } else {
      const orderData = {
        items: cartItems.map((item) => ({
          ...item,
          useInsurance: item.useInsurance || false,
        })),
        paymentMethod: formData.paymentMethod,
        receivingAddress: formData.address || currentUser.location,
        receivingPhone: formData.phone || currentUser.phoneNumber,
        receiver: formData.name || currentUser.fullname,
        deliveryDate: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date.toISOString();
        })(),
      };
      const token = localStorage.getItem("accessToken");

      const order = await placeOrder(orderData, token);

      const paymentLink = await createQRCodePayment(order._id.toString());
      window.location.href = paymentLink;
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2 shadow-lg">
          <CardBody>
            <h2 className="text-lg font-semibold mb-4">Thông tin thanh toán</h2>
            <div className="mb-6">
              <Input
                name="name"
                label="Họ tên người nhận"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                name="address"
                label="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                name="phone"
                label="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <Checkbox
              name="sendToDifferentAddress"
              label="Gửi hàng vào địa chỉ khác"
              checked={formData.sendToDifferentAddress}
              onChange={handleChange}
            />

            {/* Payment Method */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
              <Radio
                id="bank-transfer"
                name="paymentMethod"
                label={PaymentMethod.BANK_TRANSFER}
                value={PaymentMethod.BANK_TRANSFER}
                checked={formData.paymentMethod === PaymentMethod.BANK_TRANSFER}
                onChange={handleChange}
              />
              <Radio
                id="cash"
                name="paymentMethod"
                label={PaymentMethod.CASH}
                value={PaymentMethod.CASH}
                checked={formData.paymentMethod === PaymentMethod.CASH}
                onChange={handleChange}
              />
            </div>
            {/* Additional Notes */}
            <h2 className="text-lg font-semibold mb-4">Thông tin thêm</h2>
            <Input
              name="additionalNotes"
              label="Ghi chú (tùy chọn)"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Điền thêm thông tin cụ thể hơn để shipper và nhà cung cấp có thể đáp ứng nhu cầu của bạn..."
            />
          </CardBody>
        </Card>

        <div>
          <Card className="shadow-lg">
            <CardBody>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart size={24} />
                Xác nhận đơn hàng
              </h2>
              {/* Order Items */}
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm">{item.quantity}</p>
                      <p className="text-blue-500">
                        {" "}
                        x {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Summary Totals */}
              <div className="flex justify-between mb-2">
                <span>Tổng tiền hàng</span>
                <span>{subTotal.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phí ship</span>
                <span>{totalPostingCost.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Giảm giá</span>
                <span>- {totalDiscount.toLocaleString()} VNĐ</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Thuế</span>
                <span>{totalTax.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Thành tiền</span>
                <span>{total.toLocaleString()} VNĐ</span>
              </div>
              <Button
                fullWidth
                color="orange"
                className="mt-4 text-sm"
                onClick={handleSubmit}
              >
                Đặt hàng{" "}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
