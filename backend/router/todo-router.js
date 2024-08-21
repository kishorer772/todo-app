const express = require('express');
const todoRouter = express.Router();
const Todo = require('../modal/todo');
// const db = require('../config/db');

todoRouter.get('/', async (req, res) => {
  const todos = await Todo.find();
  return res.json(todos);
});

todoRouter.post('/', async (req, res) => {
  console.log('todoRouter.post ~ req:', req.body);
  const todo = new Todo(req.body);
  try {
    await todo.save();
  } catch (error) {
    return res.status(400).json({ error: 'bad request' });
  }
  return res.status(200).json({ ...req.body });
});
todoRouter.put('/', (req, res) => {
  const { title } = req.body;
  //TODO UPDATE TO MONGO
  return res.status(200);
});
todoRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('todoRouter.delete ~ id:', id);
  //TODO Delete TO MONGO
  return res.status(200);
});

module.exports = todoRouter;
