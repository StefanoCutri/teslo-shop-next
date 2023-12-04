import React, { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
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

  useEffect(() => {
    // let numberOfItems = 0;
    // let subTotal = 0;
    // const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    // state.cart.forEach((product) => {
    //   numberOfItems += product.quantity;
    //   subTotal += product.price * product.quantity;
    // });

    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: "[Cart] - Update Cart Summary", payload: orderSummary });
  }, [state.cart]);

  const addCartToProduct = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);

    if (!productInCart) {
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, product],
      });
    }

    const sameProductDifferentSizes = state.cart.some(
      (p) => p.size === product.size
    );

    if (!sameProductDifferentSizes) {
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id != product._id) return p;
      if (p.size != product.size) return p;

      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: "[Cart] - Add Product", payload: updatedProducts });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Update Cart Quantity", payload: product });
  };

  const removeProductFromCart = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Remove Product From Cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addCartToProduct,
        updateCartQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
