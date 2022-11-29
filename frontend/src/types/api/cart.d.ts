import { PageQueryParam, PageResult } from './base';


export interface Cart {
    cartId: string;
    userId?: string;
    orderItems: CartItem[];
    title?: string;
    payAmount: string;
    totalQuantity: number;
}
interface CartItem {
    cartId: string;
    _id: string;
    productName: string;
    productPhoto: string;
    price: number;
    amount: number
}


export type OrderPageResult = PageResult<Order[]>;