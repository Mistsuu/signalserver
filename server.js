const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// port app use
const PORT = 1208;
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// create app
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

app.get('/',(req,res) => {
  session = req.session;
  if (session && session.userid) {
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }
  else
    res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session        = req.session;
      session.userid = req.body.username;
      console.log(req.session)
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  }
  else{
    res.send('Invalid username or password');
  }
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {console.log(`Program is running at PORT ${PORT}`);});