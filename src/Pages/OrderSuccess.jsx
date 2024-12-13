import { CheckCircle, Stack, ArrowRight } from "@phosphor-icons/react";

const OrderSuccess = () => {
  return (
    <div className="min-h-[550px]  flex flex-col items-center justify-center ">
      {/* Header */}
      {/* OrderSuccess Icon */}
      <div className="">
        <div className="bg-green-500 rounded-full p-6 shadow-lg border- flex items-center justify-center">
          <CheckCircle size={64} color="white" />
        </div>
      </div>
      <div className="text-center mt-5">
        <h1 className="text-4xl font-bold mb-4">Bạn đã đặt hàng thành công!</h1>
        <p className="text-lg">
          Đơn hàng của bạn sẽ được xác minh trước khi người bán chuẩn bị
          <br />
          sản phẩm. Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!
        </p>
      </div>

      <div className="mt-10 flex flex-row gap-5">
        <button
          className="px-6 py-2 flex gap-2 items-center bg-orange text-white  font-semibold hover:bg-orange-600"
          onClick={() => (window.location.href = "/")}
        >
          <Stack size={20} />
          Quay về trang chủ
        </button>

        <button
          className="px-6 py-2 flex items-center gap-2 border border-orange text-orange  font-semibold hover:bg-orange-100"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Theo dõi đơn hàng
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
export default OrderSuccess;
