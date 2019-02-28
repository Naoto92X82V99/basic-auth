const { port } = require('./js/conf.js')
const server = require('./js/server.js')

server.listen(port, () => console.log(`Listening at http://localhost:${port}`))
