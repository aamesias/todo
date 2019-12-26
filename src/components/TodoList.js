import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Checkbox, List, Input, Typography, Row, Col } from 'antd'


const Item = (props) => {
    const todo = props.todo
    if (props.editKey === todo.key) {
        return (
            <Row className='todo-row' type='flex' justify='space-between' align='middle'>
                <Col span={2}> </Col>
                <Col span={20}>
                    <Input size='small'
                        onBlur={() => props.onChangeTodoText(todo.key)}
                        onKeyDown={(e) => e.keyCode === 13 ? props.onChangeTodoText(todo.key) : null}
                        type='text'
                        autoFocus='autofocus'
                        value={props.value}
                        onChange={props.onUpdateEditText}
                    />
                </Col>
                <Col span={2}> </Col >
            </Row >
        )
    } else {
        return (
            <Row className='todo-row' type='flex' justify='center' align='bottom'>
                <Col span={2}>
                    <Checkbox
                        checked={!todo.isActive}
                        onChange={() => { props.onToggleTodo(todo.key) }}
                    />
                </Col>
                <Col span={21}>
                    <Typography.Text
                        onDoubleClick={() => props.onEditItem(todo.key, todo.item)}
                        style={{ textDecoration: todo.isActive ? 'none' : 'line-through' }}
                    >
                        {todo.item}
                    </Typography.Text>
                </Col>
                <Col span={1}>

                    <Icon className='delete-btn' type="delete" theme="twoTone" twoToneColor="#ff2f96"
                        onClick={() => { props.onDeleteTodo(todo.key) }}
                    />
                </Col>
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
const TodoList = (props) => {

    // returns the correct filtered todos depending on the current filter
    let filteredTodos = props.todos
    let message = ''
    if (props.filter === 'completed') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === false)
        message = 'No todos completed. 😢'
    } else if (props.filter === 'active') {
        filteredTodos = props.todos.filter((todo) => todo.isActive === true)
        message = 'All todos are done! 🥳'
    }

    if (props.todos.length === 0) {
        return null
    } else {
        if (filteredTodos.length === 0) {
            return (
                <div className='container todo-row'>
                    <List bordered>
                        <List.Item className='empty-list'>
                            {message}
                        </List.Item>
                    </List>
                </div>
            )

        }
        else {

            return (
                <div className='container todo-row'>
                    <List bordered>
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
                </div>
            )
        }
    }
}

export default TodoList

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
}