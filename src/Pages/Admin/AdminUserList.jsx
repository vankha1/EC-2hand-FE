import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/authService";

const AdminUserList = () => {
  const [usersData, setUsersData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setUsersData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ và tên
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MSSV
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày sinh
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Địa chỉ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>{" "}
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.studentCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUserList;
