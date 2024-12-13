import axios from "axios";
import { backendURL } from "../utils/constants";

export const register = async (data) => {
  const url = `${backendURL}/auth/register`;
  return await axios.post(url, data);
};
export const login = async (data) => {
  const url = `${backendURL}/auth/login`;
  return await axios.post(url, data);
};

export const getUserMe = async () => {
  const accessToken = localStorage.getItem("accessToken");

  return await axios.get(`${backendURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getAllUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");

  return await axios.get(`${backendURL}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
