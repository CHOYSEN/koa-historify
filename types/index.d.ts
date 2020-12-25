import type { Middleware } from 'koa';
interface Options {
    logger?: (msg: string, ...params: any[]) => void;
}
declare function koaHistorify(filepath: string, options?: Options): Middleware;
export = koaHistorify;
