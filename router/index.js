var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var router = express.Router();
const FRONT_END = "http://localhost:3000"

router.use('/oauth/google', require('./oauth/google'));
router.use('/api', require('./api'));
router.use('/',createProxyMiddleware({ target: FRONT_END, changeOrigin: true, headers: {referer: FRONT_END}}));

module.exports = router;