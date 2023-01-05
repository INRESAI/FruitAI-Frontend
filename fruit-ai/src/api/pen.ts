import { CFG_BASE_URL } from '../constants/config';
import { IListAllPens } from '../types/pen';
import { fetcher } from "./sender";

export const apiPen = {
    getAllPen(params: any) {
        return fetcher.post(`${CFG_BASE_URL}/pens/all`, params);
    },
    getAllPenEmpty(params: any) {
        return fetcher.post(`${CFG_BASE_URL}/pens/emptyPens`, params);
    },
    createPen(payload: any) {
        return fetcher.post(`${CFG_BASE_URL}/pens/`, payload);
    },
    deletePen(penId: string) {
        return fetcher.delete(`${CFG_BASE_URL}/pens/${penId}`);
    },
    updatePen(penId: string, payload: any) {
        return fetcher.put(`${CFG_BASE_URL}/pens/${penId}`, payload);
    },
    getAllPensByFarmId(params: IListAllPens) {
        const { offset, size } = params;
        return fetcher.get(`${CFG_BASE_URL}/pens/allPens/${params.farmId}`, { offset, size });
    }
};