import { backendURL } from "../utils/constants";
import axios from "axios";

export const placeOrder = async (data, token) => {
  const url = `${backendURL}/orders`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  const url = `${backendURL}/orders`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};
export const getAllOrdersForAdmin = async (token) => {
  const url = `${backendURL}/orders/all`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

export const getOrderById = async (id, token) => {
  const url = `${backendURL}/orders/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

export const updateOrderStatus = async (id, data, token) => {
  const url = `${backendURL}/orders/${id}/state`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status:`, error);
    throw error;
  }
};
