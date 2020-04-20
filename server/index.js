const config = require('./config/config');

const express = require('express');
const cors = require('cors');

if(config.useDb) {
    var mongoose = require('mongoose');
    mongoose.connect(config.connectionString, { useUnifiedTopology: true, useNewUrlParser: true });

    mongoose.connection.on('open', function() {
        console.log('Connection to db established');
        configureApp();
    })
} else {
    configureApp();
}

function configureApp() {
    const app = express();

    app.use(cors());
    const api = require('./api')(app);

    const port = 8080;

    app.listen(port);

    console.log(`Server is listening on port ${port}`);
}