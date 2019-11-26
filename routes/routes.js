const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

// Default API Response
router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API is working'
  })
});

router.route('/register')
  .post(UserController.create)

router.route('/user/:id')
  .get(UserController.view);

module.exports = router;
