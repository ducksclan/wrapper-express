import { HttpStatus } from '../interfaces';
import { describe } from 'mocha';
import ApiError from './api.error';
import assert from 'assert';

describe('ApiError', () => {
    describe('error which was created from constructor', () => {
        const MESSAGE = 'testing error message';
        const DEBUG = 'testing debug message';
        const STATUS_CODE = HttpStatus.BadRequest;

        const error = new ApiError(MESSAGE, STATUS_CODE, DEBUG);

        it('should pass instanceof Error check', () => {
            assert(error instanceof Error);
        });

        it('should pass instanceof ApiError check', () => {
            assert(error instanceof ApiError);
        });

        it('#name should be equal to "ApiError"', () => {
            assert(error.name === 'ApiError');
        });

        it('defined #stack should match /^ApiError: / regex', () => {
            assert(error.stack?.match(/^ApiError: /));
        });
    });
});
