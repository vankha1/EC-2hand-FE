import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../services/productService";

export default function UpdateProductDialog({ productId, open, handleOpen, refreshTable }) {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    type: "",
    price: 0,
    applyStandOutSelling: 0,
    applyProfessionallySelling: 0,
    quantity: 0,
    state: "",
    color: "",
    size: 1,
    weight: 0,
    description: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return;

      try {
        const product = await getProductById(productId);
        console.log(product);

        setFormData({...formData, ...product});
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getTypes = () => {
    const types = JSON.parse(localStorage.getItem("brands") || "[]");
    return types.map((type) => type.type);
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await updateProduct(productId, formData, accessToken);
    handleOpen();
    refreshTable();
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="lg"
      className="h-[600px] overflow-auto"
    >
      <DialogBody>
        <div className="flex justify-center">
          <main className="w-4/5 p-8">
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-6">
                Thông tin cơ bản về sản phẩm
              </h2>
              <div className="grid grid-cols-8 gap-10">
                <div className="col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
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
                    type="number"
                    onChange={handleChange}
                  />
                  <Select
                    label="Áp dụng bán nổi bật?"
                    value={formData.applyStandOutSelling}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        applyStandOutSelling: value,
                      }))
                    }
                  >
                    <Option value={1}>Có</Option>
                    <Option value={0}>Không</Option>
                  </Select>
                  <Select
                    label="Áp dụng bán chuyên nghiệp?"
                    value={formData.applyProfessionallySelling}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        applyProfessionallySelling: value,
                      }))
                    }
                  >
                    <Option value={1}>Có</Option>
                    <Option value={0}>Không</Option>
                  </Select>
                  <Input
                    label="Số lượng hiện có"
                    name="quantity"
                    value={formData.quantity}
                    type="number"
                    onChange={handleChange}
                  />
                  <Input
                    label="Tình trạng"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
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
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-6">Mô tả sản phẩm</h2>
              <Textarea
                label="Mô tả tổng quan về sản phẩm của bạn..."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </section>
          </main>
        </div>
      </DialogBody>
      <DialogFooter className="gap-5">
        <Button color="yellow" ripple="light" onClick={handleOpen}>
          Hủy
        </Button>
        <Button color="orange" ripple="light" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
