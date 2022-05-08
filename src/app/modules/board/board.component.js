
import React, { useReducer } from 'react';
import { History } from './history/history.component';
import { ACTION_TYPE } from './../../shared/models/types';
import './board.component.css';

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

export function Board() {
    const initialState = {
        current: {
            value: '',
            index: 0
        },
        history: []
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="container">
            <form onSubmit={(e) => e.preventDefault()} className="board-form">
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
                        <History 
                            list={state.history}
                            onClick={(index) => dispatch({ type: ACTION_TYPE.MOVE, index: index})}
                        />
                    </div>
                    <div className="form-column">
                        <button className="form-button" type="button" onClick={e => dispatch({ type: ACTION_TYPE.SAVE, value: e.target.form.info.value })}>SAVE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}