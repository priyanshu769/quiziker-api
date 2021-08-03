const mongoose = require('mongoose')
require('dotenv').config()

const initializeDBConnect = async () => {
  try {
    const connectKey = process.env.DB_KEY
    mongoose.connect(
      `mongodb+srv://priyanshu:${connectKey}@quizikercluster.kwvum.mongodb.net/Quiziker?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    )
    const db = await mongoose.connection
    console.log('connected successfully')
  } catch (error) {
    console.log('error: ', error)
  }
}

module.exports = initializeDBConnect
