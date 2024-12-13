import { CheckCircle } from "@phosphor-icons/react";

const Success = () => {
    return (
        <div className="min-h-screen bg-[#1B6392] flex flex-col items-center justify-center text-white">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Thanh toán thành công!</h1>
            <p className="text-lg">
              Cảm ơn bạn đã mua hàng tại{" "}
              <span className="font-bold text-yellow-400">VNU2Hand</span>!
            </p>
          </div>
    
          {/* Success Icon */}
          <div className="mt-8">
            <div className="bg-white rounded-full p-6 shadow-lg flex items-center justify-center">
              <CheckCircle size={64} color="#1B6392" weight="fill" />
            </div>
          </div>
    
          {/* Navigation Buttons */}
          <div className="mt-10">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white text-[#1B6392] font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Quay lại trang chủ
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-white text-[#1B6392] font-semibold py-2 px-6 ml-4 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Theo dõi đơn hàng
            </button>
          </div>
        </div>
      );
  };
  export default Success;
  