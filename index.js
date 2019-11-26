const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser')


dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

if(!db) {
  console.log(chalk.bgRed('Error connecting to db '))
} else {
  console.log(chalk.bgGreen('Success connecting to db'))
}

const routes = require('./routes/routes');

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT} port.`)
});
