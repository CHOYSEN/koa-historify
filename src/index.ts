import path from 'path'
import koaSend from 'koa-send'
import type { Middleware } from 'koa'

interface Options {
  prepose?: boolean
  logger?: (msg: string, ...params) => void
}

function koaHistorify(filepath: string, options: Options = {}): Middleware {
  if (typeof filepath !== 'string') {
    throw new TypeError('filepath must be a string')
  }

  const {
    prepose = false,
    logger = () => { /* do nothing */ }
  } = options
  if (typeof logger !== 'function') {
    throw new TypeError('options.logger must be a function')
  }

  const { dir, base } = path.parse(filepath)
  return async function historify(ctx, next) {
    prepose && await next()
    if (ctx.method !== 'GET') {
      logger(`Not historify ${ctx.url} [not GET]`)
      !prepose && await next()
      return
    }

    if (!ctx.headers.accept?.includes?.('text/html')) {
      logger(`Not historify ${ctx.url} [not accept html]`)
      !prepose && await next()
      return
    }

    if (ctx.status !== 404 || ctx.body != null) {
      logger(`Not historify ${ctx.url} [was handled by other middleware]`)
      !prepose && await next()
      return
    }

    try {
      const resolvedPath = await koaSend(ctx, base, { root: dir })
      logger(`Historify from ${ctx.url} to ${resolvedPath} [successfully]`)
    } catch (err) {
      logger(`Not historify ${ctx.url} [${err.toString()}]`)
      !prepose && await next()
    }
  }
}

export = koaHistorify