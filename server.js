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
  res.json(db.testImonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testImonials.find((item) => item.id === parseInt(req.params.id)));
});

app.get('/testimonials/random', (req, res) => {
  if (db.testImonials.length === 0) {
    return res.status(404).json({ message: 'No testimonials found...' });
  }
  res.json(db.testImonials[Math.floor(Math.random() * db.testImonials.length)]);
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

  db.testImonials.push(newTestImonial);
  res.json({ message: 'OK - post' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const testImonial = db.testImonials.find(
    (item) => item.id === parseInt(req.params.id),
  );

  if (!testImonial) {
    return res.status(404).json({ message: 'Not found...' });
  }

  testImonial.author = author;
  testImonial.text = text;
  res.json({ message: 'OK - put' });
});

app.delete('/testimonials/:id', (req, res) => {
  const index = db.testImonials.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  db.testImonials.splice(index, 1);

  res.json({ message: 'OK - delete' });
});

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
