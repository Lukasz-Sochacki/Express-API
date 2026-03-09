const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const isTaken = await Seat.findOne({ day, seat });
    if (isTaken)
      res.status(409).json({ message: 'The slot is already taken...' });

    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();

    if (req.io) req.io.emit('seatsUpdated', await Seat.find());

    res.json({ message: 'OK - post' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, {
      day,
      seat,
      client,
      email,
    });
    if (!updatedSeat) res.status(404).json({ message: 'Not found...' });
    res.json({ message: 'Ok - put' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (deletedSeat) {
      res.json(deletedSeat);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
