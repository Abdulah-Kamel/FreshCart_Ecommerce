import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Cartcontext = createContext();

export default function CartcontextProvider({ children }) {
  const [cartCount, setCartCount] = useState(null);
  const [cartId, setCartId] = useState("");
  const baseUrl = "https://ecommerce.routemisr.com";
  const userToken = localStorage.getItem("userToken");
  const headers = {
    Token: userToken,
  };
  const getProducts = async (page) => {
    const { data } = await axios.get(
      `${baseUrl}/api/v1/products?page=${page ? page : 1}`
    );
    return data;
  };
  const getSpecificProduct = async (id) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`);
    return data;
  };
  const getCategories = async () => {
    const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
    return data;
  };
  const getspecificCategorie = async (id) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/categories/${id}`);
    return data;
  };
  const addToCart = async (id) => {
    const data = await axios.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      { headers }
    );
    setCartCount(data.data.numOfCartItems);

    return data;
  };
  const getCart = async () => {
    const data = await axios.get(`${baseUrl}/api/v1/cart`, { headers });
    return data;
  };
  const updateCart = async (id, count) => {
    const data = await axios.put(
      `${baseUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      { headers }
    );
    return data;
  };
  const delteCartItem = async (id) => {
    const data = await axios.delete(`${baseUrl}/api/v1/cart/${id}`, {
      headers,
    });
    setCartCount(data.data.numOfCartItems);
    return data;
  };
  const clearCart = async () => {
    const data = await axios.delete(`${baseUrl}/api/v1/cart`, { headers });
    setCartCount(data.data.numOfCartItems);
    return data;
  };
  const getCartCount = async () => {
    const data = await getCart();
    setCartCount(data.data.numOfCartItems);
    setCartId(data.data.data._id);
  };
  const checkOut = async (ShipingDetails) => {
    const data = await axios.post(
      `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { ShipingDetails },
      { headers }
    );
    return data;
  };

  const getAllOrders = async (page) => {
    const data = await axios.get(
      `${baseUrl}/api/v1/orders?page=${page ? page : 1}`,
      { headers }
    );
    return data;
  };
  useEffect(() => {
    getCartCount();
  }, [cartCount]);
  return (
    <Cartcontext.Provider
      value={{
        getProducts,
        getCategories,
        getSpecificProduct,
        getspecificCategorie,
        addToCart,
        getCart,
        updateCart,
        delteCartItem,
        cartCount,
        clearCart,
        checkOut,
        cartId,
        getAllOrders,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
