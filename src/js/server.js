const http = require('http')
const fs = require('fs')

const {
  username,
  password,
  realm,
  privateDir
} = require('./conf.js')

const { 
  getContentType,
  getPath,
  base64
} = require('./logic.js')

// 認証情報
const auth = `Basic ${base64(`${username}:${password}`)}`

const server = http.createServer((req, res) => {
  const { url = '' } = req
  const file = getPath(url)

  // ユーザ認証が必要な場合
  if (file.startsWith(privateDir)) {

    // Authorizationヘッダを取得
    const { headers: { authorization = '' } } = req

    // ユーザ認証が成功するまで、認証要求を返す
    if (auth !== authorization) {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`)
      res.end()
    }
  }

  // ユーザ認証が不要、または認証が成功した場合
  try {
    const data = fs.readFileSync(file)
    res.writeHead(200, { 'Content-Type': getContentType(file) })
    res.end(data)

  } catch (err) {

    console.log(err)  // デバッグ用

    switch (err.code) {
      case 'EISDIR':
        res.statusCode = 404
        return res.end()

      case 'ENOENT':
        res.statusCode = 404
        return res.end()

      default:
        res.statusCode = 500
        return res.end()
    }
  }
})

module.exports = server