import userServices from '../services/user';
import { UtilCollections } from '../utils/collections';

function createApi() {
    const createHeaders = () => {
        const user = userServices.get();
        const headers: HeadersInit = new Headers();
        headers.append('Content-Type', 'application/json');
        if (user) {
            headers.append('Authorization', `Bearer ${user.accessToken}`);
        }
        return headers;
    }

    const handleError = (error: any) => {
        return new Promise((resolve, reject) => {
            if (error.response && error.response.data) {
                return reject(error.response.data.message);
            }
            return reject(error);
        });
    }

    const handleResponse = (res: any) => {
        if (!res.ok) {
            throw res;
        }
        return res.json();
    }

    const handleData = (data: any) => {
        return new Promise((resolve, reject) => {
            if (data.statusCode === 'OK') {
                return resolve(data.data);
            }
            return reject(data.message);
        });
    }

    const withPayload = (method: string) => async (url: string, data: string) => {
        const payload = data === null ? undefined : JSON.stringify(data);
        const headers = createHeaders();
        const optionsUrl = url;
        const optionsRequest = {
            method,
            headers,
            body: payload,
        };

        try {
            const res = await fetch(optionsUrl, optionsRequest);
            const data = await handleResponse(res);
            return handleData(data);
        } catch (error) {
            return handleError(error);
        }
    }

    const withoutPayload = (method: string) => async (url: string, params?: any) => {
        const query = UtilCollections.getParamsSearchDefault(params);
        const newUrl = UtilCollections.isEmptyObj(query) ? url : `${url}?${UtilCollections.objectToQueryString(query)}`;
        const headers = createHeaders();
        const optionsRequest = {
            method,
            headers,
        };

        try {
            const res = await fetch(newUrl, optionsRequest);
            const data = await handleResponse(res);
            return handleData(data);
        } catch (error) {
            return handleError(error);
        }
    }

    return {
        get: withoutPayload("GET"),
        post: withPayload("POST"),
        delete: withoutPayload("DELETE"),
        put: withPayload('PUT')
    }
}

const fetcher = createApi();

export {
    fetcher
}
