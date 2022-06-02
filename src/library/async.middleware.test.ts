import { Request, Response, NextFunction } from '../interfaces';
import { describe } from 'mocha';
import asyncMiddleware from './async.middleware';
import assert from 'assert';

const stubRequset = {} as Request;
const stubResponse = {} as Response;

describe('asyncMiddleware', () => {
    describe('should receive error in next function', () => {
        const ERROR = new Error('test message');
        const stubNext = ((error: Error) => {
            assert(error === ERROR);
        }) as NextFunction;

        it('when error is thrown in passed async function', () => {
            const passedArgument = async () => {
                throw ERROR;
            };

            asyncMiddleware(passedArgument)(
                stubRequset,
                stubResponse,
                stubNext
            );
        });

        it('when error is thrown in passed function', () => {
            const passedArgument = () => {
                throw ERROR;
            };

            asyncMiddleware(passedArgument)(
                stubRequset,
                stubResponse,
                stubNext
            );
        });

        it('when error is passed to next function', () => {
            const passedArgument = (req, res, next) => {
                next(ERROR);
            };

            asyncMiddleware(passedArgument)(
                stubRequset,
                stubResponse,
                stubNext
            );
        });
    });
});
