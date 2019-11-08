import React from 'react'
import PropTypes from 'prop-types'

function Item(props) {
    const todo = props.todo
    if (props.editKey === todo.key) {
        return (
            <input
                className='update-todo-text'
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
                    className='todo-item'
                    onDoubleClick={() => props.onEditItem(todo.key, todo.item)}
                    style={{ textDecoration: todo.isActive ? 'none' : 'line-through' }}
                >
                    {todo.item}
                </span>
                <button className='delete'
                    onClick={() => { props.onDeleteTodo(todo.key) }}>
                    ╳
                </button>
            </React.Fragment>
        )
    }
}

Item.propTypes = {
    todo: PropTypes.object,
    editKey: PropTypes.number,
    onToggleTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func,
    onUpdateEditText: PropTypes.func,
    value: PropTypes.string,
    onChangeTodoText: PropTypes.func,
    onEditItem: PropTypes.func,
}

// Displays a list of the todos the usesr has added.
export default function List(props) {
    return (
        <ul>
            {props.todos.map((todo) => (
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
    )
}

List.propTypes = {
    todos: PropTypes.array,
}