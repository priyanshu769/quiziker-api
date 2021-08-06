const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Cannot create user without name.',
  },
  email: {
    type: String,
    unique: true,
    required: 'Cannot create user without a valid email.',
  },
  password: {
    type: String,
    min: 6,
    required: 'Cannot create user without password.',
  },
})

module.exports = mongoose.model('User', UserSchema)
