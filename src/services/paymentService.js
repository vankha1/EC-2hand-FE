import axios from "axios";
import { backendURL } from "../utils/constants";

export const createQRCodePayment = async (id) => {
    const url = `${backendURL}/payment/${id}`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
}


export const verifyPayment = async () => {
    const url = `${backendURL}/payment/webhook`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Error verifying payment:", error);
        throw error;
    }
}