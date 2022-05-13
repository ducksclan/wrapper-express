import { Query as ParsedQs } from 'express-serve-static-core';
import * as WrapperExpress from '../interfaces';

/**
 * Asynchronous request handler with automatic exception catching
 * @param middleware request handler
 * @returns middleware function
 */
export default function asyncMiddleware<
    Body = any,
    Locals extends WrapperExpress.Locals = WrapperExpress.Locals,
    Query extends ParsedQs = ParsedQs
>(
    middleware: WrapperExpress.Middleware<Body, Locals, Query>
): WrapperExpress.Middleware<Body, Locals, Query> {
    return async (request, response, next) => {
        try {
            await middleware(request, response, next);
        } catch (error) {
            next(error);
        }
    };
}
