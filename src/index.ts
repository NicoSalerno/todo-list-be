import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/todoList')
  .then(_ => {
    console.log('Connected to db');
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch(err => {
    console.error(err);
  })
