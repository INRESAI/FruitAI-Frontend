import { IPagination } from './common';

export interface IPigData {
    id: string;
    heathStatus: string;
    size: string;
    weight: string;
    dateOfBirth: string;
    tempurature: string;
    penId: string;
    speciesId: string;
    pigAIId: string;
}

export interface IListPigByFarmId extends IPagination {
    farmId: string
    isIdentityConfirm: boolean
}

export interface IUpdateIdentityInput {
    userId: string
    farmId: string
    pigAIIds: string[]
    data: {
        changePenPrediction: string
        dateIn: string
        dateOfBirth: string
        origin: string
        penId: string
        pigOutPrediction: string
        size: number
        weight: number
    }
}

interface IEvent {
    id: string
    name: string
    startDate: string
    endDate: string
    eventType: {
        id: string
        name: string
    }
}

export interface IDetailPig {
    id: string
    pigAIId: string
    size: number
    weight: number
    events: IEvent[]
    dateIn: IEvent
    changePenPrediction: IEvent
    pigOutPrediction: IEvent
    dateOfBirth: string
    origin: string
    healthStatus: {
        id: string
        name: string
    }
    pen: {
        id: string
        name: string
    }
}

export interface IUpdatePig {
    changePenPrediction: string
    dateIn: string
    dateOfBirth: string
    origin: string
    pigOutPrediction: string
}

export interface IFarmAllPigs {
    name: string
    address: string
    pigs: IPigData[]
    totalPigs: number
    totalNormalPigs: number
    totalAbnormalPigs: number
}