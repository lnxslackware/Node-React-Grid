import React from 'react';

function Tbody (props) {
        
    let cellMapping = {
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
    };

    let displayTableRecord = function(cellMapping, record, index) {
        return (
            <tr key={index}>
                {props.keys.map((key, index) => {
                     if(cellMapping[key]) {
                        return cellMapping[key](record[key], index);
                     }

                     return (<td key={index}>{record[key]}</td>);
                })}
            </tr>
        )
    }

    return (
        <tbody>
            {props.data.map((emplyee, index) => {
                return displayTableRecord(cellMapping, emplyee, index);
            })}
        </tbody>
    )
}

export default Tbody;