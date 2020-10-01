import { Middleware } from "koa";
interface IOptions {
    root?: string;
    filePath?: string;
}
declare function historify(options?: IOptions): Middleware;
export = historify;
