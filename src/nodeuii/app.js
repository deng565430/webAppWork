import Koa from 'koa';
import router from 'koa-simple-router';
import render from 'koa-swig';
import save from 'koa-static';
import co from 'co';
import log4js from 'log4js';
import config from './config/main';
import InitController from './controllers/InitController';
import ErrorHandler from './middlewares/ErrorHandler';

const app = new Koa();

// 渲染模板
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}));

// 错误处理日志
log4js.configure({
  appenders: { ydlogs: { type: 'file', filename: './logs/yd.log' } },
  categories: { default: { appenders: ['ydlogs'], level: 'error' } }
});

// 记录日志
const logger = log4js.getLogger('ydlogs');

// 错误处理中间件
ErrorHandler.error(app, logger);

// 静态资源目录
app.use(save(config.staticDir));

// 路由
InitController.getAllrouters(app, router);

app.listen(config.port, () => {
  console.log(`server is start port is ${config.port}`)
})
