const Koa = require('koa')
const Router = require('koa-router')
const ejs = require('koa-ejs')
const body = require('koa-better-body')
const convert = require('koa-convert')
const static = require('koa-static')
const path = require('path')
const bodyParser = require('koa-bodyparser')

let app = new Koa()
// node app.js
app.listen(3000, () => {
  console.log('service is  running 3000')
})

let router = new Router()
router.get('/', (ctx) => { ctx.body = 'home' }) // 不渲染ejs模板，返回内容
router.use('/admin', require('./router/admin')) // 引入路由js文件
// 渲染ejs模板配置
ejs(app, {
  root: path.resolve(__dirname,'template'), // ejs根目录
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})
app.use(bodyParser())
app.use(static('./static')) // 识别文件夹
app.use(router.routes());


