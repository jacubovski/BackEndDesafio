const mongoose = require('mongoose');
const Estados = require('./estados');

const CidadesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId()
  },
  nome: {
    type: String,
    require: true,
  },
  estadoId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'estados',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Cidades = mongoose.model('Cidades', CidadesSchema);

module.exports = Cidades;