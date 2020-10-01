import { Middleware } from "koa"
import * as send from "koa-send"
import * as Router from "@koa/router"

interface IOptions {
  root?: string,
  filePath?: string
}

function historify(options: IOptions = {}): Middleware {
  if (options.root && typeof options.root !== "string") {
    throw new TypeError(`${options.root} is not a string`)
  }
  if (options.filePath && typeof options.filePath !== "string") {
    throw new TypeError(`${options.filePath} is not a string`)
  }

  options.root = options.root || process.cwd()
  options.filePath = options.filePath || "index.html"

  const router: Router = new Router()
  router.get("(.*)", async ctx => await send(ctx, options.filePath, { root: options.root }))
  return router.routes()
}

export = historify