require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const uri = process.env.MONG_URI;

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/estadosController')(app);
require('./controllers/cidadesController')(app);
require('./controllers/authController')(app);

mongoose.connect(uri, { 
  useUnifiedTopology: true,
  useNewUrlParser: true 
  }).then(result => {
    app.listen(3000);
  }).catch(err => console.log(err));
