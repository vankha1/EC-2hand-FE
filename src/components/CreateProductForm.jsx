import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { UploadSimple } from "@phosphor-icons/react";
import { createProduct } from "../services/productService";
import { toast } from "react-toastify";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [images, setImages] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); 
    setFiles((prev) => [...prev, ...selectedFiles])
    const imagePreviews = selectedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  // Remove an image from the preview
  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getTypes = () => {
    const types = JSON.parse(localStorage.getItem("brands"));
    const options = [];
    types.forEach((type) => {
      options.push(type.type);
    });
    return options;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    let payload = new FormData();

    formData.applyProfessionallySelling = formData.applyProfessionallySelling ? "true" : "false";
    formData.applyStandOutSelling = formData.applyStandOutSelling ? "true" : "false";
    
    files.forEach((file) => {
        payload.append("images", file);
    });

    for (let key in formData) { 
      payload.append(key, formData[key]);
    }

    try {
      // for (const pair of payload.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }
  
      await createProduct(payload, token);

      setFiles([]);
      setImages([]);
  
      toast.success("Đã thêm sản phẩm mới thành công!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm mới!");
    }
  };

  return (
    <div className="flex h-ful bg-gray-100 justify-center">
      {/* Main Content */}
      <main className="w-4/5 p-8">
        {/* Product Information */}
        <section className="bg-white  p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-6">
            Thông tin cơ bản về sản phẩm
          </h2>
          <div className="grid grid-cols-8 gap-10">
            {/* Image Upload Section */}
            <div className="col-span-3 ">
              <div className="border rounded-lg p-2 flex flex-col items-center">
                <label htmlFor="files">
                  <UploadSimple size={32} className="text-gray-500 mb-2" />
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2 "
                  id="files"
                  name="files"
                  hidden
                />
              </div>
              <div className="mt-4 overflow-x-auto flex gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 flex-shrink-0 border rounded-md"
                  >
                    <img
                      src={image.preview}
                      alt={`Upload Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Tên sản phẩm"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
              <Input
                label="Hãng"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
              <Select
                label="Thể loại"
                value={formData.type}
                onChange={(value) => {
                  setFormData({ ...formData, type: value });
                }}
              >
                {getTypes().map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
              <Input
                label="Giá bán khuyến nghị (VNĐ)"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Select
                label="Áp dụng bán nổi bật?"
                value={formData.applyStandOutSelling}
                onChange={(value) =>
                  setFormData({ ...formData, applyStandOutSelling: value })
                }
              >
                <Option value={1}>Có</Option>
                <Option value={0}>Không</Option>
              </Select>
              <Select
                label="Áp dụng bán chuyên nghiệp?"
                value={formData.applyProfessionallySelling}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    applyProfessionallySelling: value,
                  })
                }
              >
                <Option value={1}>Có</Option>
                <Option value={0}>Không</Option>
              </Select>

              <Input
                label="Số lượng hiện có"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              <Input
                label="Tình trạng"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-6">Thông tin thêm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Màu"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <Input
              label="Kích thước"
              name="size"
              value={formData.size}
              type="number"
              onChange={handleChange}
            />
            <Input
              label="Khối lượng"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            {/* <Input
              label="Phí ship (VNĐ)"
              name="postingCost"
              value={formData.postingCost}
              onChange={handleChange}
            /> */}
          </div>
        </section>

        {/* Product Description */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Mô tả sản phẩm</h2>
          <Textarea
            label="Mô tả tổng quan về sản phẩm của bạn..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <section className="border-t mt-5">
            <Button className=" mt-5 bg-orange-500" onClick={handleSubmit}>
              Đăng bán
            </Button>
          </section>
        </section>
      </main>
    </div>
  );
};

export default CreateProductForm;
