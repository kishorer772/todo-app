// const { default: mongoose } = require('mongoose');

const { mongoose } = require('../config/db');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  completed: {
    type: String,
    require: true,
  },
  created: String,
  updated: String,
});

const todo = new mongoose.model('Todo', todoSchema);

module.exports = todo;
