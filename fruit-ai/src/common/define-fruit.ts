export interface RegisterRequest {
    email: string,
    dob: Date,
    name: string,
    phone: string,
    password: string,
    confirmPassword: string,
    additionalProp1: {}
}
export interface LoginRequest{
    username: string,
    password: string,
    remember: boolean,
    additionalProp1: {},
}
export interface WarehouseRequest{
    userId: string,
    additionalProp1: {}
}
export interface IWareHouse {
    id: string,
    name: string,
    address: string,
}