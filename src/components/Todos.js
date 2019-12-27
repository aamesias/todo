import React from 'react'
import AppHeader from './AppHeader'
import TodoList from './TodoList'
import FilterFooter from './FilterFooter'

const Todos = () => {
    const [todos, setTodos] = React.useState([])
    const [input, setInput] = React.useState('')
    const [isAllComplete, setIsAllComplete] = React.useState(false)
    const [filter, setFilter] = React.useState('all')
    const [nextKey, setNextKey] = React.useState(0)
    const [editText, setEditText] = React.useState('')
    const [editKey, setEditKey] = React.useState(-1)

    const updateInput = (e) => setInput(e.target.value)

    const handleAddTodo = (e) => {
        if (e.key === 'Enter') {
            setTodos(todos.concat({
                item: input,
                isActive: true,
                key: nextKey,
            }))
            setInput('')
            setIsAllComplete(false)
            setNextKey(nextKey + 1)
        }
    }
    const handleDeleteTodo = (key) => {
        setTodos(todos.filter((todo) => todo.key !== key))
        const numOfActiveItems = todos.filter((todo) => todo.isActive === true).length
        numOfActiveItems === 0 ? setIsAllComplete(true) : setIsAllComplete(false)
    }

    const handleChangeTodoText = (key) => {
        setTodos(todos.map((todo) => {
            if (todo.key === key)
                return { ...todo, item: editText }
            else
                return todo
        }))
        if (!editText.trim())
            handleDeleteTodo(key)
        setEditKey(-1)
        setEditText('')
    }

    const handleToggleTodo = (key) => {
        setTodos(todos.map((todo) => {
            if (todo.key === key)
                return { ...todo, isActive: !todo.isActive }
            else
                return todo
        }))
        const numOfActiveItems = todos.filter((todo) => todo.isActive === true).length
        numOfActiveItems === 0 ? setIsAllComplete(true) : setIsAllComplete(false)
    }

    const handleEditItem = (key, item) => {
        setEditKey(key)
        setEditText(item)
    }

    const updateEditText = (e) => setEditText(e.target.value)

    const updateFilter = (newFilter) => setFilter(newFilter)

    const handleClearCompleted = () => {
        setTodos(todos.filter((todo) => todo.isActive === true))
        const numOfActiveItems = todos.length
        numOfActiveItems === 0 ? setIsAllComplete(true) : setIsAllComplete(false)
    }

    const handleToggleCompleteAll = () => {
        setIsAllComplete(!isAllComplete)
        setTodos(todos.map((todo) => {
            return { ...todo, isActive: isAllComplete }
        }))
    }

    return (
        <React.Fragment>
            <AppHeader
                todos={todos}
                onToggleCompleteAll={handleToggleCompleteAll}
                placeholder='What needs to be done?'
                value={input}
                onChange={updateInput}
                onKeyDown={handleAddTodo}
            />
            <TodoList
                todos={todos}
                filter={filter}
                editKey={editKey}
                onDeleteTodo={handleDeleteTodo}
                onToggleTodo={handleToggleTodo}
                onChangeTodoText={handleChangeTodoText}

                onEditItem={handleEditItem}
                onUpdateEditText={updateEditText}
                value={editText}
            />
            <FilterFooter
                todos={todos}
                onFilterChange={updateFilter}
                onClearCompleted={handleClearCompleted}
            />
        </React.Fragment>
    )
}

export default Todos