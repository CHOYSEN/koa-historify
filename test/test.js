const { join } = require("path")
const supertest = require("supertest")
const { readFileSync } = require("fs")
const { routes, server } = require("../example")

describe("Test existing routes:", () => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    test(`${route.method.toUpperCase()} ${route.path}`, async () => {
      const res = await supertest(server)[route.method](route.path)
      expect(res.text).toBe(`${route.method.toUpperCase()} ${route.path}`)
    })
  }
})

describe("Test non-existent routes:", () => {
  const indexFile = readFileSync(join(__dirname, "../example/static/index.html")).toString()
  for (let i = 0; i < 4; i++) {
    const randomPath = Math.random().toString(36).replace("0.", "/")
    test(`GET ${randomPath}`, async () => {
      const res = await supertest(server).get(randomPath)
      expect(res.text).toBe(indexFile)
    })
  }
})

afterAll(() => server.close())