import React from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import ListMenu from './ListMenu'
import { Row } from 'antd'


export default class Todos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            input: '',
            isAllComplete: false,
            filter: 'all',
            nextKey: 0,
            editText: '',
            editKey: -1,
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
        this.handleChangeTodoText = this.handleChangeTodoText.bind(this)
        this.handleToggleTodo = this.handleToggleTodo.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.updateEditText = this.updateEditText.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
        this.handleClearCompleted = this.handleClearCompleted.bind(this)
        this.handleToggleCompleteAll = this.handleToggleCompleteAll.bind(this)
        //this.filterTodos = this.filterTodos.bind(this)
    }

    updateInput(e) {
        const value = e.target.value;

        this.setState({
            input: value,
        })
    }

    handleAddTodo(e) {
        if (e.keyCode === 13) {
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

    handleDeleteTodo(key) {
        this.setState((currentState) => {
            const newStateOfTodos = currentState.todos.filter((todo) => todo.key !== key)
            const numOfActiveItems = newStateOfTodos.filter((todo) => todo.isActive === true).length
            if (numOfActiveItems === 0) {
                return {
                    isAllComplete: true,
                    todos: newStateOfTodos
                }
            } else {
                return {
                    isAllComplete: false,
                    todos: newStateOfTodos
                }
            }
        })
    }

    handleChangeTodoText(key, e) {
        const editText = this.state.editText
        if (editText === '') {
            return this.handleDeleteTodo(key)
        }
        this.setState((currentState) => {

            const newStateOfTodos = currentState.todos.map((todo) => {
                if (todo.key === key) {
                    return {
                        ...todo, item: editText,
                    }
                } else {
                    return todo
                }
            })

            return {
                todos: newStateOfTodos,
                editKey: -1,
                editText: '',
            }
        })
    }

    handleToggleTodo(key) {
        this.setState((currentState) => {
            const newStateOfTodos = currentState.todos.map((todo) => {
                if (todo.key === key) {
                    return { ...todo, isActive: !todo.isActive }
                } else {
                    return todo;
                }
            })
            const numOfActiveItems = newStateOfTodos.filter((todo) => todo.isActive === true).length
            if (numOfActiveItems === 0) {
                return {
                    todos: newStateOfTodos,
                    isAllComplete: true
                }
            } else {
                return {
                    todos: newStateOfTodos,
                    isAllComplete: false
                }
            }

        })
    }

    handleEditItem(key, item) {
        this.setState({
            editKey: key,
            editText: item
        })
    }

    updateEditText(e) {
        const value = e.target.value

        this.setState({
            editText: value
        })
    }

    updateFilter(newFilter) {
        this.setState({
            filter: newFilter
        })
    }

    handleClearCompleted() {
        this.setState((currentState) => {
            const newStateOfTodos = currentState.todos.filter((todo) => todo.isActive === true)
            const numOfActiveItems = newStateOfTodos.length
            if (numOfActiveItems === 0) {
                return {
                    isAllComplete: true,
                    todos: newStateOfTodos
                }
            } else {
                return {
                    isAllComplete: false,
                    todos: newStateOfTodos
                }
            }
        })
    }


    // updates all todos to toggle active or not active
    handleToggleCompleteAll() {
        this.setState((currentState) => {
            return {
                ...currentState,
                isAllComplete: !currentState.isAllComplete,
                todos: currentState.todos.map((todo) => ({
                    ...todo,
                    isActive: currentState.isAllComplete
                }))
            }
        })
    }


    render() {
        return (
            <React.Fragment>
                <h1>Todo</h1>
                <AddTodo
                    todos={this.state.todos}
                    onToggleCompleteAll={this.handleToggleCompleteAll}
                    placeholder='What needs to be done?'
                    value={this.state.input}
                    onChange={this.updateInput}
                    onKeyDown={this.handleAddTodo}
                />
                <TodoList
                    todos={this.state.todos}
                    filter={this.state.filter}
                    editKey={this.state.editKey}
                    onDeleteTodo={this.handleDeleteTodo}
                    onToggleTodo={this.handleToggleTodo}
                    onChangeTodoText={this.handleChangeTodoText}

                    onEditItem={this.handleEditItem}
                    onUpdateEditText={this.updateEditText}
                    value={this.state.editText}
                />
                <ListMenu
                    todos={this.state.todos}
                    onFilterChange={this.updateFilter}
                    onClearCompleted={this.handleClearCompleted}
                />
            </React.Fragment>
        )
    }
}