import { fetcher } from "./sender";
import { CFG_STREAMING_URL } from '../constants/config'

export const apiStreamingVideo = {
    getStreamingVideoURL(pendId: string, clientUuid: string) {
        return `${CFG_STREAMING_URL}/videoFeed/id/${pendId}/clientUuid/${clientUuid}`;
    },
    highlightPosition(payload: any) {
        return fetcher.post(`${CFG_STREAMING_URL}/highlightPosition`, payload);
    },
    terminateByUuId(payload: any) {
        return fetcher.post(`${CFG_STREAMING_URL}/terminate`, payload);
    }
}