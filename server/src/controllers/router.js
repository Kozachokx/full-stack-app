const glob = require('glob');
const path = require('path');
const { createRoutePath } = require('../helpers');

function createRouter(app) {	
  glob
    .sync('*/*.controller.js', { cwd: `${__dirname}/` })
    .map(filePath => path.normalize(filePath).replace(/\\/g, '/'))
    .sort((a, b) => (b.split('/').length > a.split('/').length ? 1 : -1))
    .forEach(async (otiginalPath) => {
      const routePath = path.dirname(otiginalPath.replace('controllers', ''));
      const pathWithPrefix = createRoutePath(routePath);
      const filePath = `./${otiginalPath}`;

      app.use(pathWithPrefix , require(filePath));
    });
}

module.exports = createRouter;
