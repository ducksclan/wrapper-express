import { Query as ParsedQs } from 'express-serve-static-core';
import * as Interfaces from '.';

/**
 * Request handler
 * @param Body type of `request.body` object
 * @param Locals type of `response.locals` object
 * @param Query type of `request.query` object
 * @param Returned returned type
 * @example
 * import { Middleware, Locals } from '@ducksclan/wrapper-express';
 *
 * interface Body {
 *     message: string;
 * }
 *
 * interface Query {
 *     to: string;
 * }
 *
 * interface MyCustomLocals extends Locals {
 *     user_id: string;
 * }
 *
 * const middleware: Middleware<
 *     Body,
 *     MyCustomLocals,
 *     Query,
 *     void
 * > = async (req, res, next) => {
 *     let result = await new AnyService({
 *         message: req.body.message,
 *         to: req.query.to,
 *         user_id: res.locals.user_id,
 *     }).doSomething();
 *
 *     res.json(result);
 * }
 */
export type Middleware<
    Body = any,
    Locals extends Interfaces.Locals = Interfaces.Locals,
    Query extends ParsedQs = ParsedQs,
    Returned = any
> = (
    request: Interfaces.Request<Body, Locals, Query>,
    response: Interfaces.Response<Locals>,
    next: Interfaces.NextFunction
) => Returned;
