const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRouter = require('./router/todo-router');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/todo', todoRouter);

app.get('/', (req, res) => {
  return res.json({ message: 'hello' });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/todo')
  .then(() => {
    console.log('DB Running');
    app.listen(5000, () => console.log('Server Running'));
  })
  .catch((error) => console.error(error));
