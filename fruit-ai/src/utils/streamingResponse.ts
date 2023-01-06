class ResponseMessage {
    status_code: number;
    statusCodeMessage: string;
    message: string;

    constructor(status_code: number, statusCodeMessage: string, message: string) {
        this.status_code = status_code;
        this.statusCodeMessage = statusCodeMessage;
        this.message = message;
    }
}

class StreamingResponse {
    static SuccessResponse = new ResponseMessage(200, 'OK', '')

    static BadRequest = new ResponseMessage(400, 'BadRequest', '')

    static NotFound = new ResponseMessage(404, 'NotFound', '')

    static ErrorTerminateAnalysis = new ResponseMessage(500, 'ErrorTerminateAnalysis', 'Error when terminate analyse detection.')

    static ErrorTerminateAllAnalysis = new ResponseMessage(500, 'ErrorTerminateAllAnalysis', 'Error when terminate all analysis.')

    static ErrorTerminateStreaming = new ResponseMessage(500, 'ErrorTerminateStreaming', 'Error when terminate analyse detection.')

    static ErrorStreamingWEBRTC = new ResponseMessage(500, 'ErrorStreamingWEBRTC', 'Error when streaming webrtc.')

    static ErrorHighlightPosition = new ResponseMessage(500, 'ErrorHighlightPosition', 'Error when execute api calculate highlight location.')

    static ErrorInitialServer = new ResponseMessage(500, 'ErrorInitialServer', 'Error when initial server.')
}

export default StreamingResponse;