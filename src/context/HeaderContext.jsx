import React, { createContext, useContext, useState } from "react";

const HeaderUserContext = createContext();

export const HeaderUserProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
      setCart((prevCart) => {
      const products = prevCart.productItems
      const existingProduct = products.find((item) => item.productId === product.productId);

      if (existingProduct) {
        return products.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...products, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.productItems.filter((item) => item.productId !== productId));
  };

  return (
    <HeaderUserContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </HeaderUserContext.Provider>
  );
};

export const useHeaderUserContext = () => {
  return useContext(HeaderUserContext);
};