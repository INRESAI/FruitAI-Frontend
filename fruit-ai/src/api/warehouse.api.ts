/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddWarehouseRequest, Warehouse } from '../common/define-warehouse';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { CFG_BASE_URL } from '../constants/config';
import HttpClient from "./http-client";
export default class WarehouseAPI {
    static host = CFG_BASE_URL;

    

    static getListWarehouseByIdUser(userId: string): Observable<Warehouse[] | []> {
        return HttpClient.get(`${WarehouseAPI.host}/warehouses/${userId}`).pipe(
            map((res) => res as Warehouse[] || [])
        );
    }

    static addWarehouseByIdUser(param: AddWarehouseRequest): Observable<Warehouse[]| []>{
        return HttpClient.post(`${WarehouseAPI.host}/warehouses`, param).pipe(
            map((res) => res as Warehouse[] || [])
        );
    }
}