import React from 'react'
import List from './List'

export default class Todos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                {
                    item: 'eat', 
                    isActive: false,
                    key: 0
                }, 
                {
                    item: 'cry', 
                    isActive: false,
                    key: 1
                },
            ], 
            input: '',
            isAllComplete: false,
            view: 'all',
            nextKey: 0,
            editText: '',
            editKey: -1,
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 className='title center-text'>Todo</h1>
                <List 
                    todos={this.state.todos}
                />
            </React.Fragment>
        )
    }
}