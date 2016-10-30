import React from 'react';

export default (props) => {
    let classes = "square";
    if (props.winner){
        classes += " winner";
    }
    return (
        <button className={classes} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}