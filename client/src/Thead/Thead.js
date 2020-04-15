import React from 'react';

function Thead(props) {
    return (
    <thead>
        <tr>
            {props.keys.map((key, index) => {
                const displayName = props.keysMapping[key];
                return (
                    <th key={index} className='sort' data-sortby={key} onClick={props.onClick}>{displayName}</th>
                )
            })}
        </tr>
    </thead>
    )
}

export default Thead;