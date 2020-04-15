const apiUrl = 'http://localhost:8080/';

function getData() {
    return fetch(apiUrl).then(res => res.json());
}

function sortData(creteria) {
    return fetch(`${apiUrl}sort/${creteria}`).then(res => res.json());
}

function filterData(req) {
    const creteria = Object.keys(req);
    const value = req[creteria];
    return fetch(`${apiUrl}filter/${creteria}/${value}`).then(res => res.json());
}

function deleteData(id) {
    const body = JSON.stringify({'id': id});
    return fetch(`${apiUrl}${id}`, {
        method: 'DELETE',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export default {
    getData,
    sortData,
    filterData,
    deleteData
}