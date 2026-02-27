const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((item) => item.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const isSlotTaken = db.seats.some(
    (item) => item.day === day && item.seat === seat,
  );

  if (!day || !seat || !client || !email) {
    return res.status(404).json({ message: 'All paramethers are required...' });
  }

  if (isSlotTaken) {
    return res.status(409).json({ message: 'The slot is already taken...' });
  }

  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeat);
  res.json({ message: 'OK - post' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const seatSimple = db.seat.find(
    (item) => item.id === parseInt(req.params.id),
  );

  if (!seatSImple) {
    return res.status(404).json({ message: 'Not found...' });
  }

  ((seatSimple.day = day),
    (seatSimple.seat = seat),
    (seatSimple.client = client),
    (seatSimple.email = email),
    res.json({ message: 'OK - put' }));
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  db.seats.splice(index, 1);
  res.json({ message: 'OK - delete' });
});

module.exports = router;
