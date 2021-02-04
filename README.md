# [koa-historify](https://github.com/CHOYSEN/koa-historify) 💫

[![NPM version][npm-img]][npm-url]
[![License][license-image]][license-url]

HTML5 History-API middleware for koa2 

English | [中文](https://github.com/CHOYSEN/koa-historify/blob/master/README-zh_CN.md)

## Why
Unlike the current solution that relies on `koa-static` fallback, this project uses the idea of "default routing" to redirect unprocessed GET requests to `index.html`. This solution results in fewer configuration items and a more intuitive way.

## Installation
```
npm install koa-historify --save
```
OR
```
yarn add koa-historify
```

## Usage
```js
const Koa = require('koa')
const koaHistorify = require('koa-historify')
const indexPath = path.join(__dirname, 'static/index.html' /* index.html filepath */)
new Koa()
  .use(koaHistorify(indexPath))
  .listen(80)
```

## License
[MIT](https://github.com/CHOYSEN/koa-historify/blob/master/LICENSE)

[npm-img]: https://img.shields.io/npm/v/koa-historify?style=flat-square
[npm-url]: https://npmjs.org/package/koa-historify
[license-image]: http://img.shields.io/npm/l/koa-historify?style=flat-square
[license-url]: LICENSE