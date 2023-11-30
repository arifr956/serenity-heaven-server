const express = require('express');
const router = express.Router();
const CouponModel = require('../models/coupon.model');

router.get('/coupons', async (req, res) => {

  const result = await CouponModel.find().toArray();
  res.send(result);
})



//create coupon
router.post('/coupons', verifyToken, verifyAdmin, async (req, res) => {
  const couponItem = req.body;
  const result = await CouponModel.insertOne(couponItem);
  res.send(result);
});

//delete coupon
router.delete('/coupons/:id', verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await CouponModel.deleteOne(query);
  res.send(result);
})




module.exports = router;