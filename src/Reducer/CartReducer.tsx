import type { CartState, CartAction } from "../types/cart.types";

export const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: action.payload.id,
            title: action.payload.title,
            price: action.payload.price,
            quantity: 1,
          },
        ],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
  }
}; 
