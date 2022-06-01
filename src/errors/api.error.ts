import { HttpStatus } from '../interfaces';

/**
 * Extended error class for api handling needs.
 * @example
 * const message = 'error message';
 * const debugMessage = 'debug message';
 * const stausCode = HttpStatus.BadRequest;
 * const error = new ApiError(message, stausCode, debugMessage);
 *
 * console.log(error instanceof ApiError) // true
 * console.log(error instanceof Error) // true
 *
 * response.status(error.status).send(error.message);
 */
export default class ApiError extends Error {
    name: 'ApiError';
    /**
     * Http status code
     */
    status: HttpStatus;
    /**
     * Debug message
     */
    debug?: string;

    constructor(message?: string, status?: HttpStatus, debug?: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status || 500;
        this.debug = debug;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
