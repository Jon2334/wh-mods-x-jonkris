import express from 'express'
import { createServer } from 'http'
import { toBuffer } from 'qrcode'

function connect(conn, PORT) {
    // Gunakan PORT dari Heroku environment variable
    const actualPort = process.env.PORT || PORT || 5000
    
    let app = global.app = express()
    console.log(app)
    let server = global.server = createServer(app)
    let _qr = 'invalid'

    conn.ev.on('connection.update', function appQR({ qr }) {
        if (qr) _qr = qr
    })

    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await toBuffer(_qr))
    })

    server.listen(actualPort, () => {
        console.log('App listened on port', actualPort)
        if (opts['keepalive']) keepAlive()
    })
}

export default connect