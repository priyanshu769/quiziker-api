const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())

app.use(cors())

// DB connect
const initializeDBConnect = require("./db/db.connect.js")
initializeDBConnect()

// Middlewares
const errorHandler404 = require("./middlewares/errorHandler404.middleware.js")
const errorHandler500 = require("./middlewares/errorHandler500.middleware.js")

// Routers
const quizzes = require("./routers/quizzes.v1.router.js")
const login = require("./routers/login.router.js")
const signup = require("./routers/signup.router.js")
const results = require("./routers/results.router.js")

app.use("/quizzes", quizzes)
app.use("/login", login)
app.use("/signup", signup)
app.use("/results", results)

app.get('/', (req, res) => {
  res.send("Welcome to Quiziker's Rest API!")
});

app.use(errorHandler404)
app.use(errorHandler500)

const port = 8000

app.listen(process.env.PORT || port, () => {
  console.log('server started on port 8000');
});
