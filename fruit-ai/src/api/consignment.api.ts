import { AddWarehouseRequest, Warehouse } from '../common/define-warehouse';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { CFG_BASE_URL } from '../constants/config';
import HttpClient from "./http-client";
export default class WarehouseAPI {
    static host = CFG_BASE_URL;

    static getListConsignmentsByIdWarehouse(warehouseId: string): Observable<Warehouse[] | []> {
        return HttpClient.get(`${WarehouseAPI.host}consignments/warehouse?warehouseId=${warehouseId}`).pipe(
            map((res) => res as Warehouse[] || [])
        );
    }
}