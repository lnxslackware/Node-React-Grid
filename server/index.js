const http = require('http');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const api = require('./api')(app);

const port = 8080;

http.createServer(app).listen(port);

console.log(`Server is listening on port ${port}`);
