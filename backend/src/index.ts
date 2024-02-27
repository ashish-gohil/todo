import { Hono } from 'hono'

const app = new Hono()

app.post('/signup', (c) => {
  return c.text('Hello Hono!')
})

app.get('/user', (c) => {
  return c.text('Hello Hono user!')
})

export default app
