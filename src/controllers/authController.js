const express = require('express');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    if(await Users.findOne({ email })){
      return res.status(400).json({error: 'Usuário ja existe.'});
    }
    const user = await Users.create(req.body)
    user.password = undefined;
    return res.json({user, token: generateToken({_id:user._id})}) 
  } catch (error) {
    return res.status(422).json({ error })
  }
})

router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select('+password');
    if (!user) res.status(400).json({error: 'User not found!'});
    if (!await bcrypt.compare(password, user.password)) {
      res.status(400).json({error:'E-mail or Password is invalid.'})
    }
    user.password = undefined;

    return res.status(200).json({user, token: generateToken({_id:user._id})});
  } catch (err) {
    return res.status(400).json({ msg: err});
  }
});


module.exports = app => app.use('/auth', router);