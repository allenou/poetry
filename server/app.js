const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa();


app.use(static(
    path.join(__dirname, '/')
))

app.listen(3000, () => {
    console.log('starting at port 3000')
})
