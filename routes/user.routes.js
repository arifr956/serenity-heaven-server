const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  const result = await UserModel.find();
  res.send(result);
});

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  const result = await UserModel.find().toArray();
  res.send(result);
});


router.post('/user', async (req, res) => {
  const user = req.body;
  // insert email if user doesnt exists: 
  // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
  const query = { email: user.email }
  const existingUser = await UserModel.findOne(query);
  if (existingUser) {
    return res.send({ message: 'user already exists', insertedId: null })
  }
  const result = await userCollection.insertOne(user);
  res.send(result);
});

  //admin show
  router.get('/users/admin/:email', verifyToken, async (req, res) => {
    const email = req.params.email;

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'forbidden access' })
    }

    const query = { email: email };
    const user = await UserModel.findOne(query);
    let admin = false;
    if (user) {
      admin = user?.role === 'admin';
    }
    res.send({ admin });
  })


  router.post('/users', async (req, res) => {
    const user = req.body;
    // insert email if user doesnt exists: 
    // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
    const query = { email: user.email }
    const existingUser = await UserModel.findOne(query);
    if (existingUser) {
      return res.send({ message: 'user already exists', insertedId: null })
    }
    const result = await UserModel.insertOne(user);
    res.send(result);
  });

  //make admin
  // admin email: arif@gmail.com password: Arif12@

  router.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        role: 'admin'
      }
    }
    const result = await UserModel.updateOne(filter, updatedDoc);
    res.send(result);
  })

  //make member
  router.patch('/users/member/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        role: 'member'
      }
    }
    const result = await UserModel.updateOne(filter, updatedDoc);
    res.send(result);
  })

  //make member using email
  router.patch('/users/:email', verifyToken, verifyAdmin, async (req, res) => {
    const email = req.params.email;
    const filter = { email: email };
    const updatedDoc = {
      $set: {
        role: 'member'
      }
    }
    const result = await UserModel.updateOne(filter, updatedDoc);
    res.send(result);
  })


  //Remove member set to user
  router.patch('/users/user/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        role: 'user'
      }
    }
    const result = await UserModel.updateOne(filter, updatedDoc);
    res.send(result);
  })



  //member show
  router.get('/users/member/:email', verifyToken, async (req, res) => {
    const email = req.params.email;

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'forbidden access' })
    }

    const query = { email: email };
    const user = await UserModel.findOne(query);
    let member = false;
    if (user) {
      member = user?.role === 'member';
    }
    res.send({ member });
  })


  //delete user
  router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await UserModel.deleteOne(query);
    res.send(result);
  })



module.exports = router;
