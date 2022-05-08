import React, { useMemo } from 'react';
import './history.component.css';

function renderList(props) {
    return props.list.map((data, index) => {
        return (
            <li className="history-item" key={index}>
                <button className="history-item-btn" onClick={() => props.onClick(index)}>{data}</button>
            </li>
        )
    });
}

export function History(props) {
    const historyList = useMemo(() => renderList(props), [props.list]);
    return (
        <ol className="history-list">
            {historyList}
        </ol> 
    );
}