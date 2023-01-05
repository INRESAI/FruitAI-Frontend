import { IFarmData } from "./farm";
import { IPenData } from "./pen";
import { IPigData } from "./pig";
import { IEventTypeData } from "./event-type";

export interface IEventData {
    startDate: string;
    endDate: string;
    name: string;
    desc: string;
    id: string;
    eventType: IEventTypeData;
    farms: IFarmData[];
    pens: IPenData[];
    pigs: IPigData[];
    userId: string;
}