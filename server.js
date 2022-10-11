require('dotenv').config()

const cors = require('cors')
const express = require("express")
const mongoose = require('mongoose')


const { MONGO_DB_URL } = require('./Config')
const { route } = require('./routes/productRoutes')


// this is express app
const app = express()
const port = process.env.PORT || 4000



app.use(cors());
// Express Json Middleware
app.use(express.json())



app.use('/api/product', route)


// Connect to Database
mongoose.connect(MONGO_DB_URL).then(() => {

  // listen 
  app.listen(port, () => {
    console.log(`Database connected and Server up and running on port`, port)
  })

}).catch(err => console.log(err))

