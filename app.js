const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/verifyToken');
require('dotenv').config();

/* Authentication routes */
const authRouter = require('./routes/auth/authenticate');
const registerRouter = require('./routes/auth/register');
const logoutRouter = require('./routes/auth/logout');

/* Routes */
const entranceRouter = require('./routes/entrance');

/* Middleware */
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public/auth')));
app.use(express.static(path.join(__dirname + '/public/lobby')));
app.use(verifyToken);

/* Routes */
app.get('/', entranceRouter);
app.post('/register', registerRouter);
app.post('/auth', authRouter);
app.post('/logout', logoutRouter);



module.exports = app;