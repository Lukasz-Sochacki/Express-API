const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((item) => item.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(404).json({ message: 'All paramethers are required...' });
  }

  const newConcert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK - post' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const concert = db.concerts.find(
    (item) => item.id === parseInt(req.params.id),
  );

  if (!concert) {
    return res.status(404).json({ message: 'Not found...' });
  }

  ((concert.performer = performer),
    (concert.genre = genre),
    (concert.price = price),
    (concert.day = day),
    (concert.image = image));
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  db.concerts.splice(index, 1);
  res.json({ message: 'OK - delete' });
});

module.exports = router;
