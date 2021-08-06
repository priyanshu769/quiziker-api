const express = require("express")
const router = express.Router()
const { extend } = require("lodash")

// Model
const { Quiz } = require("../models/quiz.v1.model.js")

router.route("/")
  .get(async (req, res) => {
 try {
   const quizzes = await Quiz.find({})
   res.json({success: true, quizzes})
 } catch(error){
   res.json({success: false, message: "Quiz fetch failed", errorMessage: error.message})
 }
})
  .post(async (req, res) => {
  const saveQuiz = req.body
  try{
    const quizToSave = new Quiz(saveQuiz)
    const quizSaved = await quizToSave.save()
    res.json({status: true, quizSaved})
  } catch (err) {
    res.json({success: false, message: "quiz not saved", errorMessage: err.message})
  }
})

router.param("id", async (req, res, next, id) => {
  try {
    const quiz = await Quiz.findById(id)

    if (!quiz) {
      return res.status(404).json({ success: false, message: "error getting quiz" })
    }

    req.quiz = quiz
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "error while retrieving quiz" })
  }
})

router.route("/:id")
  .get((req, res) => {
    let {quiz} = req
    quiz.__v = undefined
    res.json({ success: true, quiz })
  })
  .post(async (req, res) => {
    const updateQuiz = req.body;
    let { quiz } = req;


    quiz = extend(quiz, updateQuiz)
    quiz = await quiz.save()

    res.json({ status: true, quiz })
  })
  .delete(async (req, res)=> {
    let {quiz} = req

    await quiz.remove()

    quiz.deleted = true;

    res.json({success: true, quiz})
  })
module.exports = router