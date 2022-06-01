import { HttpStatus } from '../interfaces';
import ApiError from './api.error';

export default class ClientError {
    static BadRequest(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.BadRequest, debug);
    }

    static Unauthorized(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.Unauthorized, debug);
    }

    static PaymentRequired(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.PaymentRequired, debug);
    }

    static Forbidden(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.Forbidden, debug);
    }

    static NotFound(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.NotFound, debug);
    }

    static Conflict(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.Conflict, debug);
    }

    static Gone(message?: string, debug?: string): ApiError {
        return new ApiError(message, HttpStatus.Gone, debug);
    }
}
