const Router = require('koa-router')
const axios = require('axios') // axios在node中也可以适应

let router = new Router()

// 一极路由 /admin 在这里可以把路由理解成接口
router.get('/', async (ctx) => {
  await ctx.render('admin/index') // template 文件夹下的
})

router.post('/login', async (ctx) => {
  let { name, password } = ctx.request.body // post 数据在body里
  let result = await axios({
    url: '后端真正接口',
    method: 'post',
    params: {
      name,
      password
    }
  })
  console.log(result) // 此时的result 是后端返回的数据
  // 前端自己包装 如果接口不成功 通过code值判断问题，加上问题处理人
  // ctx.body 返回给前端
  if (result.code === 0) {
    ctx.body = Object.assign(result)
  } else if (result.code === 3) {
    ctx.body = Object.assign(result, { person: 'a'})
  } else if (result.code === 4) {
    ctx.body = Object.assign(result, { person: 'b'})
  } else {
    ctx.body = Object.assign(result, { person: 'c'})
  }
})

module.exports = router.routes()