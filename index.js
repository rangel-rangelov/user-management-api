const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');



dotenv.config();

const app = express();

app.listen(process.env.PORT, () => { console.log(`Server is running on ${process.env.PORT} port.`)});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

if(!db) {
  console.log(chalk.bgRed('Error connecting to db '))
} else {
  console.log(chalk.bgGreen('Success connecting to db'))
}

const authenticationRoutes = require('./routes/authentication.routes');

app.use('/auth', authenticationRoutes);