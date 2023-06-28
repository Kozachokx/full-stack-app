const GLOBAL_PREFIX = 'api';

module.exports = {
  GLOBAL_PREFIX,
  ...require('./entity-fields'),
  ...require('./error-codes'),
  ...require('./error-messages'),
  ...require('./error-status'),
  ...require('./sort-types'),
};
