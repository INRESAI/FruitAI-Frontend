/* eslint-disable */
import JSEncrypt from 'jsencrypt';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from "rxjs/operators";
import SYSTEM_CONSTANTS from '../common/constants';
import { IUser, LoginRequest, RegisterRequest, ResponseDeparment } from '../common/define-identity';
import { IDataResponse } from '../common/define-meetings';
import HttpClient from "./http-client";
export default class IdentityApi {
    static host = 'http://178.128.19.31:3003';
    // static encryptData(text: string, key: string) {
    //     const jsEncrypt = new JSEncrypt();
    //     jsEncrypt.setPublicKey(key)
    //     const encypt = jsEncrypt.encrypt(text);
    //     return encypt || '';
    // }
    static getToken(): Observable<string | null> {
        return HttpClient.get(`${IdentityApi.host}/${SYSTEM_CONSTANTS.API.IDENTITY.CONNECT_TOKEN}`).pipe(
            map((res) => res as string || null)
        );
    }

    static login(body: LoginRequest): Observable<IDataResponse<any> | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.IDENTITY.LOGIN}`;
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IUser> || null, catchError((error) => new Observable)));
    }

    static register(body: RegisterRequest): Observable<IDataResponse<any> | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.IDENTITY.REGISTER}`;
        // console.log(body)
        return HttpClient.post(api, body).pipe(
            map((res) => res as IDataResponse<IUser> || null, catchError((error) => new Observable))
        );
    }

    static deparmentId(token: any): Observable<ResponseDeparment | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.LISTHOTEL.DEPARTMENT}`;
        return HttpClient.get(api, { headers: { Authorization: `Bearer ${token}` } }).pipe(
            map((res) => res as ResponseDeparment || null)
        )
    }

    static forgotPassword(email: string): Observable<any | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.IDENTITY.FORGOT}/${email}/notify/passwordreset`;
        return HttpClient.post(api, {}).pipe(
            map((res) => res as any || null, catchError((error) => new Observable)));

    }
}