const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(cors({
  origin: ['https://flexmanager-frontend.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on port ' + PORT));
