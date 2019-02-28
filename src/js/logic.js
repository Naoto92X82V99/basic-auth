const path = require('path')

// レスポンスヘッダのContent-Typeを返す
const getContentType = _url => {
    // 拡張子を取得
    const type = path.extname(_url)

    switch (type) {
        case '.html': return 'text/html'
        case '.jpg': return 'image/jpeg'
        case '.jpeg': return 'image/jpeg'
        case '.png': return 'image/png'
        case '.gif': return 'image/gif'
        default: return 'text/plain'
    }
}

// ファイルのパスを返す
const getPath = _url => {
    const type = path.extname(_url)

    // index.htmlを読み込む場合
    if (_url.endsWith('/')) return 'views' + _url + 'index.html' 

    // 画像ファイルの場合
    if (isImage(type)) return 'img' + _url

    // htmlファイルの場合
    if (type === '.html') return 'views' + _url

    // その他の場合
    return ''
}

// 画像ファイルかどうかを判定
const isImage = _type => {
    const types = ['.jpg', 'jpeg', '.png', '.gif']
    return types.includes(_type)
}

// base64 encoding
const base64 = str => Buffer.from(str).toString('base64')


module.exports = {
    getContentType,
    getPath,
    base64
}