import React, { Component } from 'react'
import ApiService from '../service'

export default class Dogs extends Component {
    state = {
        dogs: [],
        dogPos: 0,
        loading: true
    }

    componentDidMount() {
        ApiService.handleGetDogs()
            .then(dogs => this.setState({ dogs: dogs, loading: false }))
    }

    nextDog = () => {
        this.setState({ dogPos: this.state.dogPos + 1 })
    }

    previousDog = () => {
        this.setState({ dogPos: this.state.dogPos - 1 })
    }

    adoptDog = () => {
        ApiService.handleDogAdopt()
            .then(res => {
                window.alert('Congrats! You adopted a dog!')
                let { dogs } = this.state
                dogs.shift()
                this.setState({ dogs: dogs })
                this.props.deletePerson()
            })
    }

    render() {
        if (this.state.loading) return ('loading')

        const dogs = this.state.dogs
        const { dogPos } = this.state
        const dog = dogs[dogPos]

        let isAvailable = false;
        if (this.props.peoplePos === 0) isAvailable = true

        return (
            <div>
                <img src={dog.imageURL} alt='photograph' />
                <h3>{dog.name}</h3>
                <ul>
                    <li>Name: {dog.name}</li>
                    <li>Age: {dog.age}</li>
                    <li>Breed: {dog.breed}</li>
                    <li>Description: {dog.description}</li>
                    <li>Gender: {dog.gender}</li>
                    <li>Story: {dog.story}</li>
                </ul>
                
                <button onClick={this.adoptDog} disabled={isAvailable ? false : true}>Adopt</button><br />
                <button onClick={this.previousDog} hidden={!dogPos}>Previous Dog</button>
                <button onClick={this.nextDog} hidden={dogPos === this.state.dogs.length - 1}>Next Dog</button>
            </div>
        )
    }
}

