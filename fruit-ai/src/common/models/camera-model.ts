export interface IFormAddCamera {
    name: string,
    ip: string,
    port: string,
    hostString: string
}

export interface IGetCameraManage {
    id: string,
    isHiddenCamera?: boolean,
    media?: MediaStream,
    penId?: string,
    camName?: string,
    account?: string,
    passwordCam?: string,
    manufacturer?: string,
    linkStreaming?: string,
    metaData?: string
}

export interface Camera{
    name: string,
    link: string,
    note: string,
    warehouseId: string,
    id: string
}

export interface AddNewCameraRequest{
    name: string,
    link: string,
    note: string,
    warehouseId: string,
}

export interface AddNewCameraResponse{
    data: string,
    statusCode: string
}