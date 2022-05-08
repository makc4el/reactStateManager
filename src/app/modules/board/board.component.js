
import React, { useReducer, useMemo } from 'react';
import './board.component.css';
const ACTION_TYPE = {
    SAVE: 'SAVE',
    REDO: 'REDO',
    UNDO: 'UNDO',
    CLEAR: 'CLEAR',
    MOVE: 'MOVE',
    UPDATE: 'UPDATE'
};

function update(state, value) {
    return {
        history: state.history,
        current: {
            value: value,
            index: state.current.index
        },
    }
}

function save(state, value) {
    const updateHistory = state.history.slice();
    if (value) {
        updateHistory.push(value);
    }

    return {
        history: updateHistory,
        current: {
            value: '',
            index: updateHistory.length
        },
    }
}

function undo(state) {
    const index = state.current.index - 1;
    const updatedIndex = index < 0 ? 0 : index;

    return {
        history: state.history,
        current: {
            value: state.history[updatedIndex],
            index: updatedIndex
        },
    }
}

function redo(state) {
    const index = state.current.index + 1;
    const updatedIndex = index > (state.history.length - 1) ? state.history.length - 1 : index;

    return {
        history: state.history,
        current: {
            value: state.history[updatedIndex],
            index: updatedIndex
        },
    }
}

function clear(initialState) {
    return {
        ...initialState
    }
}

function move(state, index) {
    return {
        history: state.history,
        current: {
            value: state.history[index],
            index: index
        },
    }
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPE.SAVE:
            return save(state, action.value);
        case ACTION_TYPE.MOVE:
            return move(state, action.index)
        case ACTION_TYPE.UNDO:
            return undo(state);
        case ACTION_TYPE.REDO:
            return redo(state);
        case ACTION_TYPE.CLEAR:
            return clear(action.initialState);
        default:
            return update(state, action.value);
    }
}

function renderList(list, dispatch) {
    return list.map((data, index) => {
        return (
            <li className="history-item" key={index}>
                <button className="history-item-btn" onClick={() => dispatch({ type: ACTION_TYPE.MOVE, index: index })}>{data}</button>
            </li>
        )
    });
}

export function Board() {
    const initialState = {
        current: {
            value: '',
            index: 0
        },
        history: []
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const historyList = useMemo(() => renderList(state.history, dispatch), [state.history, dispatch]);

    return (
        <div className="container">
            <form className="board-form">
                <div className="form-row">
                    <div className="form-column">
                        <input className="form-input" type="text" name="info" placeholder="Please add any text here" value={state.current.value} onChange={e => dispatch({ type: ACTION_TYPE.UPDATE, value: e.target.value})}/>
                    </div>
                    <div className="form-column">
                        <button className="form-button" type="button" onClick={() => dispatch({ type: ACTION_TYPE.UNDO })}>UNDO</button>
                        <button className="form-button" type="button" onClick={() => dispatch({ type: ACTION_TYPE.REDO })}>REDO</button>
                        <button className="form-button" type="button" onClick={() => dispatch({ type: ACTION_TYPE.CLEAR, initialState: initialState })}>CLEAR</button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <ol className="history-list">
                           {historyList}
                        </ol>
                    </div>
                    <div className="form-column">
                        <button className="form-button" type="button" onClick={e => dispatch({ type: ACTION_TYPE.SAVE, value: e.target.form.info.value })}>SAVE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}