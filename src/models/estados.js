const mongoose = require('mongoose');

const EstadosSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId()
  },
  nome: {
    type: mongoose.Schema.Types.String,
    maxlength: 22,
    minlength: 4,
    require: true,
  },
  abreviacao: {
    type: mongoose.Schema.Types.String,
    maxlength: 2,
    minlength: 2,
    require: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  }
}, { timestamps: true });

const Estados = mongoose.model('estados', EstadosSchema);

module.exports = Estados;