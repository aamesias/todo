import React from 'react'
import PropTypes from 'prop-types'

export default class Todos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Ana'
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Hello {this.state.name}</h1>
            </React.Fragment>
        )
    }
}