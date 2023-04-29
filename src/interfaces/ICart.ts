export interface ICart{
    id_cart: number,
    id_user: string
}

export interface ICart_products{
    id_cart_products: number,
    id_cart: number,
    id_product: string,
    quantity: number,
    type: string
}
