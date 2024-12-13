import React, { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import {
  Card,
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Checkbox,
  Alert,
} from "@material-tailwind/react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCartSimple,
  Medal,
  Truck,
  Handshake,
  Headphones,
  CreditCard,
  Star,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { createCart, updateCarts } from "../services/cartService";
import { useHeaderUserContext } from "../context/HeaderContext";
import { toast } from "react-toastify";
import ProductRating from "../components/ProductRating";
import { getProductReviews } from "../services/reviewService";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useHeaderUserContext();
  const [productData, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("description");
  const [ammountItem, setAmmountItem] = React.useState(1);
  const [useInsurance, setUseInsurance] = React.useState(false);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getProductInfo = async () => {
      const url = window.location.href;
      const productId = url.split("/").pop();
      try {
        const response = await getProductById(productId);
        setProductData(response);
        const response2 = await getProductReviews(productId);
        setReviews(response2);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProductInfo();
  }, []);

  const HandleDirectBuy = () => {
    window.scrollTo(0, 0);
    navigate("/createorder", {
      state: {
        productData,
        previousUrl: window.location.pathname,
        useInsurance: useInsurance,
        ammountItem: ammountItem,
      },
    });
  };
  const HandleAddToCart = async () => {
    const cartData = {
      items: [
        {
          productId: productData._id,
          quantity: ammountItem,
          price: productData.price,
          useInsurance: useInsurance,
        },
      ],
    };
    const { accessToken, cartId } = localStorage;
    await updateCarts(cartId, cartData, accessToken).then((respone) => {
      if (respone && respone._id) {
        toast.success("Thêm vào giỏ hàng thành công");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại");
      }
      setCart(respone);
    });
  };

  const tabData = [
    {
      label: "Mô tả",
      value: "description",
      content: (
        <div className="h-[250px] grid grid-cols-4">
          <div className="col-span-2">
            <h1 className="text-lg font-semibold">Mô tả</h1>
            <p className="text-gray-500 text-base">
              Vợt cầu lông đen Thunder Axforce 10 được thừa hưởng thiết kế nổi
              trội với vật liệu cấu tạo từ Super Carbon siêu cao của đàn anh
              Aaxforce 20 - Axforce 50 thuộc phân khúc tầm trung có điểm cân
              bằng ở mức 295 +-3mm, thiết kế cho lối chơi công thủ toàn diện,
              hơi thiên công giúp người chơi có những cú đập có thêm độ cắm và
              uy lực. Đũa vợt cứng ở mức trung bình, không quá khó để người chơi
              có thể làm quen và kiểm soát.
            </p>
          </div>
          <div className="col-span-1 ">
            <h1 className="text-lg font-semibold">Dịch vụ</h1>
            <p className="text-gray-500 text-base flex gap-2">
              <Medal size={24} color="orange" />
              Đảm bảo 1 năm được hoàn tiền
            </p>
            <p className="text-gray-500 text-base flex gap-2">
              <Truck size={24} color="orange" />
              Freeship nội thành
            </p>
            <p className="text-gray-500 text-base flex gap-2">
              <Handshake size={24} color="orange" />
              Tiền được hoàn trả 100%
            </p>
            <p className="text-gray-500 text-base flex gap-2">
              <Headphones size={24} color="orange" />
              24/7 liên lạc, hỗ trợ nếu có vấn đề
            </p>
            <p className="text-gray-500 text-base flex gap-2">
              <CreditCard size={24} color="orange" />
              Thanh toán an toàn
            </p>
          </div>
          <div className="col-span-1">
            <h1 className="text-lg font-semibold">Thông tin ship</h1>
            <p className="text-base">
              {" "}
              <strong className="text-base font-bold">Nội thành:</strong> 2-4
              ngày
            </p>
            <p className="text-base">
              {" "}
              <strong className="text-base font-bold">Ngoại thành:</strong> Tối
              đa 7 ngày
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Thông tin thêm",
      value: "additionalInfo",
      content: "",
    },
    {
      label: "Chi tiết",
      value: "details",
      content: "",
    },
    {
      label: "Đánh giá",
      value: "reviews",
      content: <ProductRating reviews={reviews} />,
    },
  ];

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : productData.images.length - 1
    );
  };
  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev < productData.images.length - 1 ? prev + 1 : 0
    );
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
    <div className="flex flex-col items-center justify-center">
      <div className="w-5/6 p-6 grid grid-cols-2 gap-20 items-center justify-center">
        {/* Image Slider */}
        <div>
          <Card className="relative h-auto w-auto shadow-none justify-center items-center">
            <img
              src={productData.images ? productData.images[selectedImage] : ""}
              alt="Product"
              className="object-cover w-[500px] h-[500px] rounded-lg"
            />
          </Card>

          <div className="flex justify-center space-x-2 items-center">
            <IconButton
              variant="text"
              onClick={handlePrevImage}
              className="relative transform  bg-orange text-white rounded-full "
            >
              <ArrowLeft className="w-5 h-5" />
            </IconButton>
            {productData.images?.map((img, index) => (
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

        <div className="max-w px-6 pb-6 bg-white rounded-lg ">
          {/* Rating */}
          <div className="">
            <div className="flex items-center gap-4">
              <RatingStars value={productData.avgStar} />
            </div>
          </div>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            {productData.productName}
          </h2>

          {/* Details */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              <strong>Hãng:</strong> {productData.brand}
            </p>
            <p>
              <strong>Tình trạng:</strong>{" "}
              <span className="text-green-500">Gần như mới (70~80%)</span>
            </p>
            <p>
              <strong>Số lượng:</strong>{" "}
              <span className="text-green-500">
                {" "}
                {productData.quantity > 0 ? "Còn hàng" : "Hết hàng"}{" "}
              </span>
            </p>
            <p>
              <strong>Thể loại:</strong> {productData.type}
            </p>
            <p>
              <strong>Nhà cung cấp:</strong> VNU2Hand
            </p>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center space-x-4">
            <span className="text-2xl font-bold text-blue-600">
              {productData?.price?.toLocaleString()} VNĐ
            </span>
            {/* <span className="text-gray-400 line-through">40,000,000 VNĐ</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-sm rounded-lg">
              GIẢM 12.5%
            </span> */}
          </div>
          <div className="mt-2 flex items-center">
            <Checkbox
              value={useInsurance}
              onChange={() => setUseInsurance(!useInsurance)}
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
                className="px-6 py-2 flex gap-2 items-center bg-orange text-white  font-semibold hover:bg-orange-600"
                onClick={HandleAddToCart}
              >
                THÊM VÀO GIỎ HÀNG
                <ShoppingCartSimple size={16} />
              </button>

              {/* Buy Now Button */}
              <button
                className="px-6 py-2 border border-orange text-orange  font-semibold hover:bg-orange-100"
                onClick={HandleDirectBuy}
              >
                MUA NGAY
              </button>
            </div>

            {/* Wishlist and Copy Link */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span className="flex items-center space-x-2 cursor-pointer hover:text-gray-800">
                ❤️ Yêu thích
              </span>
              <span className="flex items-center space-x-2 cursor-pointer hover:text-gray-800">
                📋 Copy đường link
              </span>
            </div>

            {/* Payment Methods */}
            <div className="border-t pt-4">
              <p className="text-gray-700 mb-2">100% Thanh toán an toàn</p>
              <div className="flex space-x-2">
                <img
                  src="https://via.placeholder.com/40x20?text=PayPal"
                  alt="PayPal"
                  className="h-6"
                />
                <img
                  src="https://via.placeholder.com/40x20?text=Mastercard"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://via.placeholder.com/40x20?text=Amex"
                  alt="Amex"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 items-center">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {tabData.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabData.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};
export default ProductDetail;
