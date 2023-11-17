import { createContext } from "react";
import { ICartProduct } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];

  // Methods
  addCartToProduct: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;

}

export const CartContext = createContext({} as ContextProps);
