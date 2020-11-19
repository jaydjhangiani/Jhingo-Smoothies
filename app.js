const express = require('express');
const mongoose = require('mongoose');
const authRouters = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dbuser:test1234@cluster0.2b2gm.mongodb.net/node_auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRouters)


/* cookies
app.get('/set-cookies',(req,res) => {
  //res.setHeader('Set-Cookie','newUser=true')
  res.cookie('newUser', false);
  // one day => {maxAge: 1000*60*60*24}
  // secure: true => when https
  res.cookie('isEmployee',true)
  res.send('you got a cookie!');
});

app.get('/read-cookies',(req,res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser)
  res.json(cookies)
}); */