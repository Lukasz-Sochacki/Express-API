const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testImonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testImonials.find((item) => item.id === parseInt(req.params.id)));
});
router.route('/testimonials/random').get((req, res) => {
  if (db.testImonials.length === 0) {
    return res.status(404).json({ message: 'No testimonials found...' });
  }
  res.json(db.testImonials[Math.floor(Math.random() * db.testImonials.length)]);
});

router.route('/testimonials').post((req, res) => {
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
router.route('/testimonials/:id').put((req, res) => {
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

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testImonials.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  db.testImonials.splice(index, 1);

  res.json({ message: 'OK - delete' });
});

module.exports = router;
