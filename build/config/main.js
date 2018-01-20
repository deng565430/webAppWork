'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = {
  "port": 80
};

let config = {
  "viewDir": _path2.default.join(__dirname, '..', 'views'),
  "staticDir": _path2.default.join(__dirname, '..', 'assets'),
  "env": process.env.NODE_ENV
};

if (config.env === 'production') {
  config = _lodash2.default.extend(config, server);
} else {
  config = _lodash2.default.extend(config, _local2.default);
}

exports.default = config;