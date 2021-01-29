import React, { Component } from 'react'
import ApiService from '../service'

export default class Cats extends Component {
    state = {
        cats: [],
        catPos: 0
    }

    nextCat = () => {
        this.setState({ catPos: this.state.catPos + 1 })
    }

    previousCat = () => {
        this.setState({ catPos: this.state.catPos - 1 })
    }

    adoptCat = () => {
        ApiService.handleCatAdopt()
            .then(res => {
                let { cats } = this.props
                cats.shift()
                this.setState({ cats: cats })
                this.props.deletePerson()
            })
    }

    onClickEffect = () => {
        this.adoptCat()
        window.alert('Congrats! You adopted a Cat!')
        window.location.href = '/'
    }

    render() {
        const cats = this.props.cats
        const { catPos } = this.state
        let isAvailable = false
        let cat;
        

        if (cats.length > 0) {
            cat = cats[catPos]

            if (cat.length <= 0 && this.props.isAdoptable === false && this.props.people.length <= 0) isAvailable = false
            if (this.props.isAdoptable === true) isAvailable = true
        } else {
            return <h3>Sorry! No more cats available for adoption at this time.</h3>
        }

        return (
            <>
                {cats.length > 0 && <div>
                <img src={cat.imageURL} alt="photograph" />
                <h3>{cat.name}</h3>
                <ul>
                    <li><strong>Name: </strong>{cat.name}</li>
                    <li><strong>Age: </strong>{cat.age}</li>
                    <li><strong>Breed: </strong>{cat.breed}</li>
                    <li><strong>Description: </strong>{cat.description}</li>
                    <li><strong>Gender: </strong>{cat.gender}</li>
                    <li><strong>Story: </strong>{cat.story}</li>
                </ul>

                <button onClick={this.onClickEffect} disabled={isAvailable ? false : true}>Adopt</button>
                <button onClick={this.previousCat} hidden={!catPos} disabled={isAvailable ? false : true}>Previous Cat</button>
                <button onClick={this.nextCat} hidden={catPos === this.state.cats.length-1} disabled={(catPos === cats.length-1) || (isAvailable ? false : true)}>Next Cat</button>
                </div>}
            </>
        )
    }
}

