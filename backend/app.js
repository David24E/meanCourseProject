const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// mongodb user password for david: oQvKdvBVA017869e

const app = express();

mongoose
  .connect(
    'mongodb+srv://david:oQvKdvBVA017869e@cluster0-unaya.mongodb.net/node-angular?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  // mongoose
  //   .connect(
  //     'mongodb+srv://david:oQvKdvBVA017869e@cluster0-unaya.mongodb.net/test?retryWrites=true&w=majority',
  //     { useNewUrlParser: true }
  //   )
  .then(() => {
    console.log('Connected to mongo Database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
