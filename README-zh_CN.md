# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫
正确设置 HTML5 History API 的 Koa2 中间件 

[English](./README.md) | 中文

## 使用
安装
```
npm install koa-historify --save
```

引入
```js
const koaHistorify = require('koa-historify')
```

使用中间件
```js
// ...
const filepath = "/static/index.html"
new Koa()
  .use(router.routes())
  .use(koaHistorify(filepath, { root: __dirname }))
  .listen(9999)
```