import { CFG_SIZE_PAGINATION } from '../constants/config';

const objectToQueryString = (obj: any) => {
    const str = [];
    for (const p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const isEmptyObj = (obj: any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const getParamsSearchDefault = (obj: any) => {
    if (typeof obj === 'object') {
        const page = obj && obj.hasOwnProperty('page') ? obj.page : 1;
        const offset = obj.hasOwnProperty('size') ? obj.size * (page - 1) : CFG_SIZE_PAGINATION * (page - 1);
        return { ...{ offset, size: CFG_SIZE_PAGINATION }, ...obj };
    }
    return {};
}

const getCurrentDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

const formatClientDate = (date: string): string => {
    const dataDate = date.split('-');

    if (dataDate.length <= 1) {
        const defaultDate = date.split('/');

        return `${defaultDate[1]}/${defaultDate[0]}/${defaultDate[2]}`
    }

    return `${dataDate[1]}/${dataDate[2]}/${dataDate[0]}`
}

const calculateBetweenTwoDate = (startDate: string, endDate: string): number => {
    if (typeof startDate !== 'string' || typeof endDate !== 'string') return 0;

    const oneDay = 24 * 60 * 60 * 1000;

    const start: any = new Date(formatClientDate(startDate));
    const end: any = new Date(formatClientDate(endDate));

    return Math.round(Math.abs((end - start) / oneDay)) + 1;
}

const formatDateSearchBeHaviour = (date: string): string => {
    const dataDate = date.split('/');

    return `${dataDate[2]}-${dataDate[1]}-${dataDate[0]}`
}

export const UtilCollections = {
    objectToQueryString,
    isEmptyObj,
    getParamsSearchDefault,
    getCurrentDate,
    calculateBetweenTwoDate,
    formatDateSearchBeHaviour,
    formatClientDate,
}