const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

//import routes
const testImonialRoutes = require('./routes/testImonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertRoutes = require('./routes/concert.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testImonialRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertRoutes);

// app.use(cors({
//   "origin": "https://kodilla.com", //origin sets domains that we approve
//   "methods": "GET,POST", //we allow only GET and POST methods
// }));

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
