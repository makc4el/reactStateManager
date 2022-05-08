import './board.component.css';

export function Board() {
    return (
        <div className="container">
            <form className="board-form">
                <div className="form-row">
                    <div className="form-column">
                        <input className="form-input" type="text" name="info" placeholder="Please add any text here"/>
                    </div>
                    <div className="form-column">
                        <button className="form-button" type="button">UNDO</button>
                        <button className="form-button" type="button">REDO</button>
                        <button className="form-button" type="button">CLEAR</button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <ol className="history-list">
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                            <li className="history-item">
                                <button className="history-item-btn">some data 1</button>
                            </li>
                        </ol>
                    </div>
                    <div className="form-column">
                        <button className="form-button" type="button">SAVE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}