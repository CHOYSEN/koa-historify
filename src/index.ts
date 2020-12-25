import path from 'path'
import koaSend from 'koa-send'
import type { Context, Middleware } from 'koa'

interface Options {
  logger?: (msg: string, ...params) => void
}

function koaHistorify(filepath: string, options: Options = {}): Middleware {
  if (!isEqualType(filepath, 'string')) {
    throw new TypeError('filepath must be a string')
  }

  const logger = options.logger ?? (() => { /* do nothing */ })
  if (!isEqualType(logger, 'function')) {
    throw new TypeError('options.logger must be a function')
  }

  const parsedPath = path.parse(filepath)
  return async function historify(ctx: Context, next) {
    if (ctx.method !== 'GET') {
      logger(`Not historify ${ctx.url} [not GET]`)
      return await next()
    }

    if (!ctx.headers?.accept?.includes?.('text/html')) {
      logger(`Not historify ${ctx.url} [not accept html]`)
      return await next()
    }

    if (ctx.status !== 404 || !isEqualType(ctx.body, 'undefined')) {
      logger(`Not historify ${ctx.url} [was handled by other middleware]`)
      return await next()
    }

    try {
      const resolvedPath: string = await koaSend(ctx, parsedPath.base, {
        root: parsedPath.dir
      })
      logger(`Historify from ${ctx.url} to ${resolvedPath} successfully`)
    } catch (err) {
      logger(`Not historify ${ctx.url} [${err.toString()}]`)
      await next()
    }
  }
}

function isEqualType(object, type: string): boolean {
  const typeString: string = Object.prototype.toString.call(object)
  return type.toLowerCase() === typeString.slice(8, -1).toLowerCase()
}

export = koaHistorify