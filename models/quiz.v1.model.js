const mongoose = require("mongoose")

const QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot enter a quiz without name"
  },
  questions: {
    type: Array,
    required: "Questions required"
  }
},{
    timestamps: true
  })
const Quiz = mongoose.model("Quiz", QuizSchema)

module.exports = {Quiz}