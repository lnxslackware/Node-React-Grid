const express = require('express');
const router = express.Router();
const data = require('./data');
module.exports = function(app) {
    router.get('/', (req, res) => {
        res.send(data);
    })
    
    router.delete('/:id', (req, res) => {
        const id = +req.params.id;
        const index = data.findIndex(x => x.id == id);
        data.splice(index, 1)
        res.send(data);
    });

    router.get('/sort/:creteria', (req, res) => {
        const creteria = req.params.creteria;
        let predicate = (a, b) => a[creteria].localeCompare(b[creteria]);

        if(data.length == 0) {
            res.send(data);
            return;
        }

        if(!data[0][creteria]) {
            res.send(data);
            return;
        }

        if(typeof data[0][creteria] === 'number') {
            predicate = (a, b) => a[creteria] > b[creteria];
        }

        res.send([...data].sort(predicate));
    });

    router.get('/filter/:creteria/:value', (req, res) => {
        const creteria = req.params.creteria;
        const value = req.params.value;

        if(data.length == 0) {
            res.send(data);
            return;
        }

        if(!data[0][creteria]) {
            res.send(data);
            return;
        }

        res.send(data.filter(x => x[creteria] == value));
    });

    app.use(router);
}