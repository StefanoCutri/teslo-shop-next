import React, { FC, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children?: React.ReactNode | undefined;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addCartToProduct = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) return dispatch({ type: "[Cart] - Add Product", payload: [...state.cart, product] });

    const sameProductDifferentSizes = state.cart.some((p) => p.size === product.size);
    if(!sameProductDifferentSizes) return dispatch({ type: "[Cart] - Add Product", payload: [...state.cart, product] });

    const updatedProducts = state.cart.map(p => {
      if (p._id != product._id) return p;
      if (p.size != product.size) return p;

      p.quantity += product.quantity;
      return p
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
