import React from 'react';
import {observer} from 'mobx-react';

export default observer((props) => {
    let classes = "square";
    if (props.winner){
        classes += " winner";
    }
    return (
        <button className={classes} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
});