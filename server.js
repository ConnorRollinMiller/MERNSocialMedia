require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');

const connected = chalk.bold.cyan;

const connect_db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

connect_db();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
   if (req.method === 'POST') {
      console.log(`\n ${chalk.cyanBright(JSON.stringify(req.body))} \n`);
   }
   next();
});
app.use(morgan('dev'));

app.use('/api/users', require('./routes/user'));
app.use('/api/jwt', require('./routes/jwt'));
app.use('/api/posts', require('./routes/post'));

app.listen(PORT, () => {
   console.log(connected(`Server running on port ${PORT}`));
});
