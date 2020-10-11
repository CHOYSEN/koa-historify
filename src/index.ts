import { Middleware } from "koa"
import * as send from "koa-send"
import * as assert from "assert"
import * as Router from "@koa/router"

interface IOptions {
  root?: string
}

function historify(filepath: string, options: IOptions = {}): Middleware {
  assert(filepath, "filepath required")

  const router = new Router()
  router.get("(.*)", async ctx => await send(ctx, filepath, { root: options.root }))
  return router.routes()
}

export = historify