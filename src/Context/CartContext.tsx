import { createContext, useReducer} from 'react'
import type { ReactNode,Dispatch } from 'react';
import { cartReducer, initialState } from '../Reducer/CartReducer'
import type { CartState, CartAction } from "../types/cart.types";

interface CartContextType {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType>({
  cart: initialState,
  dispatch: () => null,
});


export const CartProvider = ({children}:{children: ReactNode}) => {
    const [cart,dispatch] = useReducer(cartReducer,initialState);

    return (

        <CartContext.Provider value={{cart,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

