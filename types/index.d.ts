import { Middleware } from "koa";
interface IOptions {
    root?: string;
}
declare function historify(filepath: string, options?: IOptions): Middleware;
export = historify;
