

export interface Order {

    _id?: string;
    userId: string;
    cartId: string;
    totalPrice: number;
    city: string;
    street: string;
    shippingDate: string;
    orderDate?: Date;
    creditCardDigits: number;
}
