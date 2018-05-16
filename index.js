const go = require('now-go')

const config = {
  '*': (req) => {
    switch (req.headers.host) {
      case 'amio.us':
        return 'https://amio.cn' + req.url
        break
      case 'blog.amio.us':
        return 'https://blog.amio.cn' + req.url
        break
    }
  }
}

go(config)
