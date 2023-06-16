// const express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const createRouter = require('./controllers/router');
const { CONFIG } = require('./config');
const { connectDB } = require('./database');
const { notFoundHandler, errorMiddleware } = require('./middleware');

const app = express();

async function startServer() {

  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(morgan('common'));
  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  app.get('/', (req, res) => {
    res.status(200).send({
      status: 'Server is live',
      date: new Date().toISOString(),
    });
  });

  app.use(async (req,res,next) => {
    try {
      await connectDB();

      next(); 
    } catch (error) {
      next(error);
    }
  });

  createRouter(app);

  app.use(notFoundHandler);
  app.use(errorMiddleware);

  await connectDB();

  app.listen(CONFIG.PORT, () => {
    console.log(`Server is listening on port: ${CONFIG.PORT}`);
  });
}

module.exports = {startServer};

