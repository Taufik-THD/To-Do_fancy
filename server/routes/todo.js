const express = require('express');
const router = express.Router();
const { create_new_todo, readMyTodos } = require('../controllers/todo_controller');
const User = require('../models/user');
const Todo = require('../models/todo');
const { authentication } = require('../middlewares/authentication');
const jwt = require('jsonwebtoken');

router.get('/', authentication, readMyTodos)

router.post('/', (req, res) => {
  const token = req.body.token
  const decoded = jwt.decode(token.slice(1, token.length-1))

  Todo.find({status: true, UserId: decoded.id})
  .then(data => {
    console.log(data);
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(404).json('not found')
  })
});

router.post('/history', (req, res) => {
  const token = req.body.token
  const decoded = jwt.decode(token.slice(1, token.length-1))

  Todo.find({status: false, UserId: decoded.id})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(404).json('not found')
  })
});

router.post('/add', (req, res) => {
  const token = req.body.token
  const decoded = jwt.decode(token.slice(1, token.length-1))

  User.findOne({email: decoded.email})
  .then(data => {
    const newToDo = new Todo({
      activity: req.body.activity,
      status: true,
      UserId: data._id
    })

    Todo.create(newToDo, function(err, success){

      if (err) {
        res.status(404).json('failed add todo')
      } else {
        res.status(201).json('success add todo')
      }

    })

  })

})

router.put('/', (req, res) => {
  Todo.findOneAndUpdate({ _id: req.body.id }, {status: false})
  .then(data => {
    res.status(200).json('success update data')
  })
  .catch(err => {
    res.status(404).json('failed update data')
  })
})

router.delete('/:id', (req, res) => {

  Todo.deleteOne({ _id: req.params.id })
  .then(success => {
    res.status(200).json('success delete data')
  })
  .catch(err => {
    res.status(404).json('failed delete data')
  })

})

router.post('/today', (req, res) => {
  // ToDo.find({})
})

module.exports = router;
