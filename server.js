require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const db = require('./db');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

//middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', () => {
  console.log('New socket!');
});

//import routes
const testImonialRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertRoutes = require('./routes/concert.routes');

//endpoints
app.use('/api', testImonialRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertRoutes);

console.log('Hasło z ENV:', process.env.DB_PASS);
//connect with database using mongoose
mongoose.connect(
  `mongodb+srv://sochacki_luki:${process.env.DB_PASS}@cluster0.ovq92ek.mongodb.net/NewWaveDB?appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected with NewWaveDB database!');
});
db.on('error', (err) => console.log('Error' + err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port: ' + PORT);
});
