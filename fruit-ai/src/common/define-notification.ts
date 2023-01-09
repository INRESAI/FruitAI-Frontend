import { Camera } from "./models/camera-model";

export interface Notification{
    cameraId: string;
    userId: string;
    title: string;
    content: string;
    time: Date;
    status: number; // Da xem thong bao hay chua. 1 la da xem, 0 la chua xem
    isNew: number; // Tin con moi hay la cu. 1 la moi, 0 la cu
    camera: Camera
}

export interface GetNotificationRequest{

    userId: string | null,
    additionalProp1: {}
}