import React from 'react'
import PropTypes from 'prop-types'

export default function List ({todos}) {
    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.key}>
                    {todo.item}
                </li>
            ))}
        </ul>
    )
}

List.propTypes = {
    todos: PropTypes.array,
}