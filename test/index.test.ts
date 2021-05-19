import fs from 'fs'
import Koa from 'koa'
import path from 'path'
import Router from '@koa/router'
import supertest from 'supertest'
import koaHistorify from '../src'

const indexPath = path.join(__dirname, 'static/index.html')
const indexFile = fs.readFileSync(indexPath).toString()

describe('Test options:', () => {
  test('"filepath" must be a string', () => {
    expect(() => {
      koaHistorify(null)
    }).toThrow('filepath must be a string')
  })

  test('"options.logger" must be a function', () => {
    expect(() => {
      koaHistorify(indexPath, {
        logger: null
      })
    }).toThrow('options.logger must be a function')
  })

  it('should work with a logger', async () => {
    let called = false

    const server = new Koa()
      .use(koaHistorify(indexPath, {
        logger() {
          called = true
        }
      }))
      .listen()

    await supertest(server).get('/')
    expect(called).toBe(true)

    server.close()
  })

  it('should work when prepose mode', async () => {
    const content = 'ctx.body has been modified'
    const router = new Router()
      .get('/api', async (ctx, next) => {
        ctx.body = content
        await next()
      })

    const server = new Koa()
      .use(koaHistorify(indexPath, { prepose: true }))
      .use(router.routes())
      .listen()

    let res = await supertest(server).get('/').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(indexFile)

    res = await supertest(server).get('/api').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(content)

    server.close()
  })
})

describe('Test request methods:', () => {
  const server = new Koa()
    .use(koaHistorify(indexPath))
    .listen()

  it('should not historify when HTTP method is not GET', async () => {
    for (const method of ['post', 'put', 'delete', 'head', 'options']) {
      const res = await supertest(server)[method]('/').set('Accept', 'text/html')
      expect(res.status).toBe(404)
      expect(res.text).not.toBe(indexFile)
    }
  })

  it('should historify when HTTP request method is GET', async () => {
    const res = await supertest(server).get('/').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(indexFile)
  })

  server.close()
})

describe('Test request header field "Accept":', () => {
  const server = new Koa()
    .use(koaHistorify(indexPath))
    .listen()

  it('should not historify when HTTP request header field "Accept" does not include "text/html"', async () => {
    const res = await supertest(server).get('/')
    expect(res.status).toBe(404)
    expect(res.text).not.toBe(indexFile)
  })

  it('should historify when HTTP request header field "Accept" includes "text/html"', async () => {
    const res = await supertest(server).get('/').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(indexFile)
  })

  server.close()
})

describe('Test ctx.body or ctx.status has been modified:', () => {
  it("should not historify when ctx.status has been modified", async () => {
    const server = new Koa()
      .use(async (ctx, next) => {
        ctx.status = 204
        await next()
      })
      .use(koaHistorify(indexPath))
      .listen()

    const res = await supertest(server).get('/api').set('Accept', 'text/html')
    expect(res.status).toBe(204)
    expect(res.text).not.toBe(indexFile)

    server.close()
  })

  it("should not historify when ctx.body has been modified", async () => {
    const content = 'ctx.body has been modified'
    const router = new Router()
      .get('/api', async (ctx, next) => {
        ctx.body = content
        await next()
      })

    const server = new Koa()
      .use(router.routes())
      .use(koaHistorify(indexPath))
      .listen()

    const res = await supertest(server).get('/api').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(content)

    server.close()
  })
})

describe('Test non-existent routes:', () => {
  const server = new Koa()
    .use(koaHistorify(indexPath))
    .listen()

  it('should historify when request has not been handled', async () => {
    for (let i = 0; i < 5; i++) {
      const randomPath = Math.random().toString(36).replace('0.', '/')
      const res = await supertest(server).get(randomPath).set('Accept', 'text/html')
      expect(res.status).toBe(200)
      expect(res.text).toBe(indexFile)
    }
  })

  server.close()
})

describe('Test filepath:', () => {
  const server = new Koa()
    .use(koaHistorify('no'))
    .use(ctx => {
      ctx.body = 'content'
    })
    .listen()

  it('should call next() when filepath is wrong', async () => {
    const res = await supertest(server).get('/').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe('content')
  })

  server.close()
})