import { ApiError, HttpStatus } from '.';
import { describe } from 'mocha';
import assert from 'assert';

describe('ApiError', () => {
    describe('object which was created from constructor', () => {
        const MESSAGE = 'testing error message';
        const DEBUG = 'testing debug message';
        const STATUS_CODE = HttpStatus.BadRequest;

        const object = new ApiError(MESSAGE, STATUS_CODE, DEBUG);

        it('should pass instanceof validation of ApiError', () => {
            assert(object instanceof ApiError);
        });
    });
});
