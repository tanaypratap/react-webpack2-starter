const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const path = require('path')
const proxy = require('proxy-middleware')
const httpProxy = require('http-proxy-middleware')
const url = require('url')
const request = require('request')
const bodyParser = require('body-parser');

const server = express()

const isProduction = process.env.NODE_ENV === 'production'
const isStaging = process.env.NODE_ENV === 'staging'

const portNumber = isStaging ? 8889 : 9998

const webpackPort = '9997'

server.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

if (isProduction || isStaging) {
  server.use('/', expressStaticGzip(path.join(__dirname, '/dist'), { maxAge: '30d' }));
} else {
  server.use('/*main.[a-f0-9]*.js', proxy(url.parse(`http://localhost:${webpackPort}/main.js`)))
  server.use('/*vendor.[a-f0-9]*.js', proxy(url.parse(`http://localhost:${webpackPort}/vendor.js`)))
  server.use('/*manifest.[a-f0-9]*.js', proxy(url.parse(`http://localhost:${webpackPort}/manifest.js`)))
  server.use('/', expressStaticGzip(path.join(__dirname, '/dist'), { maxAge: '30d' }))
}

// To be enabled after the proxy, otherwise error
server.use(bodyParser.json());

server.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

server.listen(portNumber, 'localhost', () => {
  console.log('Server is listening at....', portNumber)
})
