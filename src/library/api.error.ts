import { HttpStatus } from '../interfaces';

export default class ApiError extends Error {
    status: HttpStatus;
    debug?: string;

    constructor(message?: string, status?: HttpStatus, debug?: string) {
        super(message);
        this.status = status || 500;
        this.debug = debug;
    }

    static InternalServerError(debug?: string) {
        let code = HttpStatus.InternalServerError;
        return new this('Internal Server Error', code, debug);
    }

    static NotImplemented(debug?: string) {
        let code = HttpStatus.NotImplemented;
        return new this('Not Implemented', code, debug);
    }

    static ServiceUnavailable(debug?: string) {
        let code = HttpStatus.ServiceUnavailable;
        return new this('Service Unavailable', code, debug);
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
