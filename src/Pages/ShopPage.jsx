import { ArrowRight } from "@phosphor-icons/react";
import { Checkbox, Radio, Breadcrumbs, Slider } from "@material-tailwind/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import CustomRangeSlider from "../components/CustomRangeSlider";
import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbsShopPage = () => {
  const location = useLocation();

  const { brand } = location.state || {};

  return (
    <Breadcrumbs className="bg-white ml-36">
      <a href="#" className="opacity-60 flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Trang chủ
      </a>
      <a href="#" className="opacity-60">
        <span>Thể loại</span>
      </a>
      <a href="#" style={{ color: "#2DA5F3" }}>
        {brand}
      </a>
    </Breadcrumbs>
  );
};
const Sidebar = ({ setProducts }) => {
  const location = useLocation();
  const types = JSON.parse(localStorage.getItem("brands"));
  const categoriesData = [];
  const [category, setCategory] = useState(location.state?.type);
  types.forEach((type) => {
    categoriesData.push(type.type);
  });
  useEffect(() => {
    const refilterPage = async () => {
      try {
        const data = {
          page: 1,
          limit: 10,
          sort: { price: -1 },
          matches: {
            type: category,
          },
        };
        const response = await getProducts(data);
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    refilterPage();
  }, [category]);

  return (
    <aside className="w-1/4 bg-white pl-16 rounded-md ">
      {/* Category Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-4">Thể loại</h3>
        <div className="flex flex-col space-y-1">
          {categoriesData.map((category, index) => (
            <Radio
              key={index}
              name="category"
              value={category}
              label={category}
              defaultChecked={category === location.state?.type}
              onChange={(e) => setCategory(e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      {/* <CustomRangeSlider /> */}
    </aside>
  );
};
const SidebarBrand = ({ brand, setProducts }) => {
  const navigate = useNavigate();
  const types = JSON.parse(localStorage.getItem("brands"));
  const categoriesData = [];
  const [category, setCategory] = useState(
    types.find((item) => item.brand.includes(brand))?.type
  );
  types.forEach((type) => {
    categoriesData.push(type.type);
  });

  useEffect(() => {}, [category]);

  return (
    <aside className="w-1/4 bg-white pl-16 rounded-md ">
      {/* Category Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-4">Thể loại</h3>
        <div className="flex flex-col space-y-1">
          {categoriesData.map((category, index) => (
            <Radio
              key={index}
              name="category"
              value={category}
              label={category}
              defaultChecked={
                category ===
                types.find((item) => item.brand.includes(brand))?.type
              }
              onChange={(e) => {
                setCategory(e.target.value);
                navigate("/ShopPage", { state: { type: category } });
                window.location.reload();
              }}
            />
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      {/* <CustomRangeSlider /> */}
    </aside>
  );
};

const ProductGrid = ({ products, setProducts }) => {
  const location = useLocation();
  useEffect(() => {
    const getProductsByPage = async () => {
      if (location.state?.type) {
        try {
          const type = location.state?.type;
          const data = {
            page: 1,
            limit: 10,
            sort: { price: -1 },
            matches: {
              type: type,
            },
          };
          const response = await getProducts(data);
          setProducts(response.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    getProductsByPage();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
const ProductGridForBrand = ({ products, setProducts, brand }) => {
  useEffect(() => {
    const getProductsByPage = async () => {
      if (brand !== "") {
        try {
          const data = {
            page: 1,
            limit: 10,
            sort: { price: -1 },
            matches: {
              brand: brand,
            },
          };
          const response = await getProducts(data);
          setProducts(response.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    getProductsByPage();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  useEffect(() => {
    const getProductInfo = async () => {
      const url = window.location.href;
      const brand = url.split("/").pop();
      if (brand !== "ShopPage") {
        setBrand(brand);
      } else {
        setBrand("");
      }
    };
    getProductInfo();
  }, [window.location.href]);
  return (
    <>
      <BreadcrumbsShopPage />
      <div className="font-sans bg-white min-h-screen flex  flex-col items-center ">
        <div className="container mx-auto flex py-6">
          {
            // Sidebar
            brand ? (
              <SidebarBrand brand={brand} setProducts={setProducts} />
            ) : (
              <Sidebar setProducts={setProducts} />
            )
          }
          <div className="flex-1">
            {
              // Product Grid
              brand ? (
                <ProductGridForBrand
                  products={products}
                  setProducts={setProducts}
                  brand={brand}
                />
              ) : (
                <ProductGrid products={products} setProducts={setProducts} />
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
