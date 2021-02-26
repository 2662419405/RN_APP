// 加载http模块
var http = require('http')
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构
// 然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio')
var iconv = require('iconv-lite')

// 定义网络爬虫的目标地址(自行更改)
var url = 'http://www.613767.com/search?wd=%E4%BD%A0%E7%9A%84'

http
  .get(url, function (res) {
    var datas = []
    // 获取页面数据
    res.on('data', function (data) {
      datas.push(data)
    })
    // 数据获取结束
    res.on('end', function () {
      var chunk = iconv.decode(Buffer.concat(datas), 'utf-8')
      var htmlListData = filterHtmlList(chunk)
      printInfo(htmlListData)
    })
  })
  .on('error', function () {
    console.log('获取数据出错！')
  })

/* 过滤页面信息 */
function filterHtmlList(html) {
  if (html) {
    // 沿用JQuery风格，定义$
    var $ = cheerio.load(html,{decodeEntities:false})
    console.log($.html());
    // 根据id列表信息
    var diypage = $('#diypage')
    var htmlListData = []

    /* 列表信息遍历 */
    diypage.find('dd').each(function () {
      var dd = $(this)
      var list = []
      var title = dd.find('h1').text().trim()
      dd.find('a').each(function () {
        list.push($(this).text().trim())
      })
      htmlListData.push({
        title: title,
        kindList: list,
      })
    })
    return htmlListData
  } else {
    console.log('无数据传入！')
  }
}