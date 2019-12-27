import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todos from './components/Todos'

const App = () => {
    return (
        <div>
            <Todos />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


