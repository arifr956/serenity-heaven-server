const express = require('express');
const router = express.Router();
const AgreementModel = require('../models/agreement.model');


router.get('/agreements', async (req, res) => {

    const result = await AgreementModel.find().toArray();
    res.send(result);
  })



  router.post('/agreements', async (req, res) => {
    const agreementItem = req.body;
    const result = await AgreementModel.insertOne(agreementItem);
    res.send(result);
  });

  router.patch('/agreements/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        status: item.status,
        acceptDate: item.acceptDate
      }
    }
    const result = await AgreementModel.updateOne(filter, updatedDoc);
    res.send(result);
  })





module.exports = router;