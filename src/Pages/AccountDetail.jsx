import React, { useState, useEffect } from "react";
import { X, PencilSimple, Check, User } from "@phosphor-icons/react";

const AccountDetail = () => {
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      setUserInfo({
        name: user.fullname,
        email: user.email,
      });
    };
    fetchData();
  }, []);

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleCancel = (field) => {
    setEditing({ ...editing, [field]: false });
  };

  const handleSave = (field) => {
    if (!userInfo[field]) {
      setMessage({ type: "error", text: "Trường không được để trống!" });
      return;
    }
    setEditing({ ...editing, [field]: false });
    setMessage({ type: "success", text: "Thay đổi  thông tin thành công!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!password.current || !password.new || !password.confirm) {
      setMessage({
        type: "error",
        text: "Tất cả trường mật khẩu đều phải nhập!",
      });
      return;
    }
    if (password.new !== password.confirm) {
      setMessage({ type: "error", text: "Mật khẩu không trùng nhau!" });
      return;
    }
    setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
    setPassword({ current: "", new: "", confirm: "" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold ml-4">Thông tin tài khoản</h1>
          </div>

          {message.text && (
            <div
              className={`p-4 mb-4 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {Object.entries(userInfo).map(([field, value]) => (
              <div key={field} className="flex items-center justify-between">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field === "name"
                      ? "Họ và tên"
                      : field === "email"
                      ? "Email"
                      : field === "phone"
                      ? "Số điện thoại"
                      : "Địa chỉ"}
                  </label>
                </div>
                <div className="w-2/3 flex items-center space-x-2">
                  {editing[field] ? (
                    <>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, [field]: e.target.value })
                        }
                        className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSave(field)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleCancel(field)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1">{value}</span>
                      <button
                        onClick={() => handleEdit(field)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      >
                        <PencilSimple className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Thay đổi mật khẩu</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
