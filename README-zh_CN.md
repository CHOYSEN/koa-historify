# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫

[![NPM version][npm-img]][npm-url]
[![License][license-image]][license-url]

正确设置 HTML5 History-API 的 Koa2 中间件 

[English](https://github.com/CHOYSEN/koa-historify/blob/master/README.md) | 中文

## 为什么
有别于目前依赖 `koa-static` fallback 的解决方案，本项目使用“默认路由”的思想来将未处理的 GET 请求重定向到 `index.html` 上。这种解决方案带来了更少的配置项和更直观的使用方式。

## 安装
```
npm install koa-historify --save
```
OR
```
yarn add koa-historify
```

## 使用
```js
const Koa = require('koa')
const koaHistorify = require('koa-historify')
const indexPath = path.join(__dirname, 'static/index.html' /* index.html filepath */)
new Koa()
  .use(koaHistorify(indexPath))
  .listen(80)
```

## 开源许可
[MIT](https://github.com/CHOYSEN/koa-historify/blob/master/LICENSE)

[npm-img]: https://img.shields.io/npm/v/koa-historify?style=flat-square
[npm-url]: https://npmjs.org/package/koa-historify
[license-image]: http://img.shields.io/npm/l/koa-historify?style=flat-square
[license-url]: LICENSE