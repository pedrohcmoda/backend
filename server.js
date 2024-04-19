const express = require('express');

const routes = require('./routes.js');

require('./database/index.js');
const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);