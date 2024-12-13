import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { getAllBrand } from "../services/productService";
import { useNavigate } from "react-router-dom";
const FlyoutMenu = () => {
  const [megaMenuData, setMegaMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentBrands, setCurrentBrands] = useState([]);
  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const response = await getAllBrand();
        setMegaMenuData(response);
        if (response.length > 0) {
          setActiveCategory(response[0].type);
          setCurrentBrands(response[0].brand);
          localStorage.setItem("brands", JSON.stringify(response));
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    getAllBrands();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category, brands) => {
    setActiveCategory(category);
    setCurrentBrands(brands);
  };
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        className="flex flex-row space-x-2 justify-between items-center px-4 py-2 text-black bg-gray-200 rounded hover:bg-[#FA8232] hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Thể loại</span>
        <CaretDown />
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div className="absolute left z-10 top-full mt-2 w-screen max-w-max bg-white shadow-lg border">
          <div className="container mx-auto p-6 grid grid-cols-2 gap-6 w-screen max-w-2xl">
            {/* Left Section */}
            <div className="col-span-1">
              {megaMenuData.map((item) => (
                <div
                  key={item.type}
                  className={`p-4 cursor-pointer ${
                    activeCategory === item.type ? "bg-gray-200 font-bold" : ""
                  }`}
                  onClick={() => handleCategoryClick(item.type, item.brand)}
                >
                  {item.type}
                </div>
              ))}
            </div>

            {/* Middle Section */}
            <div className="col-span-1">
              <p className="p-4 font-semibold">Thương hiệu</p>
              <ul>
                <li
                  className="p-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/ShopPage", {
                      state: {
                        brand: "Tất cả",
                      },
                    });
                    setIsOpen(!isOpen);
                  }}
                >
                  {" "}
                  Tất cả
                </li>
                {currentBrands.map((brand) => (
                  <li
                    key={brand}
                    className="p-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate(`/ShopPage/${brand}`);
                      window.location.reload();
                      setIsOpen(!isOpen);
                    }}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            {/* <div className="col-span-1">
              <h3 className="p-4 font-semibold">Category Image</h3>
              {megaMenuData
                .filter((item) => item.type === activeCategory)
                .map((item) => (
                  <div key={item.type} className="p-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.type}
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-500 italic">
                        No image available for {item.type}.
                      </div>
                    )}
                  </div>
                ))}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenu;
