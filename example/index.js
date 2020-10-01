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
  router[item.method](item.path, ctx => ctx.body = `${item.method.toUpperCase()} ${item.path}`)
})

const server = new Koa()
  .use(router.routes())
  .use(koaHistorify({
    root: __dirname,
    filePath: "/static/index.html"
  }))
  .listen(9999)

module.exports = {
  routes,
  server
}