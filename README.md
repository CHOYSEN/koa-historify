# koa-historify
Koa middleware for HTML5 history.

## Usage
Install
```
npm i -S koa-historify
```

Import
```js
const koaHistorify = require('koa-historify')
```

Use
```js
// ...
new Koa()
  .use(router.routes())
  .use(koaHistorify({
    root: __dirname,
    filePath: "/static/index.html" // .html file path
  }))
  .listen(9999)
```