const dotenv = require('dotenv');

dotenv.config();

const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  PORT: parseInt(process.env.PORT) || 3000,
  app_name: process.env.APP_NAME || 'default-app',
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  SALT: process.env.SALT,

  DB_HOST: process.env.DB_HOST,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

const notDefinedEnvs = {};

for(const key in CONFIG) {

  if (!CONFIG[`${key}`]) {
    notDefinedEnvs[`${key}`] = CONFIG[`${key}`];
  }
}

if (Object.keys(notDefinedEnvs).length > 0) {
  console.error('All envs should be defined!');
  console.error(notDefinedEnvs);

  throw new Error('Not all ENVs are defined! ' + `Not defined envs: ${Object.keys(notDefinedEnvs).map(env => `'${env}'`)}.`);
}

Object.freeze(CONFIG);

module.exports = { CONFIG: CONFIG };
