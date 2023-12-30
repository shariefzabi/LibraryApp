const express = require("express");
const app = express()
app.use(express.json())
const { connectDB } = require('./mongodb')
const PORT = 3000
connectDB()
const bookRouter = require('./routes/books')
const userRouter = require('./routes/user')

app.use('/books', bookRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`App started succsfully on ${PORT}`)
})