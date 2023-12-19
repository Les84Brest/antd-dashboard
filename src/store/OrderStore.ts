import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {
    ICategory,
    IManager,
    IOrderLine,
    SalesChartDataItem,
    ManagersChartDataItem,
    CategoryChartDataItem,
    IManagerGeneralData
} from "./types";
import DataService from "../api/DataService";
import dayjs from "dayjs";
import {DATE_FORMAT} from "../helper/config";
import {getMonthShort} from "../helper/date";
import {groupBy} from "lodash-es";

/**
 * @description MobX store for application
 */
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
            ordersRawData: computed,
            salesChartData: computed,
            managersChartData: computed,
            categoriesChartData: computed,
            managersGeneralData: computed
        })

    }

    /**
     * @description stores orders data - evety line represent data about one purchase in order
     */
    fetchOrdersData = async () => {
        const fetchedOrders = await DataService.getOrders();
        runInAction(() => this.orders = fetchedOrders);
    }
    /**
     * @description stores managers data - name, contacts, avatar
     */
    fetchManagersData = async () => {
        const fetchedManagers = await DataService.getManagers();
        runInAction(() => this.managers = fetchedManagers);

    }
    /**
     * @description stores categories data - category name
     * */
    fetchCategoriesData = async () => {
        const fetchedCategories = await DataService.getCategories();
        runInAction(() => this.categories = fetchedCategories);
    }
    /**
     * @description ferch all data to begin work
     */
    initOrdersData = async () => {
        Promise.all([
            this.fetchCategoriesData(),
            this.fetchManagersData(),
            this.fetchOrdersData()])
    }

    /**
     * @description calculates data to show orders table
     */
    get ordersRawData() {
        const processedData = this.orders.map((orderLine, index) => {
            const {manager_id, category_id, ...rest} = orderLine;
            return {
                ...rest,
                manager: this.getManagerName(manager_id),
                category: this.getCategoryName(category_id),
                key: index
            }
        })
        return processedData;
    }

    /**
     * @description get manager name by id
     * @param id
     */
    getManagerName = (id: number): string => {
        const manager = this.managers.find((manager) => {
            return manager.id === id;
        })

        return manager ? manager.manager_name : '';
    }
    /**
     * @description Get category name by id
     * @param id
     */
    getCategoryName = (id: number): string => {
        const category = this.categories.find((category) => {
            return category.id === id
        })

        return category ? category.category_name : '';
    }

    /**
     * @description Prepare data for building sales by month chart
     */
    get salesChartData(): SalesChartDataItem[] {
        const salesByMonth = this.orders.reduce((chartData: { [key: number]: number }, order: IOrderLine) => {
            const month = dayjs(order.date, DATE_FORMAT).month();
            const newSum = chartData[month] ? chartData[month] + order.sum : order.sum;

            return {...chartData, [month]: newSum}
        }, {})

        return Object.entries(salesByMonth)
            .sort((a, b) => {
                const [aKey] = a;
                const [bKey] = b;
                return parseInt(aKey) - parseInt(bKey);
            })
            .map(sale => {
                const [key, value] = sale;
                return {month: getMonthShort(key), sum: value}
            })
    }
    /**
     * @description Prepare data for building sales by managers chart
     */
    getSalesByManagers = () => {
        return this.orders.reduce((chartData: { [key: number]: number }, order: IOrderLine) => {
            const manager = order.manager_id;
            const newSum = chartData[manager] ? chartData[manager] + order.sum : order.sum;

            return {...chartData, [manager]: newSum}
        }, {});
    }

    /**
     * @description Prepare data to build ManagersChart component
     */
    get managersChartData(): ManagersChartDataItem[] {
        const salesByManagers = this.getSalesByManagers();
        return Object.entries(salesByManagers)
            .map((data) => {
                const [id, sum] = data;

                const manager = this.managers.find((manager) => manager.id === +id)

                if (manager) {
                    return {type: manager.manager_name, value: sum}
                }
                return {type: '', value: sum};
            })
    }

    /**
     * @description Prepare data to build CategoriesChart component
     */
    get categoriesChartData(): CategoryChartDataItem[] {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const salesByCategory = this.orders.reduce((data: {
            [key: number]: [{ month: number, sum: number }]
        }, order) => {

            const category = order.category_id;
            const month = dayjs(order.date, DATE_FORMAT).month();
            const lineData = {month, sum: order.sum}
            const newCategory = data[category] ? [...data[category], lineData] : [lineData];

            return {...data, [category]: newCategory}

        }, {})

        const monthSumCalculated = Object.entries(salesByCategory)
            .map(categoryData => {
                const [category, data] = categoryData;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const monthGroupedData = data.reduce((acc, cur) => {

                        const month = acc[cur.month]
                        if (!month) {
                            return {...acc, [cur.month]: cur.sum};
                        } else {
                            return {...acc, [cur.month]: month + cur.sum};
                        }
                    },
                    {});
                return [+category, monthGroupedData]
            })


        const chartData = monthSumCalculated
            .flatMap((item) => {
                const [category, data] = item;
                return Object.entries(data)
                    .map(month => {
                        const [key, value] = month;
                        return {
                            month: getMonthShort(key),
                            sum: value as number,
                            category: this.getCategoryName(category)
                        }
                    });

            });

        return chartData;
    }

    /**
     * @description generate data about managers iformation
     * @returns {IManagerGeneralData[]}
     */
    get managersGeneralData(): IManagerGeneralData[] {
        // get orders by managers
        const managersOrders = this.orders.map(order => ({order: order.order_number, manager: order.manager_id}))
        const groupedOrders = groupBy(managersOrders, 'manager');

        let ordersByManagers: { [key: number]: number } = {}
        for (const key in groupedOrders) {
            const manOrders = groupedOrders[key];
            const listOrders = manOrders.map(ord => ord.order);
            const ordersSet = new Set(listOrders);
            ordersByManagers = {...ordersByManagers, [key]: ordersSet.size};

        }

        // get sales by managers
        const salesByManagers = this.getSalesByManagers();

        return this.managers.map((manager) => {
            return {
                ...manager,
                sales: salesByManagers[manager.id],
                orders_count: ordersByManagers[manager.id]
            }
        });

    }

}

export default new OrderStore()