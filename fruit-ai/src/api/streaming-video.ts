/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcher } from "./sender";
import { WEBRTC_STREAMING } from '../constants/config'

export const apiStreamingVideo = {
    getStreamingVideoURL(camId: string, clientUuid: string) {
        return `${WEBRTC_STREAMING}/videoFeed/camId/${camId}/clientUuid/${clientUuid}`;
    },
    highlightPosition(payload: any, cameraId: string) {
        return fetcher.post(`${WEBRTC_STREAMING}/camera/${cameraId}/highlightPosition`, payload);
    },
    terminateByUuId(payload: any) {
        return fetcher.post(`${WEBRTC_STREAMING}/terminate`, payload);
    },
    terminateRTCStreaming(cameraId: string, lstClientUuid: string[]) {
        const len = lstClientUuid.length;
        let url = `${WEBRTC_STREAMING}/camera/${cameraId}/terminateStreaming?`;
        lstClientUuid.forEach((item, index) => {
            url += `lstUuid=${item}`
            if (index < len - 1) {
                url += '&'
            }
        })
        return fetcher.delete(url);
    },
    getStream(cameraId: string): string {
        return `${WEBRTC_STREAMING}/camera/clientUuid/heelo/rtcStreaming`
    }
}