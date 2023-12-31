import { ICartProduct } from "@/interfaces";
import { CartState, ShippingAdress } from "./";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Add Product"; payload: ICartProduct[] }
  | { type: "[Cart] - Update Cart Quantity"; payload: ICartProduct }
  | { type: "[Cart] - Remove Product From Cart"; payload: ICartProduct }
  | { type: "[Cart] - Update Cart Summary"; payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {type: "[Cart] - Load Address from cookies", payload: ShippingAdress }
  | {type: "[Cart] - Update Address", payload: ShippingAdress }


export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Add Product":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Update Cart Quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case "[Cart] - Remove Product From Cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

      case '[Cart] - Update Cart Summary':
        
        return {
          ...state,
          ...action.payload
        }

      case '[Cart] - Update Address':
      case '[Cart] - Load Address from cookies':
        return {
          ...state,
          shippingAddress: action.payload
        }
    default:
      return state;
  }
};
