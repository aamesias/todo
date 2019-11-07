import React from 'react'
import PropTypes from 'prop-types'


// Displays an input box that takes in a users todo
// and adds it to the list after the user presses 'enter'
export default function AddTodo({placeholder, value, onChange, onKeyDown}) {
    return (
        <div>
            <input
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

AddTodo.defaultProps = {
    placeholder: '',
}

AddTodo.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
}