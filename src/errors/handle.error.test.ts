import { describe, it } from 'mocha';
import handleError from './handle.error';
import assert from 'assert';
import ApiError from './api.error';

const FUNCTION = () => {};
const BOOLEAN = false;
const INTEGER = 2;
const FLOAT = 3.14;
const BIGINT = 9007199254740991n;
const EMPTY_OBJECT = {};
const STRING_ARGUMENT = 'string argument';
const OBJECT_WITH_MESSAGE = {
    message: 'something went wrong',
};

const EMPTY_CASE_MESSAGE = 'error handling: error is empty';
const UNEXPECTED_CASE_MESSAGE = 'error handling: unexpected error';

describe('handleError', () => {
    describe('should return ApiError with debug message', () => {
        it('which was received from given string argument', () => {
            assert(handleError(STRING_ARGUMENT).debug === STRING_ARGUMENT);
        });

        describe(EMPTY_CASE_MESSAGE, () => {
            it('when error is not specified', () => {
                // @ts-ignore
                assert(handleError()?.debug === EMPTY_CASE_MESSAGE);
            });

            it('when error is undefined', () => {
                assert(handleError(undefined)?.debug === EMPTY_CASE_MESSAGE);
            });

            it('when error is null', () => {
                assert(handleError(null)?.debug === EMPTY_CASE_MESSAGE);
            });

            it('when error is empty string', () => {
                assert(handleError('')?.debug === EMPTY_CASE_MESSAGE);
            });
        });

        describe(UNEXPECTED_CASE_MESSAGE, () => {
            it('when error is function', () => {
                assert(
                    handleError(FUNCTION)?.debug === UNEXPECTED_CASE_MESSAGE
                );
            });

            it('when error is boolean', () => {
                assert(handleError(BOOLEAN)?.debug === UNEXPECTED_CASE_MESSAGE);
            });

            it('when error is integer', () => {
                assert(handleError(INTEGER)?.debug === UNEXPECTED_CASE_MESSAGE);
            });

            it('when error is float', () => {
                assert(handleError(FLOAT)?.debug === UNEXPECTED_CASE_MESSAGE);
            });

            it('when error is bigint', () => {
                assert(handleError(BIGINT)?.debug === UNEXPECTED_CASE_MESSAGE);
            });

            it('when error is empty object', () => {
                assert(
                    handleError(EMPTY_OBJECT)?.debug === UNEXPECTED_CASE_MESSAGE
                );
            });

            it('when error is object with message field', () => {
                assert(
                    handleError(OBJECT_WITH_MESSAGE)?.debug ===
                        UNEXPECTED_CASE_MESSAGE
                );
            });
        });
    });

    describe('should return ApiError', () => {
        it('when error is ApiError', () => {
            assert(handleError(new ApiError()) instanceof ApiError);
        });

        it('when error is Error', () => {
            assert(handleError(new Error()) instanceof ApiError);
        });
    });
});
