const Koa = require('koa')
const render = require('koa-ejs')
const path = require('path')
const proxy = require('koa-proxies')

const app = new Koa()

render(app, {
  root: path.join(__dirname),
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: false
})

app.use(proxy('/test2', {
  target: 'http://test2.airwallex.com',    
  changeOrigin: true,
  logs: true
}))

app.use(proxy('/static', {
  target: 'http://test2.airwallex.com',    
  changeOrigin: true,
  logs: true
}))
 
app.use(async function (ctx) {
  await ctx.render('index')
})
 
app.listen(7001)