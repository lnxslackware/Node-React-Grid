const config = require('./config/config');
const express = require('express');
const router = express.Router();
const data = require('./data')[config.data];

module.exports = function(app) {
    router.get('/', (req, res) => {
        data.all().then( resolve => res.send(resolve))
        .catch(console.error);
    })
    
    router.delete('/:id', (req, res) => {
        const id = +req.params.id;
        data.erase(id).then(resolve => res.send(resolve))
        .catch(console.error);
    });

    router.get('/sort/:creteria', (req, res) => {
        const creteria = req.params.creteria;
        data.sort(creteria).then(resolve => res.send([...resolve]))
        .catch(console.error);
    });

    router.get('/filter/:creteria/:value', (req, res) => {
        const creteria = req.params.creteria;
        const value = req.params.value;
        data.filter(creteria, value).then(resolve =>res.send(resolve))
        .catch(console.error)
    });

    app.use(router);
}