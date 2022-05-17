export type HttpStatus =
    | 400
    | 401
    | 402
    | 403
    | 404
    | 409
    | 410
    | 500
    | 501
    | 503;

export const httpStatusNames: Record<HttpStatus, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    410: 'Gone',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    503: 'Service Unavailable',
};
