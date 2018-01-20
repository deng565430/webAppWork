'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

var _InitController = require('./controllers/InitController');

var _InitController2 = _interopRequireDefault(_InitController);

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

// 渲染模板
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _main2.default.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}));

// 错误处理日志
_log4js2.default.configure({
  appenders: { ydlogs: { type: 'file', filename: './logs/yd.log' } },
  categories: { default: { appenders: ['ydlogs'], level: 'error' } }
});

// 记录日志
const logger = _log4js2.default.getLogger('ydlogs');

// 错误处理中间件
_ErrorHandler2.default.error(app, logger);

// 静态资源目录
app.use((0, _koaStatic2.default)(_main2.default.staticDir));

// 路由
_InitController2.default.getAllrouters(app, _koaSimpleRouter2.default);

app.listen(_main2.default.port, () => {
  console.log(`server is start port is ${_main2.default.port}`);
});