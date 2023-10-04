require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes/routes');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(route);



app.listen(3000,()=>{
  console.log(`Server listening at port: ${port}`)
})

module.exports = app;