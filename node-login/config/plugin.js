'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // session: true,
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};
