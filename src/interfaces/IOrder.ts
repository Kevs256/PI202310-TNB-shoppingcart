export interface IOrder{
    id_order: number,
    id_user: string
}

export interface IOrder_products{
    id_order_products: number,
    id_order: number,
    id_product: string,
    type: string,
    quantity: number,
    unit_price: number,
    discount: number
}
