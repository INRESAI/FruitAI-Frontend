import { IFarmData } from './farm';

export interface ILoginUser {
    id: string;
    username: string;
    email: string;
    fullName: string;
    address: string;
    phone: string;
    accessToken: string;
    avatar?: string;
    defaultFarm: IFarmData;
}
