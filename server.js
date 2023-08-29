const express = require('express')
const connectDB = require('./config/db')
const app = express()

//connect database
connectDB()

//init middleware
app.use(express.json({ extended: false }))

//server.js test route
app.get('/', (req, res) => res.send('server.js started'))

//define all routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/notes', require('./routes/api/notes'));
app.use('/api/auth', require('./routes/api/auth'));


const port = process.env.port || 5000

app.listen(port, () => console.log(`Listening on port ${port}!`))