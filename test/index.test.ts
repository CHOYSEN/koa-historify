import fs from 'fs'
import Koa from 'koa'
import path from 'path'
import Router from '@koa/router'
import supertest from 'supertest'
import koaHistorify from '../src'

let server = null
const indexPath = path.join(__dirname, 'static/index.html')
const indexFile = fs.readFileSync(indexPath).toString()

describe('Test request methods:', () => {
  server = new Koa()
    .use(koaHistorify(indexPath))
    .listen()

  it('should not historify when HTTP method is not GET', () => {
    const methods = ['post', 'put', 'delete', 'head', 'options']
    methods.forEach(async method => {
      const res = await supertest(server)[method]('/').set('Accept', 'text/html')
      expect(res.status).toBe(404)
      expect(res.text).not.toBe(indexFile)
    })
  })

  it('should historify when HTTP request method is GET', async () => {
    const res = await supertest(server).get('/').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(indexFile)
  })
})

describe('Test request header field "Accept":', () => {
  server.close()
  server = new Koa()
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
})

describe('Test ctx.body or ctx.status has been modified:', () => {
  it("should not historify when ctx.status has been modified", async () => {
    server.close()
    server = new Koa()
      .use(async (ctx, next) => {
        ctx.status = 204
        await next()
      })
      .use(koaHistorify(indexPath))
      .listen()

    const res = await supertest(server).get('/api').set('Accept', 'text/html')
    expect(res.status).toBe(204)
    expect(res.text).not.toBe(indexFile)
  })

  it("should not historify when ctx.body having content", async () => {
    const content = 'ctx.body has been modified'
    const router = new Router()
      .get('/api', async (ctx, next) => {
        ctx.body = content
        await next()
      })

    server.close()
    server = new Koa()
      .use(router.routes())
      .use(koaHistorify(indexPath))
      .listen()

    const res = await supertest(server).get('/api').set('Accept', 'text/html')
    expect(res.status).toBe(200)
    expect(res.text).toBe(content)
  })
})

describe('Test non-existent routes:', () => {
  server.close()
  server = new Koa()
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
})

afterAll(() => server.close())