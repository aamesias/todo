import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Row, Col } from 'antd'

function CompleteAll({ todos, onToggleCompleteAll }) {
    if (todos.length !== 0) {
        return (
            <Button
                onClick={() => onToggleCompleteAll()}
            >
                ❯
            </Button>
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

// Displays an input box that takes in a users todo
// and adds it to the list after the user presses 'enter'
export default function AddTodo({ todos, onToggleCompleteAll, placeholder, value, onChange, onKeyDown }) {
    return (
        <React.Fragment>
            <Row align='middle' justify='center'>
                <Col span={2}>
                    <CompleteAll
                        todos={todos}
                        onToggleCompleteAll={onToggleCompleteAll}
                    />
                </Col>
                <Col span={22}>
                    <Input
                        type='text'
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </Col>
            </Row>

        </React.Fragment>
    )
}

AddTodo.defaultProps = {
    placeholder: '',
}

AddTodo.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
}