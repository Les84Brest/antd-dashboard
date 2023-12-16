export type OrderStatus = "Preparing" | "Waiting for payment" | "Delivered" | "Sent";

export default interface IOrder {
    "order_id": number,
    "date": string,
    "manager": string,
    "sum": number,
    "status": OrderStatus
}