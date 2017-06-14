/**
 * Created by zenymax on 2/28/17.
 */
import express from 'express'
import open from 'open'
import path from 'path'
import compression from 'compression'
require('../global_config')
/* eslint-disable no-console */
const port = process.env.PORT || global.server_port
const app = express()

app.use(compression())
app.use(express.static('dist'))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, function (err) {
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
