import React, { Component } from 'react'
import ApiService from '../service'

export default class Cats extends Component {
    state = {
        cats: [],
        catPos: 0,
        loading: true
    }

    componentDidMount() {
        ApiService.handleGetCats()
            .then(cats => this.setState({ cats: cats, loading: false }))
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
                window.alert('Congrats! You adopted a Cat!')
                let { cats } = this.state
                cats.shift()
                this.setState({ cats: cats })
                this.props.resetPeoplePosition()
            })
    }

    render() {
        if (this.state.loading) return ('loading')

        const cats = this.state.cats
        const { catPos } = this.state
        const cat = cats[catPos]

        let isAvailable = true;
        if (catPos !== 0) isAvailable = false
        if (this.props.peoplePos !== 0) isAvailable = false

        return (
            <div>
                <img src={cat.imageURL} alt="photograph" />
                <h3>{cat.name}</h3>
                <ul>
                    <li>Name: {cat.name}</li>
                    <li>Age: {cat.age}</li>
                    <li>Breed: {cat.breed}</li>
                    <li>Description: {cat.description}</li>
                    <li>Gender: {cat.gender}</li>
                    <li>Story: {cat.story}</li>
                </ul>
                
                <button onClick={this.adoptCat} disabled={isAvailable ? false : true}>Adopt</button><br />
                <button onClick={this.previousCat} hidden={!catPos}>Previous Cat</button>
                <button onClick={this.nextCat} hidden={catPos === this.state.cats.length - 1}>Next Cat</button>
            </div>
        )
    }
}


