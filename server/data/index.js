const fileData = require('./MOCK_DATA');
const Employee = require('../models/employee');

function mapDbData(employee) {
    return {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        job_title: employee.job_title,
        department: employee.department
    } 
}

module.exports = {
    fileData : {
        all: function() {
            return Promise.resolve(fileData);
        },
        erase: function(id) {
            const index = fileData.findIndex(x => x.id == id);
            fileData.splice(index, 1);
            return Promise.resolve(fileData);
        },
        sort: function(creteria) {
            let predicate = (a, b) => a[creteria].localeCompare(b[creteria]);

            if(fileData.length == 0) {
                return Promise.reject('No data');
            }

            if(typeof fileData[0][creteria] === 'number') {
                predicate = (a, b) => a[creteria] > b[creteria];
            }
            
            return Promise.resolve(([...fileData].sort(predicate)));
        },
        filter: function(creteria, value) {
            return Promise.resolve(fileData.filter(x => x[creteria] == value));
        }
    },
    dbData: {
        all: function(creteria, filter) {
            let result = Employee.find(filter || {});
            let sortBy = 'id';

            if(creteria) {
                sortBy = creteria;
            }

            return result.sort(creteria).map(data => data.map(mapDbData));
        },
        erase: function(modelId) {
            return Promise.resolve(Employee.findOneAndDelete({id: modelId})).then(() => {
                return this.all();
            });
        },
        sort: function(creteria) {
            return this.all().sort(creteria);
        },
        filter: function(creteria, value) {
            const filter = {};
            filter[creteria] = value;
            return this.all(null, filter);
        }
    }
}