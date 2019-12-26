import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Row, Col, Icon } from 'antd'

const CompleteAll = ({ todos, onToggleCompleteAll }) => {
    if (todos.length !== 0) {
        return (
            <Button className='check-all-button'
                onClick={() => onToggleCompleteAll()}
            >
                <Icon type="down" />
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
const AddTodo = ({ todos, onToggleCompleteAll, placeholder, value, onChange, onKeyDown }) => {
    return (
        <div className='container'>
            <Row type='flex' justify='space-between'>
                <Col span={3}>
                    <CompleteAll
                        todos={todos}
                        onToggleCompleteAll={onToggleCompleteAll}
                    />
                </Col>
                <Col span={21}>
                    <Input
                        type='text'
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default AddTodo

AddTodo.defaultProps = {
    placeholder: '',
}

AddTodo.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
}