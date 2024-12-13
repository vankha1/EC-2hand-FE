import React from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="shadow-md hover:scale-105"
      onClick={() => navigate(`/productdetail/${product._id}`)}
    >
      <img
        src={product.images?.[0]}
        alt={product.productName}
        className="h-40 w-full object-cover rounded-t-md"
      />
      <CardBody>
        <Typography variant="h6" className="font-semibold">
          {product.productName}
        </Typography>
        <Typography className="text-gray-600">
          {product?.price?.toLocaleString()} VNĐ
        </Typography>
        <div className="flex justify-between items-center mt-4">
          <Typography variant="small" className="text-yellow-500">
            {"⭐".repeat(product.rating)}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
