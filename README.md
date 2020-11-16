# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫
HTML5 history middleware for koa2 

English | [中文](./README-zh_CN.md)

## Usage
Install
```
npm install koa-historify --save
```

Import
```js
const koaHistorify = require('koa-historify')
```

Use
```js
// ...
const filepath = "/static/index.html"
new Koa()
  .use(router.routes())
  .use(koaHistorify(filepath, { root: __dirname }))
  .listen(9999)
```