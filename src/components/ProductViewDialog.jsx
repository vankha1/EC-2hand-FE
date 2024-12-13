import {
  Button,
  Card,
  Dialog,
  IconButton,
  Option,
  Select,
  Checkbox,
  Alert,
} from "@material-tailwind/react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCartSimple,
  Star,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { updateCarts } from "../services/cartService";
import { useHeaderUserContext } from "../context/HeaderContext";

export default function ProductViewDialog({ productId, open, handleOpen }) {
  const datatest = [
    {
      productName: "Organic Shampoo",
      brand: "Herbal Essences",
      type: "Beauty",
      applyStandOutSelling: true,
      applyProfessionallySelling: false,
      state: "New",
      price: 1999,
      quantity: 100,
      postingCost: 500,
      soldQuantity: 20,
      color: "Red",
      size: 10.5,
      weight: 500,
      description: "A sulfate-free shampoo for dry and damaged hair",
      isDeleted: false,
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/100",
      ],
    },
  ];
  const [product, setProduct] = useState(datatest[0]);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [ammountItem, setAmmountItem] = useState(1);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const { cart, setCart } = useHeaderUserContext();
  const showAlertMessage = (message, type) => {
    setAlert({ message, type, visible: true });

    // Hide the alert after 5 seconds
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 5000);
  };

  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
        const product = await getProductById(productId);
        setProduct({ ...product, useInsurance: false });
        console.log(product);
      }
    };
    getProduct();
  }, [productId]);

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev < product.images.length - 1 ? prev + 1 : 0
    );
  };

  const HandleDirectBuy = () => {
    window.scrollTo(0, 0);
    navigate("/createorder", {
      state: {
        productData: product,
        previousUrl: window.location.pathname,
        useInsurance: product.useInsurance,
        ammountItem: ammountItem,
      },
    });
  };

  const HandleAddToCart = async () => {
    const cartData = {
      items: [
        {
          productId: product._id,
          quantity: ammountItem,
          price: product.price,
          useInsurance: product.useInsurance,
        },
      ],
    };
    const { accessToken, cartId } = localStorage;
    await updateCarts(cartId, cartData, accessToken).then((respone) => {
      if (respone && respone._id) {
        showAlertMessage("Thêm vào giỏ hàng thành công", "green");
      } else {
        showAlertMessage("Thêm vào giỏ hàng thất bại", "red");
      }
      setCart(respone);
    });
  };
  const RatingStars = ({ value, isInteractive = false }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={index}
              weight="fill"
              className={`h-6 w-6 ${isInteractive ? "cursor-pointer" : ""} ${
                ratingValue <= (isInteractive ? hover || rating : value)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => isInteractive && setHover(ratingValue)}
              onMouseLeave={() => isInteractive && setHover(0)}
              onClick={() => isInteractive && setRating(ratingValue)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} handler={handleOpen} size="xl">
      {/* Alert */}
      {alert.visible && (
        <div className="fixed top-4 right-4">
          <Alert
            color={alert.type}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            }
          >
            {alert.message}{" "}
          </Alert>
        </div>
      )}
      <div className="p-6 grid grid-cols-2 gap-20 items-center justify-center">
        {/* Image Slider */}
        <div>
          <Card className="relative h-auto w-auto shadow-none justify-center items-center">
            <img
              src={product?.images[selectedImage]}
              alt="Product"
              className="object-cover w-[500px] h-[400px] rounded-lg"
            />
          </Card>

          <div className="flex justify-center mt-4 space-x-2 items-center">
            <IconButton
              variant="text"
              onClick={handlePrevImage}
              className="relative transform  bg-orange text-white rounded-full "
            >
              <ArrowLeft className="w-5 h-5" />
            </IconButton>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-lg cursor-pointer border ${
                  selectedImage === index ? "border-orange" : "border-gray-300"
                }`}
              />
            ))}
            <IconButton
              variant="text"
              onClick={handleNextImage}
              className="relative-right-10 transform  bg-orange text-white rounded-full"
            >
              <ArrowRight className="w-5 h-5" />
            </IconButton>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w px-6 bg-white rounded-lg ">
          {/* Rating */}
          <div className="">
            <div className="flex items-center gap-4">
              <RatingStars value={product.avgStar} />
            </div>
          </div>

          <h1 className="text-2xl font-semibold">{product.productName}</h1>
          {/* Details */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              <strong>Hãng:</strong> {product.brand}
            </p>
            <p>
              <strong>Tình trạng:</strong>{" "}
              <span className="text-green-500">Gần như mới (70~80%)</span>
            </p>
            <p>
              <strong>Số lượng:</strong>{" "}
              <span className="text-green-500">
                {" "}
                {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}{" "}
              </span>
            </p>
            <p>
              <strong>Thể loại:</strong> {product.type}
            </p>
            <p>
              <strong>Nhà cung cấp:</strong> VNU2Hand
            </p>
          </div>
          {/* Price */}
          <div className="mt-6 flex items-center space-x-4">
            <span className="text-2xl font-bold text-blue-600">
              {product?.price?.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <Checkbox
              value={product.useInsurance}
              onChange={() =>
                setProduct({ ...product, useInsurance: !product.useInsurance })
              }
              label="Sử dụng bảo hiểm"
              ripple={true}
            />
          </div>

          <div className=" mt-5 bg-white rounded-lg ">
            {/* Quantity and Actions */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() =>
                    setAmmountItem(ammountItem - 1 > 0 ? ammountItem - 1 : 1)
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  value={ammountItem}
                  readOnly
                  className="w-12 text-center border-l border-r border-gray-300 text-gray-800"
                />
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setAmmountItem(ammountItem + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="px-6 py-2 text-sm flex gap-2 items-center bg-orange text-white  font-semibold hover:bg-orange-600"
                onClick={HandleAddToCart}
              >
                THÊM VÀO GIỎ HÀNG
                {/* <ShoppingCartSimple size={10} /> */}
              </button>

              {/* Buy Now Button */}
              <button
                className="px-6 py-2 border text-xs border-orange text-orange  font-semibold hover:bg-orange-100"
                onClick={HandleDirectBuy}
              >
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
