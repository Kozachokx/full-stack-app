const { GLOBAL_PREFIX } = require('../constants/index.js');

const createRoutePath = (str) => {
  return `/${GLOBAL_PREFIX}${str[0] === '/' ? str : '/' + str}`;
};

module.exports = { createRoutePath };
