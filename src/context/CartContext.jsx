import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      // Increase quanntity if item already exists
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success(`${product.title} quantity updated`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // Add new item to cart
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success(`${product.title} added to cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newQuantity = item.quantity;
            if (action === "increase") {
              newQuantity = newQuantity + 1;
              toast.info(`${item.title} quantity increased`, {
                position: "top-right",
                autoClose: 2000,
              });
            } else if (action === "decrease") {
              newQuantity = newQuantity - 1;
              toast.info(`${item.title} quantity decreased`, {
                position: "top-right",
                autoClose: 2000,
              });
            }
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    ); // Remove any null items
  };

  const removeFromCart = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.error("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
