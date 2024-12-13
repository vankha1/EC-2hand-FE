import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
export default function ShowSearchProducts() {
  const location = useLocation();
  const [products, setProducts] = React.useState(location.state?.products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
