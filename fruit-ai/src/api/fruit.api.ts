/* eslint-disable */
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";
import SYSTEM_CONSTANTS from '../common/constants';
import { IWareHouse, WarehouseRequest } from '../common/define-fruit';
import { IDataResponse } from '../common/define-meetings';
import HttpClient from "./http-client";
export default class FruitAPI {
    static host = 'http://178.128.19.31:3003';

    static getWarehousesByUserId(body: WarehouseRequest): Observable<IDataResponse<any> | null> {
        const api = `${FruitAPI.host}/${SYSTEM_CONSTANTS.API.WARE_HOUSE.GET_WAREHOUSE_BY_USERID}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IWareHouse[]> || null, catchError((error) => new Observable)));
    }


}