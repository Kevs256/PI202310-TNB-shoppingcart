import axios from "axios";
import IProduct from "../interfaces/IProduct";


class productService{

    baseUrl: string

    constructor(){
        this.baseUrl = `${process.env.URL_API_PRODUCTS}/products`
    }

    getById(id_product:string): Promise<IProduct>{
        return new Promise(async (res, rej) => {
            try {
                const { data } = await axios.get(`${this.baseUrl}/${id_product}`);
                res(data.data);
            } catch (error) {
                rej(error);
            }
        });
    }

    addStock(id_product:string, stock:number): Promise<IProduct>{
        return new Promise(async (res, rej) => {
            try {
                const { data } = await axios.put(`${this.baseUrl}/${id_product}`, {stock});
                res(data.data);
            } catch (error) {
                rej(error);
            }
        });
    }

    update(product:{price?:number, discount?:number, availability?:number, stock?:number}): Promise<IProduct>{
        return new Promise(async (res, rej) => {
            try {
                const { data } = await axios.put(`${this.baseUrl}`, product);
                res(data.data);
            } catch (error) {
                rej(error);
            }
        });
    }

}

export default new productService();