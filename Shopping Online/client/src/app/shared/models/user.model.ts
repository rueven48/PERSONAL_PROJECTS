
import { Order } from './order.model';


export interface User {
    _id?: string;
    userId?: string;
    userName?: string;
    userPassword?: string;
    isAdmin?: boolean;
    city?: string;
    street?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    cart?: any[];
    lastOpenCart?: any;
    order?: Order;
    product?: any;
    cartStatus?: any;
    sumAmountCartItems?: any;
}
