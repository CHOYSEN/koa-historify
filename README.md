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
// ...
const koaHistorify = require('koa-historify')
const indexPath = path.join(__dirname, 'static/index.html' /* index.html filepath */)

const app = new Koa()
// ...
// ensure koa-historify is used after other middleware, otherwise use the `prepost` mode
app.use(koaHistorify(indexPath)) 
app.listen(80)
```

## Options
### logger
You can provide a function that can log the information
```js
app.use(koaHistorify(indexPath, {
  logger: console.log.bind(console)
})) 
```

### prepose
It can be used before other middleware is used when prepose mode
```js
// ...
const staticPath = path.join(__dirname, 'static')
const indexPath = path.join(staticPath, 'index.html' /* index.html filepath */)

const app = new Koa()
app.use(koaHistorify(indexPath, {
  prepost: true
}))
app.use(koaStatic(staticPath))
app.use(router.routes())
// ...
app.listen(80)
```

## License
[MIT](https://github.com/CHOYSEN/koa-historify/blob/master/LICENSE)

[npm-img]: https://img.shields.io/npm/v/koa-historify?style=flat-square
[npm-url]: https://npmjs.org/package/koa-historify
[license-image]: http://img.shields.io/npm/l/koa-historify?style=flat-square
[license-url]: LICENSE