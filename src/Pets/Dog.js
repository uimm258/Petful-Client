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
                let { dogs } = this.props
                dogs.shift()
                this.setState({ dogs: dogs })
                this.props.deletePerson()
            })
    }

    onClickEffect = () => {
        this.adoptDog()
        window.alert('Congrats! You adopted a dog!')
        window.location.href = '/'
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
        } else {
            return <h3>Sorry! No more dogs available for adoption at this time.</h3>
        }

        return (
            <>
                {dogs.length > 0 && <div>
                <img src={dog.imageURL} alt='photograph' />
                <h3>{dog.name}</h3>
                <ul>
                    <li><strong>Name: </strong>{dog.name}</li>
                    <li><strong>Age: </strong>{dog.age}</li>
                    <li><strong>Breed: </strong>{dog.breed}</li>
                    <li><strong>Description: </strong>{dog.description}</li>
                    <li><strong>Gender: </strong>{dog.gender}</li>
                    <li><strong>Story: </strong>{dog.story}</li>
                </ul>
                
                <button onClick={this.onClickEffect} disabled={isAvailable ? false : true}>Adopt</button>
                <button onClick={this.previousDog} hidden={!dogPos}>Previous Dog</button>
                <button onClick={this.nextDog} hidden={dogPos === this.state.dogs.length-1} disabled={(dogPos === dogs.length-1) || (isAvailable ? false : true)}>Next Dog</button>
                </div>}
            </>
        )
    }
}
