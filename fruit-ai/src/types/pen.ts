import { IEventData } from "./event";
import { IPigData } from "./pig";
import { IWeightTypeData } from "./weight-type";
import { IPagination } from './common';

export interface IPenData {
    id: string;
    name: string;
    area: string;
    capacity: string;
    weightType: IWeightTypeData;
    note: string;
    totalPigs: number;
    pigs: IPigData[];
    penStatus: string;
    events: IEventData[];
}

export interface IListAllPens extends IPagination {
    farmId: string
}