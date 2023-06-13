const mongoose = require('mongoose');
const { CONFIG } = require('../config');
const models = require('./models');

mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
});

let dbConnection = null;

const connectDB = async () => {
  try {
    if (dbConnection) return dbConnection;

    const newConnection = await mongoose.connect(CONFIG.DB_HOST);
    dbConnection = newConnection;
    console.log('DataBase successfully connected.');
  } catch (error) {
    console.log('Error in DB connection: ' + error);
    throw new Error('Connection problem with DataBase');
  }
};

module.exports = { connectDB, ...models };
