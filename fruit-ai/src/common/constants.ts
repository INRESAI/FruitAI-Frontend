
const SYSTEM_CONSTANTS = {
    API: {
        LISTHOTEL: {
            DEPARTMENT: 'api/Employee/me',
            HOTEL: 'api/OperationCenter/me'
        },
        IDENTITY: {
            CONNECT_TOKEN: 'identity/clients/publicKey',
            LOGIN: "users/login",
            FORGOT: "license_manager/users",
            REGISTER: "users/register"
        },
        MEETINGS: {
            CREATE_MEETINGS: 'meeting',
            FILTER_MEETINGS: 'meeting/multiMember',
            UPDATE_MEETINGS: 'meeting/{meetingId}',
            DELETE_MEETINGS: 'meeting/{meetingId}',
            GET_MEETING_BY_ID: 'meeting/{meetingId}',
        },
        MEMBER: {
            GET_ALL: 'member/getAll',
            GET_ALL_WITH_ROLE: 'member/getAllWithRole',
            CREATE_MEMBER: 'member',
            UPDATE_MEMBER: 'member/{memberId}'
        },
        ROLE: {
            GET_ALL: 'role/getAll'
        },
        TASK: {
            GET_ALL: 'task/getAll',
            CREATE_TASK: 'task',
            GET_BY_ID: 'task/{taskId}',
            UPDATE_TASK: 'task/{taskId}'
        },
        MAIL_SERVICE: {
            MEETING_INVITATION: 'meetingInvitation'
        },
        WARE_HOUSE: {
            GET_WAREHOUSE_BY_USERID: 'warehouses/ownerId',
        }
    },
    IMAGE: {
        IMAGE_HOTEL: "dms/Document/file"
    },
    CAMERA_STREAM: {
        STREAMING_CAMERA: (cameraId: string): string => `${cameraId}/streaming`,
        RTC_CAMERA: (clientUuid: string) => `camera/clientUuid/${clientUuid}/rtcStreaming`,
        RTC_CAMERA_NONE_AI: (clientUuid: string) => `camera/clientUuid/${clientUuid}/rtcStreamingNoneAI`,
        ANALYSIS_CAMERA: (cameraId: string) => `camera/${cameraId}/analyse`
    }
}

export default SYSTEM_CONSTANTS