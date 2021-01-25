import React, { Component } from 'react'
import Dog from '../Pets/Dog'
import Cat from '../Pets/Cat'
import People from '../People/People'
import ApiService from '../service'
import './AdoptPage.css'

class AdoptPage extends Component {
    state = {
        people: [],
        newName: '',
        isAdoptable: false,
        adoptions: 1,
        cats: [],
        dogs: [],
    }

    componentDidMount() {
        ApiService.handleGetPeople()
            .then(people => this.setState({
                people: people,
            }))

        ApiService.handleGetCats()
            .then(cats => this.setState({
                cats: cats,
            }))

        ApiService.handleGetDogs()
            .then(dogs => this.setState({
                dogs: dogs,
            }))

        this.interval = setInterval(() => {
            if (this.state.people.length >= 5) {
                if (this.state.adoptions % 2 && this.state.cats.length !== 0 && this.state.dogs.length !== 0) {
                    ApiService.handleCatAdopt()
                    this.setState({
                        cats: [...this.state.cats.splice(1)],
                        people: [...this.state.people.splice(1)]
                    })
                } else {
                    ApiService.handleDogAdopt()
                    this.setState({
                        dogs: [...this.state.dogs.splice(1)],
                        people: [...this.state.people.splice(1)]

                    })
                }
            }
            ApiService.handleAddPerson(`Anonymous ${this.state.adoptions}`)
            this.setState({
                people: [...this.state.people, `Anonymous ${this.state.adoptions}`],
                adoptions: this.state.adoptions + 1,
            })
            if (this.state.newName === this.state.people[0]) {
                this.setState({
                    isAdoptable: true
                })
            }
        }, 5000)
    }

    componentDidUpdate() {
        if (this.state.newName === this.state.people[0] && this.state.dogs.length === 0 && this.state.cats.length === 0) clearInterval(this.interval)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    addPerson = (e) => {
        e.preventDefault()
        const newName = e.target.name.value

        ApiService.handleAddPerson(newName)
            .then(res => {
                this.setState({
                    newName: newName,
                    people: [...this.state.people, res]
                })
            })
    }

    deletePerson = () => {
        const people = this.state.people
        people.shift()
        this.setState({ people })
        ApiService.handleDeletePerson()
    }

    render() {
        const people = this.state.people
        const newName = this.state.newName

        return (
            <div className='adoptpage'>
                <h2>Waiting List</h2>

                <h4>Interest? Queue up now!</h4>

                <form onSubmit={this.addPerson}>
                    <label>Enter Your Name Here: </label>
                    <input id='name' type='text' placeholder='Random Random' required></input>
                    <button type='submit'>Submit</button>
                </form>


                <div className='people'>
                    <People people={people} newName={newName}/>
                </div>
                
                <div className='pets'>
                    <h2>Pets Available for Adoption</h2>

                    <br />{' '}
                    <div className='dogs'>
                        <Dog dogs={this.state.dogs} isAdoptable={this.state.isAdoptable} deletePerson={this.deletePerson} />
                    </div>
                    
                    <div className='cats'>
                        <Cat cats={this.state.cats} isAdoptable={this.state.isAdoptable} deletePerson={this.deletePerson} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdoptPage