import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Input, List, Typography, Row, Col } from 'antd'

function Item(props) {
    const todo = props.todo
    if (props.editKey === todo.key) {
        return (
            <Input
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
            <Row align='middle' justify='center'>
                    <Checkbox
                        checked={!todo.isActive}
                        onChange={() => { props.onToggleTodo(todo.key) }}
                    />

                    <Typography.Text
                        onDoubleClick={() => props.onEditItem(todo.key, todo.item)}
                        style={{ textDecoration: todo.isActive ? 'none' : 'line-through' }}
                    >
                        {todo.item}
                    </Typography.Text>

                    <Button className='delete-button'
                        onClick={() => { props.onDeleteTodo(todo.key) }}>
                        X
                    </Button>
            </Row>
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



// Displays a list of the todos the usesr has added.
export default function TodoList(props) {

    // returns the correct filtered todos depending on the current filter
    let filteredTodos = props.todos
    if (props.filter === 'completed') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === false)
    } else if (props.filter === 'active') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === true)
    }

    return (
        <List bordered='true'>
            {filteredTodos.map((todo) => (
                <List.Item key={todo.key}>
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
                </List.Item>
            ))}
        </List>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
}