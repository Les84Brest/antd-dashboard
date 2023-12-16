import axios, { AxiosResponse } from "axios";
import ISale from "../models/ISale";
import IOrder from "../models/IOrder";

const SERVER_URL = 'http://localhost:3005';

export default class DataService {
    static async getSalesData(): Promise<AxiosResponse<ISale[]>> {
        return axios.get<ISale[]>(`${SERVER_URL}/sales`)
    }

    static async getOrdersData(): Promise<AxiosResponse<IOrder[]>> {
        return axios.get<IOrder[]>(`${SERVER_URL}/orders`)
    }
}