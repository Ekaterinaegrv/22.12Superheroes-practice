const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const bodyParser = express.json();
app.use(bodyParser);
app.use(cors());
app.use('/api', router);

module.exports = app;