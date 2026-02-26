const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// app.use(cors({
//   "origin": "https://kodilla.com", //origin sets domains that we approve
//   "methods": "GET,POST", //we allow only GET and POST methods
// }));

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find((item) => item.id === parseInt(req.params.id)));
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(404).json({ message: 'Author and text are required...' });
  }

  const newTestImonial = {
    id: uuidv4(),
    author,
    text,
  };

  db.push(newTestImonial);
  res.json({ message: 'OK - post' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const testImonial = db.find((item) => item.id === parseInt(req.params.id));

  if (!testImonial) {
    return res.status(404).json({ message: 'Not found...' });
  }

  testImonial.author = author;
  testImonial.text = text;
  res.json({ message: 'OK - put' });
});

app.delete('/testimonials/:id', (req, res) => {
  const index = db.findIndex((item) => item.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  db.splice(index, 1);

  res.json({ message: 'OK - delete' });
});

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
