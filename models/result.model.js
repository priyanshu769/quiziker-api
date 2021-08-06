const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: 'Cannot create result without name.',
  },
  finalScore: {
    type: String,
    required: 'Cannot create result without finalScore.',
  },
  usersName: {
    type: String,
    required: "Cannot create result without user's name.",
  },
  userId: {
    type: String,
    required: "Cannot create result without user's Id.",
  },
})

module.exports = mongoose.model('Result', ResultSchema)
