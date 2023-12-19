import axios, {AxiosResponse} from "axios";
import {IOrderLine, IManager, ICategory} from "../store/types"

const SERVER_URL = 'http://localhost:3005';
/**
 *  @description class to get data from backend and pass it to Mobx
 */
export default class DataService {
    /**
     * @description get categories data from backend
     * @returns Promise<ICategory[]>
     */
    static async getCategories(): Promise<ICategory[]> {
        try {
            const response: AxiosResponse<ICategory[]> = await axios.get(`${SERVER_URL}/categories`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            return []
        }

    }

    /**
     * @description get orders from backend
     * @returns Promise<IOrderLine[]>
     */
    static async getOrders(): Promise<IOrderLine[]> {
        try {
            const response: AxiosResponse<IOrderLine[]> = await axios.get(`${SERVER_URL}/orders`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            return []
        }

    }

    /**
     * get general managers data from backend
     * @returns  Promise<IManager[]>
     */

    static async getManagers(): Promise<IManager[]> {
        try {
            const response: AxiosResponse<IManager[]> = await axios.get(`${SERVER_URL}/managers`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            return []
        }

    }
}

