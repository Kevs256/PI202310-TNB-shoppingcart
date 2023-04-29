export interface Iwishlist{
    id_wishlist?: number,
    id_user: string
}

export interface IWishlist_products{
    id_wishlist_products?: number,
    id_wishlist: number,
    id_product: string
}
