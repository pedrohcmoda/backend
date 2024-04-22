const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');


require('./database/index.js');

const app = express();


app.use(express.json());

app.options('*', cors())
app.use(cors()) 

app.use(routes);

app.listen(3334);


  