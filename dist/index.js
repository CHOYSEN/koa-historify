"use strict";
const send = require("koa-send");
const assert = require("assert");
const Router = require("@koa/router");
function historify(filepath, options = {}) {
    assert(filepath, "filepath required");
    const router = new Router();
    router.get("(.*)", async (ctx) => await send(ctx, filepath, { root: options.root }));
    return router.routes();
}
module.exports = historify;
