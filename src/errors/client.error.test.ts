import { describe, it } from 'mocha';
import ClientError from './client.error';
import ApiError from './api.error';
import assert from 'assert';

describe('ClientError', () => {
    describe('every single static method should retrun ApiError object', () => {
        it('#BadRequest()', () => {
            assert(ClientError.BadRequest() instanceof ApiError);
        });

        it('#Unauthorized()', () => {
            assert(ClientError.Unauthorized() instanceof ApiError);
        });

        it('#PaymentRequired()', () => {
            assert(ClientError.PaymentRequired() instanceof ApiError);
        });

        it('#Forbidden()', () => {
            assert(ClientError.Forbidden() instanceof ApiError);
        });

        it('#NotFound()', () => {
            assert(ClientError.NotFound() instanceof ApiError);
        });

        it('#Conflict()', () => {
            assert(ClientError.Conflict() instanceof ApiError);
        });

        it('#Gone()', () => {
            assert(ClientError.Gone() instanceof ApiError);
        });
    });
});
