import React, { FC, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAdress;
}

export interface ShippingAdress {
  firstName: string;
  secondName: string;
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
}
export const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};
interface Props {
  children?: React.ReactNode | undefined;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      let cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
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
    Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (Cookies.get("firstName")) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        secondName: Cookies.get("secondName") || "",
        address1: Cookies.get("address1") || "",
        address2: Cookies.get("address2") || "",
        zipCode: Cookies.get("zipCode") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({
        type: "[Cart] - Load Address from cookies",
        payload: shippingAddress,
      });
    }
  }, []);

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

  const updateAddress = (address: ShippingAdress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("secondName", address.secondName);
    Cookies.set("address1", address.address1);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zipCode", address.zipCode);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);
    dispatch({ type: "[Cart] - Update Address", payload: address });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addCartToProduct,
        updateCartQuantity,
        removeProductFromCart,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
