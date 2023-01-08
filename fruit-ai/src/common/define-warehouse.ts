export interface Warehouse{
    name: string,
    address: string,
    id: string
}

export interface AddWarehouseRequest{
    name: string,
    address: string,
    userId: string,
}