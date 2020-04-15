import React from 'react';

class Tbody extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cellMapping: {
                id: function(value, index) {
                    return <td key={index} className='delete' data-id={value} onClick={props.onDelete}>{value}</td>
                },
                email: function(value, index) {
                    const href = `mailto://${value}/`;
                    return <td key={index}><a href={href}>{value}</a></td>
                },
                department: function(value, index) {
                    return <td  key={index} className='filter' data-filterby='department' onClick={props.onFilter}>{value}</td>
                }
            }
        }
    }

    displayTableRecord(cellMapping, record, index) {
        return (
            <tr key={index}>
                {this.props.keys.map((key, index) => {
                     if(this.state.cellMapping[key]) {
                        return this.state.cellMapping[key](record[key], index);
                     }

                     return (<td key={index}>{record[key]}</td>);
                })}
            </tr>
        )
    }

    render() {
        return (
            <tbody>
                {this.props.data.map((emplyee, index) => {
                    return this.displayTableRecord(this.props.cellMapping, emplyee, index);
                })}
            </tbody>
        )
    }
}

export default Tbody;