import { Button, Input, Typography } from "@material-tailwind/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCarts, updateCarts, deleteCart } from "../services/cartService";
import { useHeaderUserContext } from "../context/HeaderContext";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const { setCart } = useHeaderUserContext();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const { accessToken } = localStorage;
      const cart = await getCarts(accessToken);
      setCart(cart[cart.length - 1]);
      setCartItems(cart[cart.length - 1].productItems);
    };
    fetchCart();
  }, []);

  const handleUpdateCart = async (data) => {
    const { accessToken, cartId } = localStorage;
    console.log(data, cartId);
    const updateData = {
      items: [
        {
          productId: data.productId,
          quantity: data.operation === "increase" ? 1 : -1,
          useInsurance: data.useInsurance,
          price: data.price,
        },
      ],
    };
    const cart = await updateCarts(cartId, updateData, accessToken);
    setCart(cart);
    setCartItems(cart.productItems);
  };

  const handleQuantityChange = async (id, operation) => {
    const item = cartItems.find((item) => item.productId === id);
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (!item.quantity) return 1;
        return item.productId === id
          ? {
              ...item,
              quantity:
                operation === "increase"
                  ? item.quantity + 1
                  : item.quantity - 1,
            }
          : item;
      })
    );

    const data = {
      operation: operation,
      productId: item.productId,
      useInsurance: item.useInsurance,
      price: item.price,
    };

    await handleUpdateCart(data);
  };

  const handleRemove = async (itemId) => {
    setLoading(true);
    const { accessToken, cartId } = localStorage;
    const cart = await deleteCart(
      {
        itemId,
        cartId: cartId,
      },
      accessToken
    );

    setCartItems(cart.productItems);
    setLoading(false);
    window.location.reload(); //cai nay do tao luoi lam context qua nen tao choi trick lo nhe
  };

  const totalItemsPrice = useMemo(
    () =>
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toLocaleString(),
    [cartItems]
  );

  const handleCheckOut = () => {
    const cartData = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        useInsurance: item.useInsurance,
        productName: item.product.productName,
        discount: 0,
        tax: 0,
        postingCost: item.product.postingCost,
      })),
    };
    navigate("/checkout", { state: { cartItems: cartData.items } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
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
                  <tr key={item.productId} className="border-b">
                    <td className="py-3 flex items-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.productName}
                        className="inline-block w-12 h-12 rounded-lg mr-2"
                      />
                      <span>{item.product.productName}</span>
                    </td>

                    <td className="py-3">
                      {item.price.toLocaleString()} VNĐ
                      {item.useInsurance && (
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex text-xs items-center gap-1 font-normal"
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
                    </td>
                    <td className="py-3">
                      <div className="flex items-center  rounded-lg">
                        <button
                          className="px-3 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.productId, "decrease")
                          }
                          disabled={isNaN(item.quantity) || item.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity || 1}
                          readOnly
                          className="w-12 text-center border-l border-r border-gray-300 text-gray-800"
                        />
                        <button
                          className="px-3 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.productId, "increase")
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3">
                      {(
                        item.price * item.quantity || item.price
                      ).toLocaleString()}{" "}
                      VNĐ
                    </td>
                    <td
                      className="py-3 text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleRemove(item.productId)}
                    >
                      {loading ? (
                        <div
                          className=" animate-spin inline-block w-4 h-4 border-2 rounded-full"
                          style={{
                            borderTopColor: "transparent",
                            borderRightColor: "transparent",
                            borderBottomColor: "transparent",
                            borderLeftColor: "currentColor",
                          }}
                        ></div>
                      ) : (
                        "✖"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="flex justify-start ">
              <Button
                className="mt-2 flex items-center justify-center gap-3 "
                variant="outlined"
                style={{ borderColor: "blue", color: "blue" }}
                // onClick={() => navigate(previousUrl)}
              >
                <ArrowLeft size={20} />
                Quay lại shop
              </Button>
            </div> */}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-10">
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
                    .reduce(
                      (total, item) => total + item.product.postingCost,
                      0
                    )
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
                        total +
                        item.price * item.quantity +
                        item.product.postingCost,
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
          {/* <div className="bg-white rounded-lg shadow-md p-6">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
