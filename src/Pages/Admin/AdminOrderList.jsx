import React, { useEffect, useState } from "react";
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { getAllOrdersForAdmin } from "../../services/orderService";

const AdminOrderList = ({ setActiveSecondary }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await getAllOrdersForAdmin(token);
        const orders = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const renderPagination = (data) => (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretLeft />
      </button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages(data)}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages(data)))
        }
        disabled={currentPage === totalPages(data)}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretRight />
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID ĐƠN HÀNG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TRẠNG THÁI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NGÀY ĐẶT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TỔNG TIỀN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getPaginatedData(orders).map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {item._id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.paymentState
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.paymentState ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.totalPrice.toLocaleString()} VNĐ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-5">
                  <button
                    className="px-6 py-2 text-sm rounded-lg flex gap-2 items-center  text-blue-300  font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 hover:text-orange"
                    onClick={() =>
                      setActiveSecondary({
                        type: "orderDetail",
                        data: item._id,
                      })
                    }
                  >
                    Xem chi tiết
                    <ArrowRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination(orders)}
      </div>
    </div>
  );
};
export default AdminOrderList;
