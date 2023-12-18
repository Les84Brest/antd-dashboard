import {action, computed, makeObservable, observable} from "mobx";
import {ICategory, IManager, IOrderLine} from "./types";
import DataService from "../api/DataService";

export class OrderStore {

    orders: IOrderLine[] = [];
    managers: IManager[] = [];
    categories: ICategory[] = [];

    constructor() {
        makeObservable(this, {
            orders: observable,
            managers: observable,
            categories: observable,
            fetchOrdersData: action,
            fetchManagersData: action,
            fetchCategoriesData: action,
            ordersRawData: computed
        })

    }

    fetchOrdersData = async () => {
        this.orders = await DataService.getOrders()

    }
    fetchManagersData = async () => {
        this.managers = await DataService.getManagers();
    }

    fetchCategoriesData = async () => {
        this.categories = await DataService.getCategories();
    }

    initOrdersData = async () => {
        Promise.all([
            this.fetchCategoriesData(),
            this.fetchManagersData(),
            this.fetchOrdersData()])
    }

    get ordersRawData() {
        const processedData = this.orders.map(orderLine => {
            const {manager_id, category_id, ...rest} = orderLine;
            return {
                ...rest,
                manager: this.getManagerName(manager_id),
                category: this.getCategoryName(category_id),
            }
        })
        return processedData;
    }

    getManagerName = (id: number): string => {
        const manager = this.managers.find((manager) => {
            return manager.id === id;
        })

        return manager ? manager.manager_name : '';
    }

    getCategoryName = (id: number): string => {
        const category = this.categories.find((category) => {
            return category.id === id
        })

        return category ? category.category_name : '';
    }

}

export default new OrderStore()