import Express from 'express';
import React from 'react';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';

import http from 'http';
// import https from 'https';
import cookieParser from 'cookie-parser';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
console.log(config);

const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: false
});

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, './build/', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, './build')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

// Proxy for image & other resources
app.use('/asset', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
