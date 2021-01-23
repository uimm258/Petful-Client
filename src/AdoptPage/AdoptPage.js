import React, { Component } from 'react'
import Dog from '../Pets/Dog'
import Cat from '../Pets/Cat'
import People from '../People/People'
import ApiService from '../service'

class AdoptPage extends Component {
    state = {
        people: [],
        newName: '',
        peoplePos: 0,
        isAdoptable: false
    }

    componentDidMount() {
        ApiService.handleGetPeople()
            .then(people => this.setState({
                people: people,
            }))
    }

    addPerson = (e) => {
        e.preventDefault()
        const newName = e.target.name.value

        ApiService.handleAddPerson(newName)
            .then(res => {
                this.setState({
                    people: [...this.state.people, res]
                })
            })
    }

    deletePerson = () => {
        const people = this.state.people
        people.shift()
        this.setState({ people, peoplePos: null })
        ApiService.handleDeletePerson()
    }

    render() {
        const people = this.state.people
        const {peoplePos} = this.state

        return (
            <div>
                <h3>Waiting List</h3>

                <h4>Interest? Queue up now!</h4>

                <form onSubmit={this.addPerson}>
                    <label>Enter Name Here: </label>
                    <input id='name' type='text' placeholder='Random Random' required></input>
                    <button type='submit'>Submit</button>
                </form>


                <People people={people} peoplePos={peoplePos} />

                <h3>Pets Available for Adoption</h3>
                <Dog people={people} peoplePos={peoplePos} deletePerson={this.deletePerson } />
                <br />{' '}
                <Cat people={people} peoplePos={peoplePos} deletePerson={this.deletePerson } />

            </div>
        )
    }
}

export default AdoptPage