# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫
正确设置 HTML5 History API 的 Koa2 中间件 

[English](https://github.com/CHOYSEN/koa-historify/blob/master/README.md) | 中文

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
const indexPath = path.join(__dirname, 'static/index.html' /* index.html filepath */)
new Koa()
  .use(koaHistorify(indexPath))
  .listen(80)
```