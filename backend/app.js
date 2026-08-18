require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const indexRouter = require('./routes/indexRouter');

const app = express();

require('./config/passport')
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);

// 404 handler — route not found
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

// Global error handler — always needs 4 params
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send structured JSON format to client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Show stack trace only in development environment
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Listening on port ${PORT}`);
});