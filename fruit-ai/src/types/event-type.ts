export interface IEventTypeData {
    id: string;
    name: string;
}

export enum EEventTypeName {
    PIG_IN = 'Nhập chuồng',
    CHANGE_PEN_PREDICTION = 'Ngày chuyển chuồng dự kiến',
    PIG_OUT_PREDICTION = 'Ngày xuất chuồng dự kiến',
}