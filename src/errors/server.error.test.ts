import { describe, it } from 'mocha';
import ServerError from './server.error';
import ApiError from './api.error';
import assert from 'assert';

describe('ServerError', () => {
    describe('every single static method should retrun ApiError object', () => {
        it('#InternalServerError()', () => {
            assert(ServerError.InternalServerError() instanceof ApiError);
        });

        it('#NotImplemented()', () => {
            assert(ServerError.NotImplemented() instanceof ApiError);
        });

        it('#ServiceUnavailable()', () => {
            assert(ServerError.ServiceUnavailable() instanceof ApiError);
        });
    });
});
