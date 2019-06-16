const go = require('now-go')

const config = {
  '*': (req) => {
    const { url } = req
    const { host } = req.headers
    console.log(host + url)

    switch (host) {
      case 'amio.us':
      case 'jins.io':
        return 'https://amio.cn' + url

      case 'blog.amio.us':
        return 'https://blog.amio.cn' + url

      case 'wuxi.sh':
      case 'x.now.sh':
        return cfgWuxi[url] || cfgWuxi['*']

      case 'a.now.sh':
      case 'jin.now.sh':
      case 'amio.now.sh':
        return cfgAmio[url] || cfgAmio['*']

      default:
        return `Yet another tinyurl service.`
    }
  }
}

const cfgAmio = {
  "/b": "https://blog.amio.cn",
  "/i": "https://www.instagram.com/amiocn",
  "/t": "https://twitter.com/amiocn",
  "/w": "https://weibo.com/amio",
  "/": "Amio's tinyurl service. b/i/t/w",
  "*": "What are you looking for?"
}

const cfgWuxi = {
  "/blog": "https://zhuanlan.zhihu.com/wu-xi",
  "/weibo": "http://weibo.com/wuxiwuxiwuxi",
  "/twitter": "https://twitter.com/xiluotonghua",
  "/ig": "https://www.instagram.com/_humptydumpty_",
  "*": "Xi's tinyurl service."
}

module.exports = go.createHandler(config)

if (require.main === module) {
  require('http').createServer(module.exports).listen(3000)
}
