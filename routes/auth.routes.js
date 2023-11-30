const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

router.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

// Other authentication routes go here

module.exports = router;