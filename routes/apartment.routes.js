const express = require('express');
const router = express.Router();
const ApartmentModel = require('../models/apartment.model');

router.get('/apartments', async (req, res) => {
    const result = await ApartmentModel.find().toArray();
    res.send(result);
  })


  router.get('/apartments/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await ApartmentModel.findOne(query);
    res.send(result);
  })

  router.patch('/apartments/apartment/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        status: item.status,
        userEmail: item.userEmail
      }
    }
    const result = await ApartmentModel.updateOne(filter, updatedDoc);
    res.send(result);
  })


module.exports = router;