const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User.js');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": '*'
})
return res.redirect('signup.html');
})

app.post("/sign_up", async(req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json('User already exists');
    }
    
    const newValue = { email, password };
    user = await User.create(newValue);
  return res.redirect('signup_success.html')
})

const server = app.listen(
  PORT, 
  console.log(`Server running on port ${PORT}`.yellow.bold)
  );