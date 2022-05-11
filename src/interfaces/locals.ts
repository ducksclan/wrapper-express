/**
 * Template for `(response as WrapperExpress.Response).locals` object.
 * @example
 * import { Response, Locals } from '@ducksclan/wrapper-express';
 *
 * interface MyCustomLocals extends Locals {
 *     name: string;
 * }
 *
 * function getName(response: Response<MyCustomLocals>) {
 *     return response.locals.name;
 * }
 */
export interface Locals extends Record<string, any> {}
