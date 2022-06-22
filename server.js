const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const path = require('path');
const db = require("./db/db.json");


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './routes/htmlRoutes/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './routes/htmlRoutes/notes.html'));
});

app.get('/api/db', (req, res) => {
  let results = db;
  res.json(results);
});


app.post('/api/db', (req, res) => {
  let noteArray = db;
  noteArray.push(req.body);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(noteArray, null, 2)
  );
  res.json(req.body);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`)
});