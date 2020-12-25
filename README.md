# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫
HTML5 history middleware for koa2 

English | [中文](https://github.com/CHOYSEN/koa-historify/blob/master/README-zh_CN.md)

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
const indexPath = path.join(__dirname, 'static/index.html' /* index.html filepath */)
new Koa()
  .use(koaHistorify(indexPath))
  .listen(80)
```