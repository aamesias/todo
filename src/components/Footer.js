import React from 'react'
import PropTypes from 'prop-types'

function NumOfItemsLeft ({todos}) {
    const numOfItems = todos.filter((todo) => todo.isActive === true).length
    if (numOfItems === 1) {
        return (<span>{numOfItems} item left</span>)
    } else {
        return (<span>{numOfItems} items left</span>)
    }
}

NumOfItemsLeft.propTypes = {
    todos: PropTypes.array.isRequired,
}

function Filters({onFilterChange}) {
    return (
        <ul>
            <li onClick={() => {onFilterChange('all')}}>
                All
            </li >
            <li onClick={() => {onFilterChange('active')}}>
                Active
            </li>
            <li onClick={() => {onFilterChange('completed')}}>
                Completed
            </li>
        </ul>
    )
}

Filters.propTypes = {

}

function ClearCompleted ({todos, onClearCompleted}) {
    const todosCompleted = todos.filter((todo) => todo.isActive === false).length
    if (todosCompleted !== 0) {
        return (
            <button 
                onClick={() => {onClearCompleted()}}
            >
                Clear completed
            </button>
        )
    }
    else {
        return null
    }
}

ClearCompleted.propTypes = {

}

export default function Footer ({todos, onFilterChange, onClearCompleted}) {
    if (todos.length === 0) {
        return null
    }

    return (
        <div>
            <NumOfItemsLeft 
                todos={todos}
            />
            <Filters 
                onFilterChange={onFilterChange}
            />
            <ClearCompleted 
                todos={todos}
                onClearCompleted={onClearCompleted}
            />
        </div>
    )
}
