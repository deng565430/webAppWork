'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndexController = require('./IndexController');

var _IndexController2 = _interopRequireDefault(_IndexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = new _IndexController2.default();
const InitController = {
  getAllrouters(app, router) {
    app.use(router(_ => {
      _.get('/', indexController.index());
    }));
  }
};

exports.default = InitController;