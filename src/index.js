import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todos from './components/Todos'

class App extends React.Component {
    render() {
        return (
            <div>
                <Todos />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


