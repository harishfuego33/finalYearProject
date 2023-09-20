const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require("pg");
const app = express();
const { PythonShell } = require('python-shell');
const {config} = require('dotenv');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

// connecting to database
config()
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to pg database: ' + err.stack);
    return;
  }
  console.log('Connected to pg database as id ' + pool.threadId);
});


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/signUp', (req, res) => {
  res.render("signUp");
});

app.post('/signUp', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const sql = `INSERT INTO user (first_name ,last_name , email, password) VALUES (?, ?, ?, ?)`;
  pool.query(sql, [firstname, lastname, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into pg: ' + err.stack);
      return res.status(500).send('Error signing up');
    }
    res.render('signIn');
  });
});

app.get('/signIn', (req, res) => {
  res.render('signIn',{flag:1});
});

app.post('/signIn', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT email FROM user WHERE email = ? AND password = ?`;
  pool.query(sql, [email,password], (err, result) => {
    if (err) 
    {
      console.error('Error getting data into pgL: ' + err.message);
      return res.status(500).send('Error signing up');
    }
    if(result.length===0)
    {
     
      res.render('signIn',{flag:0});
    }
    else
    {
      res.render('searchBox',{message:-1});
    }
  });
});

app.get('/searchbox', (req, res) => {
  res.render('searchBox',{message :" "});
});


app.post('/searchbox', async(req, res)   => 
{
  const {search} = req.body;
  let options = {
    mode:"text",
    pythonOptions:['-u'],
    scriptPath:'loadPickle.py',//"D:/Practice/Front-End/Project 1/",
    args:[search]
  };
 const [output] = await PythonShell.run("loadPickle.py",options,(err,result)=>{
      if(err)console.error("error");
      console.log(result);   
    return result;
  });

  let flag ;
  if(output=='bad')
  flag = 0;
  else if(output=='good')
  flag = 1;

  res.render("searchBox",{message:flag})
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
