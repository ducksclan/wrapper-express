import * as express from 'express';
import * as Interfaces from '.';

/**
 * As same as `express.Response`
 * but with fewer type parameter.
 * @param Locals type of `response.locals` object
 * @example
 * import { Request, Response, Locals } from '@ducksclan/wrapper-express';
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
 * async function middleware(
 *     req: Request<Body, MyCustomLocals, Query>,
 *     res: Response<MyCustomLocals>
 * ) {
 *     let result = await new AnyService({
 *         message: req.body.message,
 *         to:      req.query.to,
 *         user_id: res.locals.user_id
 *     }).doSomething();
 *
 *     res.json(result);
 * }
 */
export interface Response<Locals extends Interfaces.Locals = Interfaces.Locals>
    extends express.Response<any, Locals> {}
