export interface IManager {
    id: number,
    manager_name: string,
    phone: string,
    email: string
}

export interface ICategory {
    id: number,
    category_name: string
}

export interface IOrderLineBasic {
    id: number,
    order_number: number,
    date: string,
    sum: number
}

export interface IOrderLine extends IOrderLineBasic{
    manager_id: number,
    category_id: number,

}