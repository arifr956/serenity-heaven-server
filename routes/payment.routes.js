const express = require('express');
const router = express.Router();
const PaymentModel = require('../models/payment.model');

router.get('/payments/:email', verifyToken, async (req, res) => {
    const query = { email: req.params.email }
    if (req.params.email !== req.decoded.email) {
      return res.status(403).send({ message: 'forbidden access' });
    }
    const result = await PaymentModel.find(query).toArray();
    res.send(result);
  })



  router.post('/payments', async (req, res) => {
    const paymentItem = req.body;
    const result = await PaymentModel.insertOne(paymentItem);
    res.send(result);
  });


module.exports = router;
