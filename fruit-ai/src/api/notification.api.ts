/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";
import { GetNotificationRequest } from '../common/define-notification';
import { CFG_BASE_URL } from '../constants/config';
import HttpClient from "./http-client";
export default class NotificationAPI {
    static host = CFG_BASE_URL;

    

    static getAllNotificationByIdUser(param: GetNotificationRequest): Observable<Notification[] | []> {
        console.log('Tao met lam roi do')
        return HttpClient.post(`${NotificationAPI.host}/notification/ownerId`,param).pipe(
            map((res) => res as Notification[] || [])
        );
    }

    static setNotificationStatusById(notificationId: string): Observable<Notification> {
        return HttpClient.put(`${NotificationAPI.host}/notification/${notificationId}`,{}).pipe(
            map((res) => res as Notification)
        );
    }

}