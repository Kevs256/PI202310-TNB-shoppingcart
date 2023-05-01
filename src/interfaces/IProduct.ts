export interface IProductInventory{
    id_product: string
    quantity: number
}

export default interface IProduct{
    id_product?: string,
    type:string,
    price: number,
    discount: number,
    availability: number,
    stock: number,
    acu_ratings: number,
    cont_ratings: number
}