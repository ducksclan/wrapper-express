import { isNotEmpty, isString } from 'class-validator';
import ServerError from './server.error';
import ApiError from './api.error';

export default function handleError(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error;
    }

    if (error instanceof Error) {
        let err = ServerError.InternalServerError(error.message);
        err.stack = error.stack;
        return err;
    }

    if (!isNotEmpty(error)) {
        return ServerError.InternalServerError(
            'error handling: error is empty'
        );
    }

    if (isString(error)) {
        return ServerError.InternalServerError(error);
    }

    return ServerError.InternalServerError('error handling: unexpected error');
}
