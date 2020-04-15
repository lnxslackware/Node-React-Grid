import React from 'react';
import data from '../data/data';
import Thead from '../Thead/Thead'
import Tbody from '../Tbody/Tbody'

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            keys: [],
            keysMapping: {
                id: 'Id',
                first_name: 'First name',
                last_name: 'Last name',
                email: 'Email',
                job_title: 'Job title',
                department: 'Department'
            },
        };
    }

    componentDidMount() {
        data.getData().then((res) => {
            const keys = Object.keys(res[0]);
            this.setState({
                data: res,
                keys : keys
            });
        })
        .catch(console.error);
    }

    handleSort = e => {
        const creteria = e.target.dataset.sortby;
        data.sortData(creteria).then(res => {
            this.setState({
                data: res
            });
        })
        .catch(console.error);
    }

    handleFilter = e => {
        const creteria = e.target.dataset.filterby;
        const value = e.target.innerHTML;
        data.filterData({ [creteria] : value}).then(res => {
            this.setState({
                data: res
            });
        })
        .catch(console.error);
    }

    handleDelete = e => {
        const id = +e.target.dataset.id;
        data.deleteData(id).then(res => {
            this.setState({
                data: res
            })
        });
    }
    
    render() {
        return (
            <table>
                <Thead keys={this.state.keys} keysMapping={this.state.keysMapping} onClick={this.handleSort}/>
                <Tbody data={this.state.data} keys={this.state.keys} onFilter={this.handleFilter} onDelete = {this.handleDelete}/>
            </table>
        );
    }
}

export default Table;