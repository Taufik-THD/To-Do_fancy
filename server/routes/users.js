const express = require('express');
const router = express.Router();
const { Login, Register } = require('../controllers/user_controller');

router.get('/', (req, res) => {
  console.log('getter');
})

router.post('/', Login)

router.post('/register', Register)

module.exports = router;
