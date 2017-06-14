/**
 * Created by zenymax on 2/10/17.
 */
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import config from '../webpack.config.dev'
import compression from 'compression'
require('../global_config')

/* eslint-disable no-console */
const port = process.env.PORT || global.server_port
const app = express()
const compiler = webpack(config)

app.use(compression())
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static(path.join(__dirname, '../public/')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("===> 🌎 CMS server listening on port %s. Open up " + global.base_url + ":%s/ in your browser.", port, port)
  }
})

process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit(1);
})
