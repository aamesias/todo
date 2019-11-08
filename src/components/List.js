import React from 'react'
import PropTypes from 'prop-types'

function Item(props) {
    const todo = props.todo
    if (props.editKey === todo.key) {
        return (
            <input
                onBlur={() => props.onChangeTodoText(todo.key)}
                onKeyDown={(e) => e.keyCode === 13 ? props.onChangeTodoText(todo.key) : null}
                type='text'
                autoFocus='autofocus'
                value={props.value}
                onChange={props.onUpdateEditText}
            />
        )
    } else {
        return (
            <React.Fragment>
                <input
                    type="checkbox"
                    checked={!todo.isActive}
                    onChange={() => { props.onToggleTodo(todo.key) }}
                />
                <span
                    onDoubleClick={() => props.onEditItem(todo.key, todo.item)}
                    style={{ textDecoration: todo.isActive ? 'none' : 'line-through' }}
                >
                    {todo.item}
                </span>
                <button 
                    onClick={() => { props.onDeleteTodo(todo.key) }}>
                    ╳
                </button>
            </React.Fragment>
        )
    }
}

Item.propTypes = {
    todo: PropTypes.object.isRequired,
    editKey: PropTypes.number.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired,
    onUpdateEditText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChangeTodoText: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
}

function CompleteAll({ todos, onToggleCompleteAll }) {
    if (todos.length !== 0) {
        return (
            <div>
                <button
                    onClick={() => onToggleCompleteAll()}
                >
                    ❯
            </button>
            </div>
        )
    }
    else {
        return null
    }
}

CompleteAll.propTypes = {
    todos: PropTypes.array.isRequired,
    onToggleCompleteAll: PropTypes.func.isRequired
}

// Displays a list of the todos the usesr has added.
export default function List(props) {

    // returns the correct filtered todos depending on the current filter
    let filteredTodos = props.todos
    if (props.filter === 'completed') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === false)
    } else if (props.filter === 'active') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === true)
    }

    return (
        <React.Fragment>
            <CompleteAll
                todos={props.todos}
                onToggleCompleteAll={props.onToggleCompleteAll}
            />
            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.key}>
                        <Item
                            editKey={props.editKey}
                            todo={todo}
                            onToggleTodo={props.onToggleTodo}
                            onDeleteTodo={props.onDeleteTodo}
                            onUpdateEditText={props.onUpdateEditText}
                            value={props.value}
                            onChangeTodoText={props.onChangeTodoText}
                            onEditItem={props.onEditItem}
                        />
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

List.propTypes = {
    todos: PropTypes.array.isRequired,
}