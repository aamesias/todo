import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Row, Col, Checkbox } from 'antd'

const CompleteAll = ({ todos, onToggleCompleteAll }) => {
    if (todos.length !== 0) {
        return (
            <Button className='check-all-button'>
                <Checkbox
                    checked={todos.filter((todo) => todo.isActive === false).length === todos.length}
                    onClick={() => onToggleCompleteAll()}
                />
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
const AppHeader = ({ todos, onToggleCompleteAll, placeholder, value, onChange, onKeyDown }) => {
    return (
        <div className='container'>
            <h1 className='center'>Todo</h1>
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

export default AppHeader

AppHeader.defaultProps = {
    placeholder: '',
}

AppHeader.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
}