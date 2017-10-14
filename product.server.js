var express = require('express')
var config = require('./config/index')
// 设置端口
var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()
// 获取数据
router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})

app.use(router)

var appData = require('./data.json')
// 定义数据mock接口
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
// 定义路由
var apiRoutes = express.Router()
// 读取数据
apiRoutes.get('/seller', function (req, res) {
  res.json({
    error: 0,
    data: seller
  })
})

apiRoutes.get('/goods', function (req, res) {
  res.json({
    error: 0,
    data: goods
  })
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    error: 0,
    data: ratings
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

var uri = 'http:localhost:' + port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Listening at ' + uri + '\n')
  }
})
