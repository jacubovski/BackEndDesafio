const express = require('express');
const Cidades = require('../models/cidades');
const Estados = require('../models/estados');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async(req, res) => {
  try {
    const cidades = await Cidades.find().populate('estadoId');
    return res.status(200).json({cidades})
  } catch (err) {
    return res.status(400).json({ error: err});
  }
});

router.get('/:id', async(req, res) => {
  try {
    const { id: _id } = req.params;
    const cidade = await Cidades.findById({_id});
    return res.status(200).json({ cidade })
  } catch (err) {
    return res.status(400).send({ error: err});
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, estadoId } = req.body;
    const newCity = {
      _id: new mongoose.Types.ObjectId(),
      nome,
      estadoId,
      createdAt: Date.now(),
      updateddAt: Date.now(),
    }
    const { _id } = await Cidades.create(newCity);
    const cidade = await Cidades.findById({ _id }).populate('estadoId');
    return res.status(200).json({ cidade })
  } catch (err) {
    return res.status(400).json({ error: err});
  }
});

router.put('/', async(req, res) => {
  try {
    const { nome, estadoId, _id } = req.body;
    const updatedAt = Date.now();
    const { _id: id } = await Cidades.findOneAndUpdate({_id}, { nome, estadoId, updatedAt},
      function (err, cidade) {
        if (err) throw new Error("Erro ao Atualizar.")
      }
    ); 
    const cidade = await Cidades.findById({ _id: id }).populate('estadoId');
    return res.status(200).json({ cidade })
  } catch (err) {
    return res.status(400).json({ error: err.message});
  }
})

router.delete('/', async(req, res) => {
   try {
    const { _id } = req.query;
    await Cidades.findOneAndDelete({ _id }, function (err, cidade) {
      if (err) throw new Error("Erro ao Deletar.")
      return res.status(200).json({ cidade })
    })
  } catch (error) {
    return res.status(400).json({error})
  }
})

module.exports = app => app.use('/cidades', router);