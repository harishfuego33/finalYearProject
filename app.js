const express = require('express');
const bodyParser = require('body-parser');
const { pg } = require('pg'); 
const app = express();
const { PythonShell } = require('python-shell');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

// connecting to database
//PGPASSWORD=jeSUoHOGGrZRFJxU5qfLB8asukWl8BbX psql -h dpg-cjvu1695mpss73ba0qp0-a.oregon-postgres.render.com -U urldatabse_user urldatabse
const db = new db({
  user:"urldatabse_user",
  host:"dpg-cjvu1695mpss73ba0qp0-a",
  database:"urldatabse",
  password:"jeSUoHOGGrZRFJxU5qfLB8asukWl8BbX",
  port:"5432"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/signUp', (req, res) => {
  res.render("signUp");
});

app.post('/signUp', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const sql = `INSERT INTO signup (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
  db.query(sql, [firstname, lastname, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
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
  const sql = `SELECT email FROM signup WHERE email = ? AND password = ?`;
  db.query(sql, [email,password], (err, result) => {
    if (err) 
    {
      console.error('Error getting data into MySQL: ' + err.message);
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
  res.render('searchBox');
});


app.post('/searchbox', async(req, res)   => 
{
  const {search} = req.body;
  
  let options = {
    mode:"text",
    pythonOptions:['-u'],
    scriptPath:"D:/Practice/Front-End/Project 1/",
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
