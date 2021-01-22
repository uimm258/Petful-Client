import React from 'react'

export default class People extends React.Component {

    render() {
        const people = this.props.people

        return (
            <div>
                <h3>Waiting List</h3>
                <ul>Next up: {people.map((para, i) => (
                    <li key={i}>{para}</li>
                ))}</ul>
            </div>
        )
    }
}

