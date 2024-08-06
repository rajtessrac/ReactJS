import React from 'react';

function Button(props) {
    return (
        <button onClick={()=>{
            alert('Hello')
        }} >
            I am Button
        </button>
    );
}

export default Button;