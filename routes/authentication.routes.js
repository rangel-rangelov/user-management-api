const express = require('express');

const router = express.Router();

// Default API Response
router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'API is working'
  })
});

module.exports = router;
