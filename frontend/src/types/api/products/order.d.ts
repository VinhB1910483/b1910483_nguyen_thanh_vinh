import { PageQueryParam, PageResult } from '../base';


export interface Order {
    cartId: string;
    totalAmount: string;
    title: string;
    payAmount: string;
    payType: number;
    status: string;
    totalQuantity: number;
    createTime: Date;
    beginTime: string;
    endTime: string;
    userId: string;
    orderItems: OrderItem[];
}
interface OrderItem {
    cartId: string;
    _id: string;
    productName: string;
    productPhoto: string;
    price: number;
    amount: number
}


export type OrderPageResult = PageResult<Order[]>;