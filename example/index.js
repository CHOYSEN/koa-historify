const Koa = require("koa")
const Router = require("@koa/router")
const koaHistorify = require("../dist")

const routes = [
  {
    path: "/get1",
    method: "get"
  },
  {
    path: "/get2",
    method: "get"
  },
  {
    path: "/post1",
    method: "post"
  },
  {
    path: "/post2",
    method: "post"
  }
]

const router = new Router()
routes.forEach(item => {
  const body = `${item.method.toUpperCase()} ${item.path}`
  router[item.method](item.path, ctx => ctx.body = body)
})

const server = new Koa()
  .use(router.routes())
  .use(koaHistorify("/static/index.html", { root: __dirname }))
  .listen(9999, () => console.log("\n  > http://localhost:9999\n"))

module.exports = {
  routes,
  server
}