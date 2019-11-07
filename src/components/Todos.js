import React from 'react'
import List from './List'
import AddTodo from './AddTodo'

export default class Todos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [], 
            input: '',
            isAllComplete: false,
            view: 'all',
            nextKey: 0,
            editText: '',
            editKey: -1,
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleAddTodo = this.handleAddTodo.bind(this)
    }

    updateInput(e) {
        const value = e.target.value;

        this.setState({
            input: value,
        })
    }

    handleAddTodo(e) {
        if(e.keyCode === 13){
            this.setState((currentState) => {
                return {
                    todos: currentState.todos.concat([{
                        item: this.state.input,
                        isActive: true, 
                        key: this.state.nextKey,
                    }]), 
                    input: '',
                    isAllComplete: false,
                    nextKey: this.state.nextKey + 1,
                }
            
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 className='title center-text'>Todo</h1>
                <AddTodo
                    placeholder='What needs to be done?'
                    value={this.state.input}
                    onChange={this.updateInput}
                    onKeyDown={this.handleAddTodo}
                />
                <List 
                    todos={this.state.todos}
                />
            </React.Fragment>
        )
    }
}