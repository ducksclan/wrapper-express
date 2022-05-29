import { HttpStatus } from '../interfaces';

export default class ApiError extends Error {
    status: HttpStatus;
    debug?: string;

    constructor(message?: string, status?: HttpStatus, debug?: string) {
        super(message);
        this.status = status || 500;
        this.debug = debug;
    }

    static BadRequest(message?: string, debug?: string) {
        return new this(message, HttpStatus.BadRequest, debug);
    }

    static Unauthorized(message?: string, debug?: string) {
        return new this(message, HttpStatus.Unauthorized, debug);
    }

    static PaymentRequired(message?: string, debug?: string) {
        return new this(message, HttpStatus.PaymentRequired, debug);
    }

    static Forbidden(message?: string, debug?: string) {
        return new this(message, HttpStatus.Forbidden, debug);
    }

    static NotFound(message?: string, debug?: string) {
        return new this(message, HttpStatus.NotFound, debug);
    }

    static Conflict(message?: string, debug?: string) {
        return new this(message, HttpStatus.Conflict, debug);
    }

    static Gone(message?: string, debug?: string) {
        return new this(message, HttpStatus.Gone, debug);
    }

    static InternalServerError(debug?: string) {
        return new this(
            'Internal Server Error',
            HttpStatus.InternalServerError,
            debug
        );
    }

    static NotImplemented(debug?: string) {
        return new this('Not Implemented', HttpStatus.NotImplemented, debug);
    }

    static ServiceUnavailable(debug?: string) {
        return new this(
            'Service Unavailable',
            HttpStatus.ServiceUnavailable,
            debug
        );
    }

    static handle(error: unknown): ApiError {
        if (error === undefined || error === null) {
            return this.InternalServerError(
                'error handling: error is undefined'
            );
        }

        switch (typeof error) {
            case 'string':
                return this.InternalServerError(error);
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'symbol':
                return this.InternalServerError(error.toString());
            case 'function':
                return this.InternalServerError(
                    'error handling: cannot handle function'
                );
        }

        if (error instanceof ApiError) {
            return error;
        }

        if (error instanceof Error) {
            let err = this.InternalServerError(error.message);
            err.stack = error.stack;
            return err;
        }

        return this.InternalServerError('error handling: unexpected error');
    }
}
