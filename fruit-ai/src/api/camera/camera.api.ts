/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Camera, IGetCameraManage } from '../../common/models/camera-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { CFG_BASE_URL } from '../../constants/config';
import HttpClient from "../http-client";
import { fetcher } from '../sender';
export default class CameraAPI {
    static host = CFG_BASE_URL;

    static getListCamera(warehouseId: string): Observable<Camera[] | []> {
        return HttpClient.get(`${CameraAPI.host}/camera/warehouse?warehouseId=${warehouseId}`).pipe(
            map((res) => res as Camera[] || [])
        );
    }

    static getListCameraByIdWarehouse(warehouseId: string){

        return fetcher.get(`${CameraAPI.host}/camera/warehouse?warehouseId=${warehouseId}`);
        // return HttpClient.get(`${CameraAPI.host}/camera/warehouse?warehouseId=${warehouseId}`).pipe(
        //     map((res) => res as Camera[] || [])
        // );
    }
}