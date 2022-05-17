import { HttpStatus, httpStatusNames } from '../interfaces';

export default class ApiError extends Error {
    status: HttpStatus;
    debug?: string;

    constructor(message?: string, status?: HttpStatus, debug?: string) {
        super(message);
        this.status = status || 500;
        this.debug = debug;
    }

    static InternalServerError(debug?: string) {
        return new this(httpStatusNames[500], 500, debug);
    }

    static NotImplemented(debug?: string) {
        return new this(httpStatusNames[501], 501, debug);
    }

    static ServiceUnavailable(debug?: string) {
        return new this(httpStatusNames[503], 503, debug);
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
