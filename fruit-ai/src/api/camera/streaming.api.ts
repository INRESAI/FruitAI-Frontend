import SYSTEM_CONSTANTS from '../../common/constants'
import { WEBRTC_STREAMING } from '../../constants/config';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { IGetCameraManage } from '../../common/models/camera-model';
import HttpClient from '../http-client';

export default class StreamAPI {
    static host = WEBRTC_STREAMING;
    static getStream = (cameraId: string): string => {
        return `${StreamAPI.host}/${SYSTEM_CONSTANTS.CAMERA_STREAM.STREAMING_CAMERA(cameraId)}`
    }
    static getRTCStream = (clientUuid: string): string => {
        return `${StreamAPI.host}/${SYSTEM_CONSTANTS.CAMERA_STREAM.RTC_CAMERA(clientUuid)}`
    }
    static getRTCStreamNoneAI = (clientUuid: string): string => {
        return `${StreamAPI.host}/${SYSTEM_CONSTANTS.CAMERA_STREAM.RTC_CAMERA_NONE_AI(clientUuid)}`
    }
    static analysisCamera(cameraId: string): Observable<IGetCameraManage[] | []> {
        return HttpClient.get(`${StreamAPI.host}/${SYSTEM_CONSTANTS.CAMERA_STREAM.ANALYSIS_CAMERA(cameraId)}`).pipe(
            map((res) => res as IGetCameraManage[] || [])
        );
    }
}