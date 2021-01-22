import React, { Component } from 'react'
import Dog from '../Pets/Dog'
import Cat from '../Pets/Cat'
import People from '../People/People'
import ApiService from '../service'

class AdoptPage extends Component {
    state = {
        people: [],
        newPeople: [],
        peoplePos: null
    }
    
    componentDidMount() {
        ApiService.handleGetPeople()
            .then(people => this.setState({
                    people: people,
                }))
    }


    handleAddPerson = (e) => {
        e.preventDefault()
        const newName = e.target.name.value
        console.log("newName: ", newName)

        ApiService.handleAddPerson(newName)
            .then(res => {
                console.log(res)
                this.setState({
                people: [...this.state.people]
            })
            })

       
    }

    resetPeoplePosition = () => {
        const people = this.state.people
        people.shift()
        this.setState({ people, peoplePos:null })
        ApiService.handleDeletePerson()
    }

    render() {
        const people = this.state.people
        const peoplePos = people.length
        console.log("peoplePos: ", peoplePos)

        console.log("render", people)
        return (
            <div>
                <h3>Waiting List</h3>

                <h4>Interest? Queue up now!</h4>
                
                    <form onSubmit={this.handleAddPerson}>
                        <label>name: </label>
                        <input type='text' placeholder='Random Random' required></input>
                        <button type='submit'>Submit</button>
                    </form>
                

                <People people={people} peoplePos={peoplePos}/>

                <h3>Pets Available for Adoption</h3>
                <Dog peoplePos={peoplePos} resetPeoplePosition={this.resetPeoplePosition}/>
                <br />{' '}
                <Cat peoplePos={peoplePos} resetPeoplePosition={this.resetPeoplePosition}/>
                
            </div>
        )
    }
}

export default AdoptPage