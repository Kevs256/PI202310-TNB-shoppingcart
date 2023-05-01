import axios from "axios";
import IProduct, { IProductInventory } from "../interfaces/IProduct";


class inventoryService{

    baseUrl: string

    constructor(){
        this.baseUrl = `${process.env.URL_API_INVENTORY}/inventory`
    }

    addProducts(id_user:string, products:IProductInventory[]): Promise<IProduct>{
        return new Promise(async (res, rej) => {
            try {
                const { data } = await axios.post(`${this.baseUrl}/${id_user}`, {products});
                res(data.data);
            } catch (error) {
                rej(error);
            }
        });
    }

}

export default new inventoryService();