const express = require('express'); 
const bodyparser = require('body-parser'); 
const mongoose = require('mongoose'); 
const cors = require('cors');

const app = express(); 
const userRoute = require('./Controller/userController'); 

mongoose.connect('mongodb://localhost/EventDatabase')
  .then(result => console.log('connected successfully'))
  .catch(error => console.log('There is a error in the connection ')); 

app.use(cors());
app.use(express.json()); 
app.use(bodyparser.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(bodyparser.urlencoded({extended: true})); 
app.use('/user', userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
});
