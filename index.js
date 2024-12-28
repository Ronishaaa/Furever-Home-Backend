const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use('/', require('./routes/authRoutes'))

app.use(cookieParser())

app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb://localhost:27017/user")



app.listen(3001)