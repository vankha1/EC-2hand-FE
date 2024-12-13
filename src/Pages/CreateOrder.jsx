import { Button, Input, Typography } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCarts } from "../services/cartService";
import { useHeaderUserContext } from "../context/HeaderContext";

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart } = useHeaderUserContext();
  const { productData, previousUrl, ammountItem, useInsurance } =
    location.state;
  const [cartItems, setCartItems] = React.useState([
    { ...productData, toBuy: ammountItem },
  ]);

  const totalItemsPrice = useMemo(
    () =>
      cartItems
        .reduce((total, item) => total + item.price * item.toBuy, 0)
        .toLocaleString(),
    [cartItems]
  );

  const handleQuantityChange = (id, operation) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (!item.toBuy) return 1;
        return item._id === id
          ? {
              ...item,
              toBuy: operation === "increase" ? item.toBuy + 1 : item.toBuy - 1,
            }
          : item;
      })
    );
  };

  // Remove item from the cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleAddToCart = async () => {
    const { accessToken, cartId } = localStorage;
    const cartData = {
      items: [
        {
          productId: productData._id,
          quantity: cartItems[0].toBuy,
          price: productData.price,
          useInsurance: useInsurance,
        },
      ],
    };
    const cart = await updateCarts(cartId, cartData, accessToken);
    setCart(cart);
    navigate("/shoppingcart");
  };

  const handleCheckOut = () => {
    const cartData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.toBuy,
        price: item.price,
        useInsurance: useInsurance,
        productName: item.productName,
        discount: 0,
        tax: 0,
        postingCost: item.postingCost,
      })),
    };
    navigate("/checkout", { state: { cartItems: cartData.items } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2">
          <div className=" bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">Giỏ hàng</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="pb-2">Sản phẩm</th>
                  <th className="pb-2">Giá</th>
                  <th className="pb-2">Số lượng</th>
                  <th className="pb-2">Tổng tiền phụ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-3">
                      <img
                        src={item.images[0]}
                        alt={item.productName}
                        className="inline-block w-12 h-12 rounded-lg mr-2"
                      />
                      {item.productName}
                    </td>
                    <td className="py-3">{item.price.toLocaleString()} VNĐ</td>
                    <td className="py-3">
                      <div className="flex items-center  rounded-lg">
                        <button
                          className="px-3 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item._id, "decrease")
                          }
                          disabled={isNaN(item.toBuy) || item.toBuy === 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.toBuy || 1}
                          readOnly
                          className="w-12 text-center border-l border-r border-gray-300 text-gray-800"
                        />
                        <button
                          className="px-3 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item._id, "increase")
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3">
                      {(item.price * item.toBuy || item.price).toLocaleString()}{" "}
                      VNĐ
                    </td>
                    <td
                      className="py-3 text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      ✖
                    </td>
                  </tr>
                ))}
                {useInsurance && (
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
                    Đơn hàng của bạn có sử dụng bảo hiểm
                  </Typography>
                )}
              </tbody>
            </table>
            <div className="flex justify-between gap-60">
              <Button
                className="mt-2 flex items-center justify-center gap-3 "
                fullWidth
                variant="outlined"
                style={{ borderColor: "blue", color: "blue" }}
                onClick={() => navigate(previousUrl)}
              >
                <ArrowLeft size={20} />
                Quay lại shop
              </Button>
              <Button
                className="mt-2 flex items-center justify-center gap-3 "
                fullWidth
                variant="outlined"
                style={{ borderColor: "blue", color: "blue" }}
                onClick={handleAddToCart}
              >
                Cập nhập vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>

        {/* Coupoun */}
        <div className="flex flex-col gap-10">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin đơn</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền:</span>
                <span>{totalItemsPrice} VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí ship:</span>
                <span>
                  {cartItems
                    .reduce((total, item) => total + item.postingCost, 0)
                    .toLocaleString()}{" "}
                  VNĐ
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Thành tiền:</span>
                <span>
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + item.price * item.toBuy + item.postingCost,
                      0
                    )
                    .toLocaleString()}{" "}
                  VNĐ
                </span>
              </div>
            </div>
            <button
              className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
              onClick={handleCheckOut}
            >
              Thanh toán ngay
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Mã giảm giá</h2>

            <Input
              containerProps={{ className: "min-w-[72px]" }}
              placeholder="Mã áp dụng"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <button className="mt-4  flex items-center justify-center gap-2 bg-[#2DA5F3] text-white px-4 py-2  font-semibold hover:bg-blue-600">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;
