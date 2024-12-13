import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { searchProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const query = { page: 1, limit: 10, search, sort: { price: -1 } };
      const response = await searchProducts(query);
      window.location.reload();
      console.log(response);
      navigate("/search", { state: { products: response.products } });
    } catch (error) {
      console.log(error);
    }
  };
  // query: { page, limit, search, sort }
  return (
    <div className="flex-grow mx-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm mặt hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full py-2 pl-4 pr-10 text-black  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:cursor-pointer"
          onClick={handleSearch}
        >
          <MagnifyingGlass size={21} />
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
