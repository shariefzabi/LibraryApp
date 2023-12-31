const express = require("express");
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors())
const { connectDB } = require('./mongodb')
const PORT = 3001
connectDB()
const bookRouter = require('./routes/books')
const userRouter = require('./routes/user')

app.use('/books', bookRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`App started succsfully on ${PORT}`)
})