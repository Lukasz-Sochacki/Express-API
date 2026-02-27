const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

//import routes
const testImonialRoutes = require('./routes/testImonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertRoutes = require('./routes/concert.routes');

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

//endpoints
app.use('/api', testImonialRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
