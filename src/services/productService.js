import { backendURL } from "../utils/constants";
import axios from "axios";

export const createProduct = async (data, token) => {
  const url = `${backendURL}/products`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error response:", error.response.data);
    } else {
      console.error("Request error:", error.message);
    }
    throw error;
  }
};

// Used for search
// query: { page, limit, search, sort }
export const searchProducts = async (query) => {
  const { page, limit, search, sort } = query;
  const url = `${backendURL}/products/search?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Used for get all products and filter products

/*
data : {
    "page": 1,
    "limit": 10,
    "sort": { "price": -1 },
    "matches": {
        "productName": "Hydrating Face Cream"
    }
}
*/
export const getProducts = async (data) => {
  const url = `${backendURL}/products/products`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (id, data, token) => {
  const url = `${backendURL}/products/${id}`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  const url = `${backendURL}/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  const url = `${backendURL}/products/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

export const getAllBrand = async () => {
  const url = `${backendURL}/products/getallbrand`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching all brand`, error);
    throw error;
  }
};
