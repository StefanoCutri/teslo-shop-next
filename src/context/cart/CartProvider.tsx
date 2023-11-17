import React, { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces";

export interface CartState {
  cart: ICartProduct[];
}

export const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
};

interface Props {
  children?: React.ReactNode | undefined;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  useEffect(() => {
    try {
      let cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];

      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length === 0) return;

    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addCartToProduct = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, product],
      });

    const sameProductDifferentSizes = state.cart.some(
      (p) => p.size === product.size
    );
    if (!sameProductDifferentSizes)
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((p) => {
      if (p._id != product._id) return p;
      if (p.size != product.size) return p;

      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: "[Cart] - Add Product", payload: updatedProducts });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addCartToProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
