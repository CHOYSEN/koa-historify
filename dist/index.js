"use strict";
const send = require("koa-send");
const Router = require("@koa/router");
function historify(options = {}) {
    if (options.root && typeof options.root !== "string") {
        throw new TypeError(`${options.root} is not a string`);
    }
    if (options.filePath && typeof options.filePath !== "string") {
        throw new TypeError(`${options.filePath} is not a string`);
    }
    options.root = options.root || process.cwd();
    options.filePath = options.filePath || "index.html";
    const router = new Router();
    router.get("(.*)", async (ctx) => await send(ctx, options.filePath, { root: options.root }));
    return router.routes();
}
module.exports = historify;
