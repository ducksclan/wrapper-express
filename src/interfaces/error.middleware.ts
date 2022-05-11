import { Query as ParsedQs } from 'express-serve-static-core';
import * as Interfaces from '.';

/**
 * Error handler of request handler
 * @param Body type of `request.body` object
 * @param Locals type of `response.locals` object
 * @param Query type of `request.query` object
 * @param Returned returned type
 * @example
 * import { ErrorMiddleware } from '@ducksclan/wrapper-express';
 *
 * const handleError: ErrorMiddleware<any, any, any, void> = (
 *     async (err, req, res, next) => {
 *         let result = await new ErrorHandleService().doSomething();
 *
 *         res.sendStatus(result.code).json(result);
 *     }
 * );
 */
export type ErrorMiddleware<
    Body = any,
    Locals extends Interfaces.Locals = Interfaces.Locals,
    Query extends ParsedQs = ParsedQs,
    Returned = any
> = (
    err: any,
    request: Interfaces.Request<Body, Locals, Query>,
    response: Interfaces.Response<Locals>,
    next: Interfaces.NextFunction
) => Returned;
