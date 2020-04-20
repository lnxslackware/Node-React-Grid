let config = {
    data : 'fileData',
    useDb : true, //true - read data from MongoDb, false - read data from MOCK_DATA.js
    connectionString : 'mongodb://localhost:27017/react-grid'
}

config.data = config.useDb ? 'dbData' : 'fileData';

module.exports = config;