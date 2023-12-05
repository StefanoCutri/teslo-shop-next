import { createContext } from "react";
import { ICartProduct } from "@/interfaces";
import { ShippingAdress } from ".";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAdress

  // Methods
  addCartToProduct: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProductFromCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
