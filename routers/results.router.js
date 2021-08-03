const router = require('express').Router()
const jwt = require('jsonwebtoken')

// Model
const Result = require('../models/result.model')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInToken.middleware')

router.use(verifyLoggedInUser)

router.route('/').get(async (req, res) => {
  try {
    const userId = req.userId.userId
    const results = await Result.find({ userId: userId })
    res.json({ success: true, results })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to fetch your results',
      errorMessage: error.message,
    })
  }
})
router.route('/').post(async (req, res) => {
  let newResult = req.body
  const userId = req.userId.userId
  newResult = { ...newResult, userId: userId }
  try {
    const verifyNewResult = new Result(newResult)
    const resultSaved = await verifyNewResult.save()
    res.json({ success: true, resultSaved })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to add result',
      errorMessage: error.message,
    })
  }
})

module.exports = router
