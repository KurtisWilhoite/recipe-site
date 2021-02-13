const fetch = require("node-fetch");
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/v1/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.get('/api/v1/random', (req, res) => {
    fetch('https://api.spoonacular.com/recipes/random?apiKey=239de55f52314760b32a81572bf45ee6', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => { throw err });
    
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
