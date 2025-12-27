export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image?:string
}

export interface CartState {
    cartItems: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "INCREASE_QTY"; payload: { id: number } }
  | { type: "DECREASE_QTY"; payload: { id: number } };