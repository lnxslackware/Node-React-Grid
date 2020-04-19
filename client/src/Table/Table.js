import React, {useState, useEffect} from 'react';
import tableData from '../data/data';
import Thead from '../Thead/Thead'
import Tbody from '../Tbody/Tbody'

function Table(props) {
    let [data, setData] = useState([]);
    let [keys, setKeys] = useState([]);
    
    let keysMapping = {
        id: 'Id',
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email',
        job_title: 'Job title',
        department: 'Department'
    };

    useEffect(() => {
        tableData.getData().then((res) => {
            const keys = Object.keys(res[0]);
            setData(res);
            setKeys(keys);
        })
        .catch(console.error);
    }, []);

    let handleSort = e => {
        const creteria = e.target.dataset.sortby;
        tableData.sortData(creteria).then(res => {
            setData(res);
        })
        .catch(console.error);
    }

    let handleFilter = e => {
        const creteria = e.target.dataset.filterby;
        const value = e.target.innerHTML;
        tableData.filterData({ [creteria] : value}).then(res => {
            setData(res);
        })
        .catch(console.error);
    }

    let handleDelete = e => {
        const id = +e.target.dataset.id;
        tableData.deleteData(id).then(res => {
            setData(res);
        })
        .catch(console.error);
    }
    
    return (
        <table>
            <Thead keys={keys} keysMapping={keysMapping} onClick={handleSort}/>
            <Tbody data={data} keys={keys} onFilter={handleFilter} onDelete = {handleDelete}/>
        </table>
    )
}

export default Table;