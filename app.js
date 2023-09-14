const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const fs = require('fs');
const pickle = require('pickle');
const url = require('url');
const { PythonShell } = require('python-shell');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password :"root",
  database: 'url_project'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

function urlToDomain(urlSting) {
  const parsedUrl = url.parse(urlSting);
  let domainName = parsedUrl.hostname;
  if (domainName.startsWith('www.'))
    domainName = domainName.slice(4); 
  return domainName;
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/signUp', (req, res) => {
  res.sendFile(__dirname + '/public/signUp.html');
});

app.post('/signUp', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const sql = `INSERT INTO signup (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
  db.query(sql, [firstname, lastname, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
      return res.status(500).send('Error signing up');
    }
    res.redirect('/signIn.html');
  });
});

app.get('/signIn', (req, res) => {
  res.sendFile(__dirname + '/public/signIn.html');
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
      console.error('wrong');
      res.redirect('/signIn.html',);
    }
    else
    {
      res.redirect('/searchBox.html');
    }
  });
});

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/public/searchBox.html');
});


app.post('/search', (req, res) => {
  let {search} = req.body;
  let name= urlToDomain(search)
  console.log(name);

  const ensemble = pickle.loads(('ensemble_model.pkl',"rb"));

    // Load the fitted TF-IDF vectorizer
    const vectorizer = pickle.loads(('tfidf_vectorizer.pkl',"rb"));

    // Example URL for prediction
    const newUrl = [url];

    // Transform the new URL using the loaded vectorizer
    const X_predict = vectorizer.fit_transform(newUrl);

    // Make predictions using the loaded model
    const predictions = ensemble.predict(X_predict);
  if(predictions[0]=='bad')
    console.log(false);
  else
    console.log(true);

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
