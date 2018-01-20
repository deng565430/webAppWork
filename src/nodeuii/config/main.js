import _ from 'lodash';
import path from 'path';
import local from './local';

const server = {
  "port": 80
};

let config = {
  "viewDir": path.join(__dirname, '..', 'views'),
  "staticDir": path.join(__dirname, '..', 'assets'),
  "env": process.env.NODE_ENV
};

if (config.env === 'production') {
  config = _.extend(config, server)
} else {
  config = _.extend(config, local)
}

export default config;
