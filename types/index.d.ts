import type { Middleware } from 'koa'
interface Options {
  prepose?: boolean
  logger?: (msg: string) => void
}
declare function koaHistorify(filepath: string, options?: Options): Middleware
export = koaHistorify
