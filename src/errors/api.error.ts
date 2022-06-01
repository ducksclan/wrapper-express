import { HttpStatus } from '../interfaces';

export default class ApiError extends Error {
    name: 'ApiError';
    status: HttpStatus;
    debug?: string;

    constructor(message?: string, status?: HttpStatus, debug?: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status || 500;
        this.debug = debug;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
