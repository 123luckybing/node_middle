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
  root: path.resolve(__dirname,'template'), // 去哪个文件夹下找ejs模板
  layout: false, // ejs 会自动添加一层文件名 false禁止添加
  viewExt: 'ejs', // 模板扩展
  cache: false, // 缓存 上线的时候有缓存会减轻服务器压力
  debug: false
})
app.use(bodyParser())
app.use(static('./static')) // 识别文件夹
app.use(router.routes());


