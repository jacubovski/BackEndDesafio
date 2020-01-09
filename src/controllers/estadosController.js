const express = require('express');
const Estados = require('../models/estados');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async(req, res) => {
  try {
    const estados = await Estados.find();
    return res.status(200).json({ estados })
  } catch (err) {
    return res.status(400).json({ msg: err});
  }
});

router.get('/:id', async(req, res) => {
  try {
    const { id: _id } = req.query;
    const estado = await Estados.findById({_id});
    return res.status(200).json({estado})
  } catch (err) {
    return res.status(400).json({ msg: err});
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, abreviacao } = req.body;
    if(abreviacao.length < 2 || abreviacao.length > 2 || !abreviacao) {
      return res.status(422).json({msg: 'Abreviação deve conter 2 caracteres.'})
    }
    if(nome.length < 4 || nome.length > 22 || !nome) {
      return res.status(422).json({msg: 'Nome deve conter de 5 a 22 caracteres.'})
    }
    const newState = {
      _id: new mongoose.Types.ObjectId(),
      nome,
      abreviacao,
      createdAt: Date.now(),
    }
    const estados = await Estados.create(newState)
    return res.status(200).send({ estados })
  } catch (err) {
    return res.status(400).json({ msg: err});
  }
});

router.put('/', async(req, res) => {
  try {
    const { nome, abreviacao, _id } = req.body;
    const updatedAt = Date.now();
    await Estados.findOneAndUpdate({_id}, { nome, abreviacao, updatedAt },
       err => err && res.status(400).json({ msg: err.message})); 
    const estado = await Estados.findById({ _id });
    return res.status(200).json({estado})
  } catch (err) {
    return res.status(400).json({ msg: err.message});
  }
})

router.delete('/', async(req, res) => {
   try {
    const { _id } = req.query;
    const remove = await Estados.deleteOne({_id }, function (err, rem){
      if (err) return res.status(400).json({msg: err.message})
    });
    return res.status(200).json({remove})
  } catch (error) {
    return res.status(400).json({msg: error.message})
  }
})

module.exports = app => app.use('/estados', router);