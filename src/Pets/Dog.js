import React, { Component } from 'react'
import ApiService from '../service'

export default class Dogs extends Component {
    state = {
        dogs: [],
        dogPos: 0
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
                let { dogs } = this.state
                dogs.shift()
                this.setState({ dogs: dogs })
                this.props.deletePerson()
            })
    }

    onClickEffect = () => {
        this.adoptDog()
        window.alert('Congrats! You adopted a dog!')
    }

    render() {
        const dogs = this.props.dogs
        const { dogPos } = this.state
        let isAvailable = false
        
        let dog; 
        
        if(dogs.length > 0){
            dog = dogs[dogPos]

            if (dog.length <= 0 && this.props.isAdoptable === false && this.props.people.length <= 0) isAvailable = false
            if (this.props.isAdoptable === true) isAvailable = true
        }
        return (
            <>
                {dogs.length > 0 && <div>
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
                
                <button onClick={this.onClickEffect} disabled={isAvailable ? false : true}>Adopt</button><br />
                <button onClick={this.previousDog} hidden={!dogPos}>Previous Dog</button>
                <button onClick={this.nextDog} hidden={dogPos === this.state.dogs.length - 1}>Next Dog</button>
                </div>}
            </>
        )
    }
}
