import React from 'react'

export default class People extends React.Component {

    render() {
        const people = this.props.people

        return (
            <div>
                <h3>Current Waiting List</h3>
                <p><strong>Next Up: </strong></p>
                <ul> 
                    {people.map((para, i) => (<li className={`${this.props.newName===para ? "new_name": " "}`} key={i}>{para}</li>))}
                </ul>
            </div>
        )
    }
}

