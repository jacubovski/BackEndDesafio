const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: new mongoose.Types.ObjectId()
  },
  nome: {
    type: String,
    require: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { 
    type: String,
    required: true,
    select: false,
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

UsersSchema.pre('save', async function(next){
 const hash = await bcrypt.hash(this.password, 10);
 this.password = hash;
 next();
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;