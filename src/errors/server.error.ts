import { HttpStatus } from '../interfaces';
import ApiError from './api.error';

export default class ServerError {
    static InternalServerError(debug?: string): ApiError {
        return new ApiError(
            'Internal Server Error',
            HttpStatus.InternalServerError,
            debug
        );
    }

    static NotImplemented(debug?: string): ApiError {
        return new ApiError(
            'Not Implemented',
            HttpStatus.NotImplemented,
            debug
        );
    }

    static ServiceUnavailable(debug?: string): ApiError {
        return new ApiError(
            'Service Unavailable',
            HttpStatus.ServiceUnavailable,
            debug
        );
    }
}
