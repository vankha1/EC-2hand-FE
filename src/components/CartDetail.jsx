import { Button } from "@material-tailwind/react";
import { ArrowRight } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useState } from "react";
import { deleteCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
const CartItem = ({ product, quantity, price, image, onRemove }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN").format(value);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={product}
          className="h-16 w-16 object-cover rounded-md"
        />
        <div>
          <h3 className="font-medium">{product}</h3>
          <p className="text-sm text-gray-500">
            {quantity} x {formatCurrency(price)} VNĐ
          </p>
        </div>
      </div>
      <button
        className="text-gray-500 text-lg hover:text-red-500"
        onClick={onRemove}
      >
        ×
      </button>
    </div>
  );
};

export default function CartDetail({ products }) {
  console.log("products, ", products);
  const { productItems, _id } = products;
  localStorage.setItem("cartId", _id);
  const navigate = useNavigate();

  const total = useMemo(
    () =>
      productItems?.reduce(
        (acc, item) => acc + item.quantity * parseInt(item.price),
        0
      ),
    [productItems]
  );

  const [items, setItems] = useState(productItems?.slice(0, 3));

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("accessToken");
    const cart = await deleteCart(
      {
        itemId,
        cartId: _id,
      },
      token
    );

    setItems(cart.productItems);
    window.location.reload(); //trick lỏ, nào siêng thì sửa
  };

  const handleViewFullCart = () => {
    navigate("/shoppingcart");
  };

  const handleCheckOut = () => {
    const cartData = {
      items: productItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productName: item.product.productName,
        discount: 0,
        tax: 0,
        postingCost: item.product.postingCost,
      })),
    };
    navigate("/checkout", { state: { cartItems: cartData.items } });
  };

  return (
    <div className="p-4 bg-white rounded-md w-96">
      <h2 className="text-lg font-semibold mb-2">
        Giỏ hàng ({products.productItems?.length})
      </h2>
      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="space-y-4">
        {items?.map((item) => {
          const { product } = item;
          return (
            <CartItem
              key={item.productId}
              product={product?.productName}
              quantity={item.quantity}
              price={item.price}
              image={product.images[0]}
              onRemove={() => handleRemove(item.productId)}
            />
          );
        })}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Tổng tiền:</span>
          <span className="font-semibold">{total?.toLocaleString()} VNĐ</span>
        </div>

        <Button
          className="mt-6 flex items-center justify-center gap-3 bg-[#FA8232]"
          fullWidth
          onClick={handleCheckOut}
        >
          Thanh toán ngay
          <ArrowRight size={17} />
        </Button>

        <Button
          className="mt-2 flex items-center justify-center gap-3 "
          fullWidth
          variant="outlined"
          style={{ borderColor: "#FA8232", color: "#FA8232" }}
          onClick={handleViewFullCart}
        >
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
}
